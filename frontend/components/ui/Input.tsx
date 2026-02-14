'use client';

import React, { InputHTMLAttributes } from 'react';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  error?: string;
  success?: string;
  label?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', error, success, label, icon, className = '', ...props }, ref) => {
    const hasError = !!error;
    const isSuccess = !!success;
    const hasIcon = !!icon;

    const baseClasses = `
      w-full px-4 py-3 rounded-lg border
      bg-secondary-bg dark:bg-secondary-bg-dark
      text-primary-text dark:text-primary-text-dark
      placeholder-secondary-text dark:placeholder-secondary-text-dark
      focus:outline-none focus:ring-4
      transition-all duration-200
    `;

    const errorClasses = hasError
      ? 'border-accent-danger focus:border-accent-danger focus:ring-accent-danger/20 text-accent-danger'
      : '';

    const successClasses = !hasError && isSuccess
      ? 'border-accent-secondary focus:border-accent-secondary focus:ring-accent-secondary/20'
      : '';

    const normalClasses = !hasError && !isSuccess
      ? 'border-border dark:border-border-dark focus:border-accent-primary focus:ring-accent-primary/20'
      : '';

    const iconClasses = hasIcon ? 'pl-10' : '';

    const classes = `${baseClasses} ${errorClasses} ${successClasses} ${normalClasses} ${iconClasses} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium mb-2 text-primary-text dark:text-primary-text-dark">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-text dark:text-secondary-text-dark">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={classes}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-accent-danger">{error}</p>}
        {success && !error && <p className="mt-2 text-sm text-accent-secondary">{success}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;