'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface PaymentButtonProps {
  bookingId: string;
  amount: number;
  onSuccess?: () => void;
}

// Payment API Response Type definition
interface PaymentResponse {
  payment?: {
    provider?: 'SSLCOMMERZ' | 'STRIPE';
    redirectUrl?: string;
  };
  clientSecret?: string;
  [key: string]: unknown;
}

export function PaymentButton({ bookingId, amount, onSuccess }: PaymentButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = (await api.post('/payments/create', {
        bookingId,
        provider: 'SSLCOMMERZ',
      })) as { data: PaymentResponse };

      const { data } = response;

      // Redirect to payment gateway
      if (data.payment?.provider === 'SSLCOMMERZ') {
        // SSLCommerz redirect
        if (data.payment?.redirectUrl) {
          window.location.href = data.payment.redirectUrl;
        } else {
          toast.error('Payment gateway not available');
        }
      } else if (data.payment?.provider === 'STRIPE') {
        // Stripe redirect
        if (data.clientSecret) {
          // Use Stripe Elements or redirect
          router.push(`/payment/stripe?clientSecret=${data.clientSecret}`);
        }
      }

      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage =
        err.response?.data?.message || err.message || 'Payment initiation failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay $${amount.toFixed(2)}`
      )}
    </Button>
  );
}