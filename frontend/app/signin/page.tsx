'use client';

import { Card, CardContent } from '@/components/ui/Card';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg dark:bg-primary-bg-dark p-4">
      <div className="w-full max-w-md">
        <Card variant="glass-morphism">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-h2 font-bold text-primary-text dark:text-primary-text-dark mb-2">Welcome Back</h1>
              <p className="text-secondary-text dark:text-secondary-text-dark">
                Sign in to continue to your productivity dashboard
              </p>
            </div>

            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}