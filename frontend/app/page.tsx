'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/landing/FeatureCard';
import { Zap, Calendar, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';


export default function HomePage() {
  const features = [
    {
      title: 'Quick Add',
      description: 'Create tasks instantly with our lightning-fast interface',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Smart Sort',
      description: 'Automatically organize tasks by priority and deadline',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: 'Beautiful UI',
      description: 'Enjoy a clean, intuitive interface designed for focus',
      icon: <Palette className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-primary-bg dark:bg-primary-bg-dark">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-hero font-bold text-primary-text dark:text-primary-text-dark mb-6 leading-tight">
              Master Your Tasks,<br />
              <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Reclaim Your Time
              </span>
            </h1>

            <p className="text-body-large text-secondary-text dark:text-secondary-text-dark mb-10 max-w-2xl mx-auto">
              A beautifully designed productivity tool that helps you organize your life with elegance and simplicity.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a href="/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  Get Started Free →
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-tertiary-bg dark:bg-tertiary-bg-dark/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 font-bold text-primary-text dark:text-primary-text-dark mb-4">
              Designed for Productivity
            </h2>
            <p className="text-body text-secondary-text dark:text-secondary-text-dark max-w-2xl mx-auto">
              Everything you need to stay organized and focused, without the clutter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
