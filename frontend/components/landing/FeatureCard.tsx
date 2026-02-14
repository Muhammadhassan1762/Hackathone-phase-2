'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="
        p-6 rounded-xl
        bg-white/80 dark:bg-secondary-bg-dark/80
        border border-white/20 dark:border-white/20
        backdrop-blur-lg
        shadow-md
        hover:shadow-lg
        transition-all
        cursor-pointer
      "
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-primary-text dark:text-primary-text-dark mb-2">
        {title}
      </h3>
      <p className="text-secondary-text dark:text-secondary-text-dark">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;