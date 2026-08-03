'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Payment {
  id: string;
  transactionId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  provider: 'STRIPE' | 'SSLCOMMERZ';
  createdAt: string;
  booking: {
    bookingNumber: string;
    service: { title: string };
  };
}

export default function PaymentsPage() {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error } = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await api.get<{ data: Payment[] }>('/payments');
      return response.data;
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return <div>Please login to view payments</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load payment history. Please try again.
      </div>
    );
  }

  const payments: Payment[] = data || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'FAILED':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-muted-foreground">View all your payment transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No payments yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell>{payment.booking?.service?.title || 'N/A'}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.provider}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}