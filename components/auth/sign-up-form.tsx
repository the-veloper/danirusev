'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/supabase-auth-provider';
import Link from 'next/link';
import { toast } from 'sonner';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      await signUp(data.email, data.password, data.name);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Име и Фамилия</Label>
            <Input
              id="name"
              placeholder="Дани Русев"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Имейл</Label>
            <Input
              id="email"
              placeholder="danirusev@gmail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Парола</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button size='lg' type="submit" disabled={isLoading} className='text-xl bg-main hover:bg-main/90 text-alt font-gagalin'>
            {isLoading ? 'Създаване на профил...' : 'Създай профил'}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
        Вече имаш профил?{' '}
        <Link href="/sign-in" className="underline">
          Вход
        </Link>
      </div>
    </div>
  );
} 