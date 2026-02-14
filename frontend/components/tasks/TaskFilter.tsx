'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const TaskFilter = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'complete', label: 'Complete', count: 0 },
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="relative">
      <div className="flex space-x-2 bg-tertiary-bg dark:bg-tertiary-bg-dark rounded-lg p-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`
              relative px-4 py-2 rounded-md text-sm font-medium
              transition-colors
              ${activeFilter === filter.id
                ? 'text-primary-text dark:text-primary-text-dark'
                : 'text-secondary-text dark:text-secondary-text-dark hover:text-primary-text dark:hover:text-primary-text-dark'}
            `}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className="ml-2 text-xs bg-secondary-bg dark:bg-secondary-bg-dark text-secondary-text dark:text-secondary-text-dark rounded-full px-2 py-0.5">
                {filter.count}
              </span>
            )}

            {activeFilter === filter.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
                layoutId="filterIndicator"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;