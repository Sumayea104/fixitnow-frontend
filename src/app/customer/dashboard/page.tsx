'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CalendarIcon, PlusCircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { useAuth } from '@/features/auth/hooks/useAuth';


interface Booking {
  id: string;
  bookingNumber: string;
  scheduledDate: string;
  totalPrice: number;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  service: { title: string };
  technician: { user: { name: string } };
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const statusStyles: Record<Booking['status'], string> = {
    REQUESTED: 'bg-yellow-100 text-yellow-800',
    ACCEPTED: 'bg-blue-100 text-blue-800',
    DECLINED: 'bg-red-100 text-red-800',
    PAID: 'bg-purple-100 text-purple-800',
    IN_PROGRESS: 'bg-orange-100 text-orange-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
  };

  const labelMap: Record<Booking['status'], string> = {
    REQUESTED: 'Requested',
    ACCEPTED: 'Accepted',
    DECLINED: 'Declined',
    PAID: 'Paid',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
      {labelMap[status]}
    </span>
  );
}

export default function CustomerDashboardPage() {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['customer-bookings'],
    queryFn: async () => {
      const response = await api.get('/bookings');
      const res = response as { data: { data: Booking[] } };
      return res.data.data;
    },
  });

  const recentBookings = bookings?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || 'Customer'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your bookings.
          </p>
        </div>
        <Link href="/services">
          <Button className="gap-2">
            <PlusCircleIcon className="h-4 w-4" />
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : bookings?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                bookings?.filter(b => b.status === 'REQUESTED' || b.status === 'ACCEPTED' || b.status === 'PAID' || b.status === 'IN_PROGRESS').length || 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                bookings?.filter(b => b.status === 'COMPLETED').length || 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No bookings yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ready to book your first service?
              </p>
              <Link href="/services">
                <Button>Browse Services</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{booking.service.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{booking.technician.user.name}</span>
                      <span>•</span>
                      <span>{new Date(booking.scheduledDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>${booking.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={booking.status} />
                    <Link href={`/bookings/${booking.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}