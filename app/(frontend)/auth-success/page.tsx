import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthSuccessPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-green-600">
            Email Verified Successfully!
          </h1>
          <p className="text-sm text-muted-foreground">
            Your email has been verified. You can now sign in to your account.
          </p>
        </div>
        <Button asChild>
          <Link href="/sign-in">
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
} 