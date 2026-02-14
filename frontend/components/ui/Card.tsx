'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type CardVariant = 'default' | 'elevated' | 'glass-morphism';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  children: React.ReactNode;
}

const Card = ({ variant = 'default', children, className = '', ...props }: CardProps) => {
  const baseClasses = 'rounded-lg border transition-all duration-200';

  const variantClasses = {
    default: `
      bg-secondary-bg dark:bg-secondary-bg-dark
      border-border dark:border-border-dark
      shadow-sm
    `,
    elevated: `
      bg-secondary-bg dark:bg-secondary-bg-dark
      border-border dark:border-border-dark
      shadow-md hover:shadow-lg
      hover:border-border-hover dark:hover:border-border-hover-dark
      hover:-translate-y-0.5
    `,
    'glass-morphism': `
      bg-white/80 dark:bg-secondary-bg-dark/80
      border-white/20 dark:border-white/20
      backdrop-blur-lg
      shadow-md
    `,
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <motion.div
      className={classes}
      whileHover={variant === 'elevated' ? { y: -1 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardHeader = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-4 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardContent, CardFooter };