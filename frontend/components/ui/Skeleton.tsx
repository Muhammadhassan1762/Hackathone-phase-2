'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

const Skeleton = ({ className = '', children }: SkeletonProps) => {
  return (
    <div
      className={`
        animate-pulse
        bg-tertiary-bg dark:bg-tertiary-bg-dark
        rounded-md
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Skeleton;