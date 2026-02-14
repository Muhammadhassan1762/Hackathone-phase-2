'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-md
        border-b
        transition-all duration-300
        ${isScrolled
          ? 'bg-secondary-bg/80 dark:bg-secondary-bg-dark/80 border-border dark:border-border-dark shadow-sm'
          : 'bg-transparent border-transparent'}
      `}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-bold text-primary-text dark:text-primary-text-dark">TodoApp</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-secondary-text dark:text-secondary-text-dark hover:text-accent-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-secondary-text dark:text-secondary-dark hover:text-accent-primary transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-secondary-text dark:text-secondary-dark hover:text-accent-primary transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/signin"
            className="text-primary-text dark:text-primary-text-dark hover:text-accent-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-accent-primary text-white rounded-lg hover:brightness-110 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;