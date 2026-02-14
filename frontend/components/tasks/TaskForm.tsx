'use client';

import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { TaskUpdate } from '@/lib/types';
import { api } from '@/lib/api';

interface TaskFormProps {
  task?: {
    id: number;
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: Date | string;
  };
  onTaskCreated?: () => void;
  onTaskUpdated?: () => void;
  onCancel: () => void;
}

const TaskForm = ({ task, onTaskCreated, onTaskUpdated, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState<string>(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const taskData: TaskUpdate = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      };

      // Add due date if provided - handle timezone properly to avoid 1-day offset
      if (dueDate) {
        // Create a date object that represents the date in the user's timezone
        // To avoid the ISO string timezone issue, construct the date carefully
        const dateParts = dueDate.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // months are 0-indexed
        const day = parseInt(dateParts[2], 10);

        // Create date at noon (to avoid timezone edge cases) in local timezone
        const localDate = new Date(year, month, day, 12, 0, 0, 0);

        // Format as ISO string but ensure it represents the same date locally
        // Use toISOString() and then reconstruct to ensure the date portion is preserved
        taskData.dueDate = localDate.toISOString();
      }

      if (task) {
        // Update existing task
        await api.updateTask(task.id, taskData);
        if (onTaskUpdated) onTaskUpdated();
      } else {
        // Create new task
        await api.createTask(taskData);
        if (onTaskCreated) onTaskCreated();
      }

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-secondary-bg dark:bg-secondary-bg-dark border border-border dark:border-border-dark rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-primary-text dark:text-primary-text-dark">
              {task ? 'Edit Task' : 'Add New Task'}
            </h3>
            <button
              type="button"
              onClick={onCancel}
              className="p-1 rounded-full hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark text-secondary-text dark:text-secondary-text-dark"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full bg-transparent text-primary-text dark:text-primary-text-dark placeholder-secondary-text dark:placeholder-secondary-text-dark focus:outline-none text-body-large border-b border-transparent focus:border-border dark:focus:border-border-dark pb-1"
              autoFocus
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)..."
              className="w-full bg-transparent text-primary-text dark:text-primary-text-dark placeholder-secondary-text dark:placeholder-secondary-text-dark focus:outline-none text-body-medium resize-none border-b border-transparent focus:border-border dark:focus:border-border-dark pb-1"
              rows={2}
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-body-small text-secondary-text dark:text-secondary-text-dark">Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="bg-tertiary-bg dark:bg-tertiary-bg-dark border border-border dark:border-border-dark rounded px-2 py-1 text-body-small focus:outline-none focus:ring-1 focus:ring-accent-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-secondary-text dark:text-secondary-text-dark" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-tertiary-bg dark:bg-tertiary-bg-dark border border-border dark:border-border-dark rounded px-2 py-1 text-body-small focus:outline-none focus:ring-1 focus:ring-accent-primary"
              />
            </div>
          </div>

          {error && (
            <div className="text-accent-danger text-body-small">{error}</div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-secondary-text dark:text-secondary-text-dark hover:text-primary-text dark:hover:text-primary-text-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary-hover transition-colors disabled:opacity-50"
            >
              {loading ? (task ? 'Updating...' : 'Creating...') : (task ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;