import { toast } from 'react-hot-toast';

class APIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }

  private async getAuthToken(): Promise<string | null> {
    // In a real app, this would retrieve the JWT token from wherever it's stored
    // For now, we'll assume it's in localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      // Handle error responses that might not have JSON
      const errorText = await response.text().catch(() => '');
      let errorData = {};

      try {
        // Try to parse as JSON first
        errorData = JSON.parse(errorText);
      } catch {
        // If not JSON, use the raw text or default message
        errorData = { message: errorText || `HTTP error! status: ${response.status}` };
      }

      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle 204 No Content and other responses that might not have JSON body
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    const data = await response.json();
    return this.transformResponseData(data);
  }

  private transformResponseData(data: any): any {
    // Transform snake_case to camelCase for task data
    if (data && Array.isArray(data)) {
      // Handle array of tasks
      return data.map(APIClient.transformSnakeToCamel);
    } else if (data && typeof data === 'object') {
      if (data.data && data.data.tasks && Array.isArray(data.data.tasks)) {
        // Handle response with nested tasks array
        return {
          ...data,
          data: {
            ...data.data,
            tasks: data.data.tasks.map(APIClient.transformSnakeToCamel)
          }
        };
      } else if (data.data && data.data.task) {
        // Handle response with single task
        return {
          ...data,
          data: {
            ...data.data,
            task: APIClient.transformSnakeToCamel(data.data.task)
          }
        };
      } else {
        // Handle direct object
        return APIClient.transformSnakeToCamel(data);
      }
    }

    return data;
  }

  private static transformSnakeToCamel(obj: any): any {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }

    const camelObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Convert snake_case to camelCase
        const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        camelObj[camelKey] = obj[key];
      }
    }
    return camelObj;
  }

  private static transformCamelToSnake(obj: any): any {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }

    const snakeObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Convert camelCase to snake_case
        const snakeKey = key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
        snakeObj[snakeKey] = obj[key];
      }
    }
    return snakeObj;
  }

  async getTasks(params?: { status?: string; sort?: string }) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const queryParams = new URLSearchParams(params as Record<string, string>);
      const queryString = queryParams.toString();

      const response = await fetch(`${this.baseURL}/api/tasks${queryString ? '?' + queryString : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return this.handleResponse(response);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch tasks');
      throw error;
    }
  }

  async createTask(data: { title: string; description?: string; priority?: 'low' | 'medium' | 'high'; dueDate?: string }) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Transform camelCase to snake_case for request
      const requestData = APIClient.transformCamelToSnake(data);

      const response = await fetch(`${this.baseURL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await this.handleResponse(response);
      toast.success('Task created successfully!');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task');
      throw error;
    }
  }

  async updateTask(id: number, data: Partial<{ title: string; description?: string; priority?: 'low' | 'medium' | 'high'; dueDate?: string }>) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Transform camelCase to snake_case for request
      const requestData = APIClient.transformCamelToSnake(data);

      const response = await fetch(`${this.baseURL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await this.handleResponse(response);
      toast.success('Task updated successfully!');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task');
      throw error;
    }
  }

  async deleteTask(id: number) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${this.baseURL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle 204 No Content response specially
      if (response.status === 204) {
        toast.success('Task deleted successfully!');
        return; // Don't try to parse JSON for 204 responses
      }

      await this.handleResponse(response);
      toast.success('Task deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete task');
      throw error;
    }
  }

  async toggleComplete(id: number) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${this.baseURL}/api/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await this.handleResponse(response);
      toast.success(result.data?.task?.completed ? 'Task marked as complete!' : 'Task marked as active!');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task status');
      throw error;
    }
  }
}

export const api = new APIClient();