'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar } from 'lucide-react';
import { api } from '@/lib/api';
import TaskForm from './TaskForm';

const QuickAdd = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !showFullForm) {
      inputRef.current.focus();
    }
  }, [showFullForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        await api.createTask({ title: inputValue.trim() });
        setInputValue('');
        onTaskAdded(); // Refresh tasks list
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  if (showFullForm) {
    return (
      <TaskForm
        onTaskCreated={() => {
          setShowFullForm(false);
          onTaskAdded();
        }}
        onCancel={() => setShowFullForm(false)}
      />
    );
  }

  return (
    <div className="w-full">
      {!showFullForm && (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <div
              className={`
                flex items-center w-full
                bg-secondary-bg dark:bg-secondary-bg-dark
                border border-border dark:border-border-dark
                rounded-lg
                overflow-hidden
                transition-all duration-300
                ${isFocused ? 'ring-4 ring-accent-primary/20' : ''}
              `}
            >
              <div className="pl-4 pr-2 py-4">
                <div className="transition-transform duration-200 ease-in-out"
                     style={{ transform: isFocused ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                  <Plus className="w-5 h-5 text-accent-primary" />
                </div>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="+ Add a task..."
                className="
                  w-full py-4 px-2
                  bg-transparent
                  text-primary-text dark:text-primary-text-dark
                  placeholder-secondary-text dark:placeholder-secondary-text-dark
                  focus:outline-none
                  text-body-large
                "
              />

              <div className="pr-4 pl-2 py-4">
                <button
                  type="button"
                  onClick={() => setShowFullForm(true)}
                  className="p-1 rounded-full hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark text-secondary-text dark:text-secondary-text-dark hover:text-accent-primary transition-colors"
                  aria-label="Add task with details"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Focus indicator */}
            {isFocused && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none border-2 border-accent-primary/30"
                style={{
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                }}
              />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default QuickAdd;