import SignInForm from '@/components/auth/sign-in-form';

export default function SignInPage() {
  return (
    <div className="flex h-[90vh] w-[90%] flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Добре дошъл
          </h1>
          <p className="text-sm text-muted-foreground">
            Въведете вашите имейл и парола за да влезете в профила си.
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
} 