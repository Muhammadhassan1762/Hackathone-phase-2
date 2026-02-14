'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, children, className = '', ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center rounded-lg font-medium
      transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-accent-primary focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantClasses = {
      primary: `
        bg-accent-primary text-white
        hover:brightness-110 hover:shadow-lg
        active:scale-[0.98]
      `,
      secondary: `
        border-2 border-accent-primary text-accent-primary bg-transparent
        hover:bg-accent-primary/10
        active:bg-accent-primary/20
      `,
      ghost: `
        text-accent-primary bg-transparent
        hover:bg-accent-primary/5
        active:bg-accent-primary/10
      `,
      icon: `
        rounded-full bg-transparent
        hover:bg-secondary-bg/10 dark:hover:bg-secondary-bg-dark/10
        active:scale-[0.95]
        p-0
      `,
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) return;
      props.onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={classes}
        onClick={handleClick}
        whileHover={variant !== 'icon' ? { y: -1 } : { scale: 1.05 }}
        whileTap={{ scale: variant === 'icon' ? 0.95 : 0.98 }}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export { Button };