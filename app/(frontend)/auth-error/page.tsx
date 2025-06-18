'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const description = searchParams.get('description');

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-red-600">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            {description || 'There was an error during authentication.'}
          </p>
          {error && (
            <p className="text-xs text-muted-foreground">
              Error code: {error}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Button asChild>
            <Link href="/sign-up">
              Try Again
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sign-in">
              Sign In Instead
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 