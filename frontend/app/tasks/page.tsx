'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/layout/DashboardHeader';
import QuickAdd from '@/components/tasks/QuickAdd';
import TaskFilter from '@/components/tasks/TaskFilter';
import TaskList from '@/components/tasks/TaskList';
import TaskStats from '@/components/tasks/TaskStats';
import TaskForm from '@/components/tasks/TaskForm';
import useTasks from '@/lib/hooks/useTasks';
import { Task } from '@/lib/types';

export default function TasksPage() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const hasFetched = useRef(false); // Track if tasks have been fetched
  const fetchTasksRef = useRef(fetchTasks); // Stable reference to fetchTasks

  useEffect(() => {
    if (!hasFetched.current) {
      fetchTasksRef.current();
      hasFetched.current = true;
    }
  }, []); // Empty dependency array to run only once

  const handleTaskAdded = () => {
    fetchTasks(); // Refresh tasks after adding
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter as 'all' | 'active' | 'complete');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchTasks(); // Refresh tasks after update
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-primary-bg dark:bg-primary-bg-dark">
      <DashboardHeader />

      <div className="container mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <QuickAdd onTaskAdded={handleTaskAdded} />
        </motion.div>

        {editingTask && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <TaskForm
              task={editingTask}
              onTaskUpdated={handleTaskUpdated}
              onCancel={handleCancelEdit}
            />
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-h1 font-bold text-primary-text dark:text-primary-text-dark">
                My Tasks
              </h1>
              <TaskFilter onFilterChange={handleFilterChange} />
            </div>

            <TaskList
              tasks={tasks}
              loading={loading}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onEdit={handleEditTask}
            />
          </div>

          <TaskStats tasks={tasks} />
        </div>
      </div>
    </div>
  );
}