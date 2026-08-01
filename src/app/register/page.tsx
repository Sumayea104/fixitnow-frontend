'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const RegisterForm = dynamic(
  () => import('@/features/auth/components/RegisterForm'),
  { ssr: false, loading: () => <Loader2 className="h-8 w-8 animate-spin" /> }
);

export default function RegisterPage() {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-100">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Join FixItNow and get started
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}