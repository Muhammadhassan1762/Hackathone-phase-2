'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Task } from '@/lib/types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task | null;
}

const TaskModal = ({ isOpen, onClose, onSave, task }: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: Partial<Task> = {
      title,
      description: description || undefined,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    onSave(taskData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'Add New Task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Task title"
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />

        <div>
          <label className="block text-sm font-medium mb-2 text-primary-text dark:text-primary-text-dark">
            Priority
          </label>
          <div className="flex space-x-4">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  checked={priority === level}
                  onChange={() => setPriority(level)}
                  className="sr-only"
                />
                <span
                  className={`
                    px-3 py-2 rounded-lg cursor-pointer transition-colors
                    ${priority === level
                      ? 'bg-accent-primary text-white'
                      : 'bg-tertiary-bg dark:bg-tertiary-bg-dark text-primary-text dark:text-primary-text-dark hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark'}
                  `}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {task ? 'Update Task' : 'Add Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;