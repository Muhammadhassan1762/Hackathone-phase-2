'use client';

import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  success?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, success, label, className = '', ...props }, ref) => {
    const hasError = !!error;
    const isSuccess = !!success;

    const baseClasses = `
      w-full px-4 py-3 rounded-lg border
      bg-secondary-bg dark:bg-secondary-bg-dark
      text-primary-text dark:text-primary-text-dark
      placeholder-secondary-text dark:placeholder-secondary-text-dark
      focus:outline-none focus:ring-4
      transition-all duration-200
      resize-vertical
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

    const classes = `${baseClasses} ${errorClasses} ${successClasses} ${normalClasses} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium mb-2 text-primary-text dark:text-primary-text-dark">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={classes}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-accent-danger">{error}</p>}
        {success && !error && <p className="mt-2 text-sm text-accent-secondary">{success}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;