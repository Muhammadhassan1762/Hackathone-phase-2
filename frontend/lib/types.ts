export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message: string;
}