import { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '../types';
import { api } from '../api';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'complete'>('all');

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.getTasks();
      if (Array.isArray(response)) {
        // Direct array response
        setTasks(response);
      } else if (response.success && response.data) {
        // Response with data wrapper
        setTasks(response.data.tasks);
      } else {
        // Fallback - treat response as tasks array directly
        setTasks(response || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Apply filter to tasks
  useEffect(() => {
    let result = [...tasks];

    if (filter === 'active') {
      result = tasks.filter(task => !task.completed);
    } else if (filter === 'complete') {
      result = tasks.filter(task => task.completed);
    }

    setFilteredTasks(result);
  }, [tasks, filter]);

  // Create a new task
  const createTask = async (taskData: TaskCreate) => {
    try {
      // Convert dueDate from Date to ISO string if it exists
      const processedData = {
        ...taskData,
        dueDate: taskData.dueDate ? (typeof taskData.dueDate === 'string' ? taskData.dueDate : taskData.dueDate.toISOString()) : undefined
      };

      const response = await api.createTask(processedData);

      // Handle response consistently
      let newTask;

      // Check if response is wrapped in success/data structure (legacy format)
      if (response && response.success && response.data && response.data.task) {
        newTask = response.data.task;
      } else {
        // Direct task object from the API (current format)
        newTask = response;
      }

      // Add the new task to the list
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  // Update a task
  const updateTask = async (id: number, taskData: TaskUpdate) => {
    try {
      // Convert dueDate from Date to ISO string if it exists
      const processedData = {
        ...taskData,
        dueDate: taskData.dueDate ? (typeof taskData.dueDate === 'string' ? taskData.dueDate : taskData.dueDate.toISOString()) : undefined
      };

      const response = await api.updateTask(id, processedData);

      // Handle response consistently with toggleComplete
      let updatedTask;

      // Check if response is wrapped in success/data structure (legacy format)
      if (response && response.success && response.data && response.data.task) {
        updatedTask = response.data.task;
      } else {
        // Direct task object from the API (current format)
        updatedTask = response;
      }

      // Update the task in the list
      setTasks(prev => prev.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    try {
      await api.deleteTask(id);
      // Optimistic update
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  // Toggle task completion
  const toggleComplete = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const response = await api.toggleComplete(id);

      // The response from the backend is the updated task object directly
      // Since the API returns the full task object after toggle, we can use it directly
      let updatedTask;

      // Check if response is wrapped in success/data structure (legacy format)
      if (response && response.success && response.data && response.data.task) {
        updatedTask = response.data.task;
      } else {
        // Direct task object from the API (current format)
        updatedTask = response;
      }

      // Update the task completion status
      setTasks(prev => prev.map(t =>
        t.id === id ? { ...t, ...updatedTask } : t
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task completion');
    }
  };

  return {
    tasks: filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
};

export default useTasks;