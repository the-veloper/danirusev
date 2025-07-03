import ForgotPasswordForm from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-[90vh] w-[90%] flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Забравили сте си паролата?
          </h1>
          <p className="text-sm text-muted-foreground">
            Напишете вашият имейл и ние ще ви изпратим линк за да я възстановите!
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
} 