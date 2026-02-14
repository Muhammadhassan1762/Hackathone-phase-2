'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import { useAuth } from '@/lib/auth-client';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.success) {
        toast.success('Signed in successfully!');
        router.push('/tasks'); // Redirect to dashboard after successful sign in
      } else {
        toast.error(result.message || 'Failed to sign in');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        label="Email"
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        label="Password"
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />

        <a href="#" className="text-sm text-accent-primary hover:underline">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={loading}
        className="w-full"
      >
        Sign In
      </Button>

      <div className="text-center text-sm text-secondary-text dark:text-secondary-text-dark mt-4">
        Don't have an account?{' '}
        <a href="/signup" className="text-accent-primary hover:underline">
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default SignInForm;