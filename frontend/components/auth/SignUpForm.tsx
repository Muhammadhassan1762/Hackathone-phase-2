'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/lib/auth-client';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(name, email, password);
      if (result.success) {
        toast.success('Account created successfully!');
        router.push('/tasks'); // Redirect to dashboard after successful sign up
      } else {
        toast.error(result.message || 'Failed to create account');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { value: 0, label: '', color: '' };
    if (pwd.length < 6) return { value: 20, label: 'Weak', color: 'bg-accent-danger' };
    if (pwd.length < 10) return { value: 50, label: 'Fair', color: 'bg-accent-tertiary' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) return { value: 70, label: 'Good', color: 'bg-accent-secondary' };
    return { value: 100, label: 'Strong', color: 'bg-accent-primary' };
  };

  const strength = getPasswordStrength(password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        label="Name"
      />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        label="Email"
      />

      <div className="relative">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          label="Password"
        />

        {password && (
          <div className="mt-2">
            <div className="w-full bg-tertiary-bg dark:bg-tertiary-bg-dark rounded-full h-2">
              <div
                className={`h-2 rounded-full ${strength.color}`}
                style={{ width: `${strength.value}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1 text-secondary-text dark:text-secondary-text-dark">
              Password strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
            </div>
          </div>
        )}
      </div>

      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        label="Confirm Password"
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={loading}
        className="w-full"
      >
        Sign Up
      </Button>

      <div className="text-center text-sm text-secondary-text dark:text-secondary-text-dark mt-4">
        Already have an account?{' '}
        <a href="/signin" className="text-accent-primary hover:underline">
          Sign In
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;