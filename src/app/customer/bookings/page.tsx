'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card'; // 👈 CardHeader, CardTitle সরিয়ে দেওয়া হয়েছে
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { api } from '@/lib/api';

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  totalPrice: number;
  scheduledDate: string;
  scheduledTime: string;
  service?: { title: string };
  technician?: { user: { name: string } };
}

// API Response interface
interface BookingsApiResponse {
  data: Booking[];
}

export default function CustomerBookingsPage() {
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['customer-bookings'],
    queryFn: async () => {
      // 👈 Type assertion যুক্ত করে res.data টাইপ-সেফ করা হয়েছে
      const res = (await api.get('/bookings')) as { data: BookingsApiResponse };
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const bookings: Booking[] = data?.data || [];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      REQUESTED: 'bg-yellow-500',
      ACCEPTED: 'bg-blue-500',
      PAID: 'bg-purple-500',
      IN_PROGRESS: 'bg-green-500',
      COMPLETED: 'bg-gray-500',
      CANCELLED: 'bg-red-500',
      DECLINED: 'bg-red-300',
    };
    return variants[status] || 'bg-gray-400';
  };

  if (!isAuthenticated) {
    return <div>Please login to view bookings</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your bookings</p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No bookings yet</p>
            <Button className="mt-4">Browse Services</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{booking.service?.title || 'Service'}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.technician?.user?.name || 'Technician'}
                    </p>
                    <p className="text-sm">
                      {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTime}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      Total: ${booking.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
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