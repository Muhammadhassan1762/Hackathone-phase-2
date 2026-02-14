'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3 } from 'lucide-react';
import Checkbox from '@/components/ui/Checkbox';
import { Task } from '@/lib/types';
import { fireConfetti } from '@/lib/utils/confetti';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }: TaskCardProps) => {
  const [showActions, setShowActions] = useState(false);

  // Format the created date
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format due date with smart formatting and return both text and color info
  const formatDueDate = (date: Date | string | null | undefined) => {
    if (!date) return null;

    try {
      let year: number;
      let month: number;
      let day: number;

      // FIX: Parse the date string manually in LOCAL timezone to avoid the 1-day offset issue
      if (typeof date === 'string') {
        // Handle ISO format: "2024-02-20" or "2024-02-20T00:00:00Z" or "2024-02-20T00:00:00.000Z"
        const dateOnly = date.split('T')[0]; // Get only the date part
        const parts = dateOnly.split('-');

        if (parts.length === 3) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed (0=Jan, 1=Feb, etc.)
          day = parseInt(parts[2], 10);
        } else {
          console.error('Invalid date format:', date);
          return null;
        }
      } else if (date instanceof Date) {
        // If it's already a Date object, extract the year, month, and day
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDate();
      } else {
        return null;
      }

      // Create date in LOCAL timezone (NOT UTC) to avoid timezone offset
      const taskDate = new Date(year, month, day);

      // Verify the date is valid
      if (isNaN(taskDate.getTime())) {
        console.error('Invalid date:', date);
        return null;
      }

      // Set to midnight for accurate comparison
      taskDate.setHours(0, 0, 0, 0);

      // Get today at midnight LOCAL time
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get tomorrow at midnight LOCAL time
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Compare using timestamps
      const taskTime = taskDate.getTime();
      const todayTime = today.getTime();
      const tomorrowTime = tomorrow.getTime();

      if (taskTime === todayTime) {
        return {
          text: 'Today',
          color: 'bg-red-500 text-white dark:bg-red-600 dark:text-white border border-red-600 dark:border-red-500'
        };
      } else if (taskTime === tomorrowTime) {
        return {
          text: 'Tomorrow',
          color: 'bg-orange-500 text-white dark:bg-orange-600 dark:text-white border border-orange-600 dark:border-orange-500'
        };
      } else {
        // Format for display - use the taskDate we created to ensure correct date
        const formatted = taskDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
        return {
          text: formatted,
          color: 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white border border-blue-600 dark:border-blue-500'
        };
      }
    } catch (e) {
      console.error('Error formatting due date:', e);
      return null;
    }
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
    if (!task.completed) {
      // Only fire confetti when completing (not uncompleting)
      setTimeout(() => fireConfetti(), 300);
    }
  };

  const handleEditClick = () => {
    onEdit(task);
  };

  return (
    <motion.div
      className={`
        relative w-full
        bg-secondary-bg dark:bg-secondary-bg-dark
        border border-transparent
        rounded-lg
        p-4
        transition-all duration-200 ease-in-out
        ${!task.completed ? 'hover:border-border-hover dark:hover:border-border-hover-dark hover:-translate-y-0.5 hover:shadow-sm' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start space-x-3">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div
            className={`
              text-body-medium
              ${task.completed
                ? 'line-through text-tertiary-text dark:text-tertiary-text-dark'
                : 'text-primary-text dark:text-primary-text-dark'}
              transition-all duration-300
            `}
          >
            {task.title}
          </div>

          {task.description && (
            <div className="text-body-small text-secondary-text dark:text-secondary-text-dark mt-1">
              {task.description}
            </div>
          )}

          <div className="flex flex-wrap items-center text-body-small text-tertiary-text dark:text-tertiary-text-dark mt-2 gap-2">
            <span>Added: {formatDate(task.createdAt)}</span>
            {task.priority && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-white-900/30 dark:text-red-300' : // High = Red
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-white-900/30 dark:text-yellow-300' : // Medium = Yellow
                'bg-green-100 text-green-800 dark:bg-white-900/30 dark:text-green-300' // Low = Green
              }`}>
                {task.priority}
              </span>
            )}
            {(() => {
              const dueDateInfo = formatDueDate(task.dueDate);
              return dueDateInfo && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${dueDateInfo.color}`}>
                  Due📅: {dueDateInfo.text}
                </span>
              );
            })()}
          </div>
        </div>

        <AnimatePresence>
          {(showActions || task.completed) && (
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleEditClick}
                className="p-1.5 rounded-full hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark text-secondary-text dark:text-secondary-text-dark hover:text-primary-text dark:hover:text-primary-text-dark transition-colors"
                aria-label="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={async () => {
                  const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"?`);
                  if (confirmed) {
                    onDelete(task.id);
                  }
                }}
                className="p-1.5 rounded-full hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark text-secondary-text dark:text-secondary-text-dark hover:text-accent-danger transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Completion indicator */}
      <AnimatePresence>
        {task.completed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-accent-primary/10 rounded-lg"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskCard;