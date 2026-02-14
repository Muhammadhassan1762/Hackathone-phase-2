import { CheckCircle2 } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-primary/10 mb-4">
        <CheckCircle2 className="w-8 h-8 text-accent-primary" />
      </div>
      <h3 className="text-h3 font-semibold text-primary-text dark:text-primary-text-dark mb-2">
        You're all caught up!
      </h3>
      <p className="text-secondary-text dark:text-secondary-text-dark max-w-md">
        Great job! You've completed all your tasks. Take a moment to relax or add new tasks to stay productive.
      </p>
    </div>
  );
};

export default EmptyState;