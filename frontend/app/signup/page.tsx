'use client';

import { Card, CardContent } from '@/components/ui/Card';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg dark:bg-primary-bg-dark p-4">
      <div className="w-full max-w-md">
        <Card variant="glass-morphism">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-h2 font-bold text-primary-text dark:text-primary-text-dark mb-2">Create Account</h1>
              <p className="text-secondary-text dark:text-secondary-text-dark">
                Join us to get started with your productivity journey
              </p>
            </div>

            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}