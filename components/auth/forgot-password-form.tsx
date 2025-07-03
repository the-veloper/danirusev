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

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      await resetPassword(data.email);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (


    <div className="grid gap-6">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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

          <Button size='lg' type="submit" disabled={isLoading} className='text-xl bg-main hover:bg-main/90 text-alt font-gagalin'>
            {isLoading ? 'Изпращане...' : 'Изпращане на линк'}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
        Помните си паролата?{' '}
        <Link href="/sign-in" className="underline">
          Вход
        </Link>
      </div>
    </div>
  );
} 