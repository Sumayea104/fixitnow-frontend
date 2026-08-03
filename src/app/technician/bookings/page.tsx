'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
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
  customer?: { user: { name: string; email: string } };
}

interface BookingsApiResponse {
  data: Booking[];
}

export default function TechnicianBookingsPage() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Fetch technician assigned bookings
  const { data, isLoading } = useQuery({
    queryKey: ['technician-bookings'],
    queryFn: async () => {
      const res = (await api.get('/bookings')) as { data: BookingsApiResponse };
      return res.data;
    },
    enabled: isAuthenticated,
  });

  // Status update mutation (e.g. ACCEPTED, IN_PROGRESS, COMPLETED)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = (await api.patch(`/bookings/${id}/status`, { status })) as { data: unknown };
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking status updated!');
      queryClient.invalidateQueries({ queryKey: ['technician-bookings'] });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(err.response?.data?.message || err.message || 'Failed to update status');
    },
  });

  const bookings: Booking[] = data?.data || [];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      REQUESTED: 'bg-yellow-500',
      ACCEPTED: 'bg-blue-500',
      IN_PROGRESS: 'bg-indigo-500',
      COMPLETED: 'bg-green-500',
      CANCELLED: 'bg-red-500',
    };
    return variants[status] || 'bg-gray-400';
  };

  if (!isAuthenticated) {
    return <div>Please login to view assigned bookings</div>;
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
        <h1 className="text-3xl font-bold">Technician Bookings</h1>
        <p className="text-muted-foreground">Manage and update your assigned service jobs</p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            No bookings assigned to you yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-lg">{booking.service?.title || 'Service'}</p>
                    <p className="text-sm text-muted-foreground">
                      Customer: {booking.customer?.user?.name || 'N/A'} ({booking.customer?.user?.email})
                    </p>
                    <p className="text-sm mt-1">
                      Date: {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTime}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      Earnings: ${booking.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadge(booking.status)}>{booking.status}</Badge>
                      <span className="text-xs text-muted-foreground">#{booking.bookingNumber}</span>
                    </div>

                    {/* Action Buttons for Technician */}
                    <div className="flex gap-2 mt-2">
                      {booking.status === 'REQUESTED' && (
                        <Button
                          size="sm"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'ACCEPTED' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          Accept
                        </Button>
                      )}
                      {booking.status === 'ACCEPTED' && (
                        <Button
                          size="sm"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'IN_PROGRESS' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          Start Job
                        </Button>
                      )}
                      {booking.status === 'IN_PROGRESS' && (
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'COMPLETED' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
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