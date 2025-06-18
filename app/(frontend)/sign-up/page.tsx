import SignUpForm from '@/components/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-[90%] flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
} 