'use client';

import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, className = '', ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            {...props}
          />
          <div
            className={`
              w-6 h-6 flex items-center justify-center rounded-md border-2
              border-border dark:border-border-dark
              group-hover:border-accent-primary dark:group-hover:border-accent-primary-dark
              transition-colors duration-200
              ${props.checked
                ? 'bg-accent-primary dark:bg-accent-primary-dark border-accent-primary dark:border-accent-primary-dark'
                : ''}
              ${className}
            `}
          >
            {indeterminate ? (
              <div
                className="w-3 h-0.5 bg-white dark:bg-white rounded-full"
                style={{ transform: 'scaleX(1)', transition: 'transform 0.2s ease-out' }}
              />
            ) : props.checked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{
                  display: 'block',
                  margin: 'auto',
                  strokeWidth: '2px',
                  width: '100%',
                  height: '100%'
                }}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}
          </div>
        </div>
        {label && (
          <span className="text-body text-primary-text dark:text-primary-text-dark group-hover:text-accent-primary dark:group-hover:text-accent-primary-dark transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;