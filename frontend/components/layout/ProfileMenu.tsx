'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-client';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { getSession, signOut } = useAuth();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getSession();
      setUser(userData);
    };

    fetchUser();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/signin'; // Redirect to sign in page after sign out
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-2
          p-2 rounded-lg
          bg-tertiary-bg dark:bg-tertiary-bg-dark
          hover:bg-secondary-bg dark:hover:bg-secondary-bg-dark
          transition-colors
        "
      >
        <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white">
          {user ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-secondary-text dark:text-secondary-text-dark transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              absolute right-0 mt-2 w-48
              bg-secondary-bg dark:bg-secondary-bg-dark
              border border-border dark:border-border-dark
              rounded-lg shadow-lg
              z-50
            "
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1">
              <div className="px-4 py-2 border-b border-border dark:border-border-dark">
                <p className="text-sm font-medium text-primary-text dark:text-primary-text-dark">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-secondary-text dark:text-secondary-text-dark truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>

              <button className="w-full text-left px-4 py-2 text-sm text-primary-text dark:text-primary-text-dark hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button className="w-full text-left px-4 py-2 text-sm text-primary-text dark:text-primary-text-dark hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-primary-text dark:text-primary-text-dark hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;