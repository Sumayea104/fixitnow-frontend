'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      {resetErrorBoundary && (
        <Button className="mt-4" onClick={resetErrorBoundary}>
          Try again
        </Button>
      )}
    </div>
  );
}