'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/providers/ThemeProvider';
import ThemeToggle from '@/components/layout/ThemeToggle';
import ProfileMenu from '@/components/layout/ProfileMenu';
import { Button } from '@/components/ui/Button';

const DashboardHeader = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        backdrop-blur-md
        border-b border-border dark:border-border-dark
        bg-secondary-bg/80 dark:bg-secondary-bg-dark/80
        transition-all duration-300
        ${isScrolled ? 'shadow-sm' : ''}
      `}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-primary-text dark:text-primary-text-dark">Tasks</h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;