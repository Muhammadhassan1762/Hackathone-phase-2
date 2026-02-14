'use client';

import { AnimatePresence, motion } from 'framer-motion';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { Task } from '@/lib/types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList = ({ tasks, loading, onToggleComplete, onDelete, onEdit }: TaskListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in-up"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: `opacity 0.3s ease-out, transform 0.3s ease-out`,
            transitionDelay: `${index * 0.05}s`
          }}
        >
          <TaskCard
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;