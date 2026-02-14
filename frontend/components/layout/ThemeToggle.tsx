'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="
        p-2 rounded-full
        bg-tertiary-bg dark:bg-tertiary-bg-dark
        text-primary-text dark:text-primary-text-dark
        hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark
        transition-colors
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Moon className="w-5 h-5" />
        </motion.div>
      ) : (
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Sun className="w-5 h-5" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;