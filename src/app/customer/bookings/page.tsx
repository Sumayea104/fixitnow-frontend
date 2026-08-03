'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { api } from '@/lib/api';

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  totalPrice?: number;
  scheduledDate?: string;
  scheduledTime?: string;
  service?: { title: string };
  technician?: { user: { name: string } };
}

interface BookingsApiResponse {
  data: Booking[];
}

export default function CustomerBookingsPage() {
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['customer-bookings'],
    queryFn: async () => {
      const res = (await api.get('/bookings')) as { data: BookingsApiResponse | Booking[] };
      // API response structure-এর উপর নির্ভর করে ডাটা এক্সট্র্যাক্ট
      if ('data' in res.data) {
        return res.data.data;
      }
      return res.data as Booking[];
    },
    enabled: isAuthenticated,
  });

  const bookings: Booking[] = data || [];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      REQUESTED: 'bg-yellow-500 text-white',
      ACCEPTED: 'bg-blue-500 text-white',
      PAID: 'bg-purple-500 text-white',
      IN_PROGRESS: 'bg-green-500 text-white',
      COMPLETED: 'bg-gray-500 text-white',
      CANCELLED: 'bg-red-500 text-white',
      DECLINED: 'bg-red-400 text-white',
    };
    return variants[status] || 'bg-gray-400 text-white';
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Please login to view bookings</p>
        <Link href="/login">
          <Button className="mt-4">Go to Login</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your bookings</p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No bookings yet</p>
            <Link href="/services">
              <Button className="mt-4">Browse Services</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg">
                      {booking.service?.title || 'Service'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Technician: {booking.technician?.user?.name || 'Assigned soon'}
                    </p>
                    <p className="text-sm mt-1">
                      {booking.scheduledDate
                        ? new Date(booking.scheduledDate).toLocaleDateString()
                        : 'N/A'}{' '}
                      at {booking.scheduledTime || 'N/A'}
                    </p>
                    <p className="text-sm font-semibold mt-2 text-primary">
                      Total: ${booking.totalPrice?.toFixed(2) ?? '0.00'}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <Badge className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      #{booking.bookingNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}