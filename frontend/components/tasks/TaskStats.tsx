'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Task } from '@/lib/types';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    complete: 0,
  });

  // Memoize the counts calculation to prevent unnecessary recalculations
  const memoizedCounts = useMemo(() => {
    const total = tasks.length;
    const complete = tasks.filter(task => task.completed).length;
    const active = total - complete;
    return { total, active, complete };
  }, [tasks]);

  // Update counts when memoized values change
  useEffect(() => {
    setCounts(memoizedCounts);
  }, [memoizedCounts]);

  // Animate the numbers when they change
  const AnimatedNumber = ({ value }: { value: number }) => {
    return (
      <motion.span
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="text-2xl font-bold text-primary-text dark:text-primary-text-dark"
      >
        {value}
      </motion.span>
    );
  };

  return (
    <div className="
      hidden lg:block
      w-64
      bg-gradient-to-br from-secondary-bg to-tertiary-bg
      dark:from-secondary-bg-dark dark:to-tertiary-bg-dark
      border border-border dark:border-border-dark
      rounded-xl p-5
      shadow-sm
      max-h-80
    ">
      <h3 className="text-h3 font-semibold text-primary-text dark:text-primary-text-dark mb-4">
        Stats
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-secondary-text dark:text-secondary-text-dark text-sm">Total Tasks</p>
          <div className="flex items-baseline space-x-2">
            <AnimatedNumber value={counts.total} />
            <span className="text-xs text-tertiary-text dark:text-tertiary-text-dark">tasks</span>
          </div>
        </div>

        <div>
          <p className="text-secondary-text dark:text-secondary-text-dark text-sm">Active</p>
          <div className="flex items-baseline space-x-2">
            <AnimatedNumber value={counts.active} />
            <span className="text-xs text-tertiary-text dark:text-tertiary-text-dark">tasks</span>
          </div>
        </div>

        <div>
          <p className="text-secondary-text dark:text-secondary-text-dark text-sm">Completed</p>
          <div className="flex items-baseline space-x-2">
            <AnimatedNumber value={counts.complete} />
            <span className="text-xs text-tertiary-text dark:text-tertiary-text-dark">tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;