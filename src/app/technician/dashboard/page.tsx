'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CalendarIcon, DollarSignIcon, ClockIcon, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { StatusBadge } from '@/components/ui/status-badge';

interface Booking {
  id: string;
  bookingNumber: string;
  scheduledDate: string;
  totalPrice: number;
  status: string;
  customer: { name: string };
  service: { title: string };
}

export default function TechnicianDashboardPage() {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['technician-bookings'],
    queryFn: async () => {
      const res = (await api.get('/technicians/bookings')) as { data: unknown };
      const responseData = res.data as Booking[] | { data?: Booking[] };
      return Array.isArray(responseData)
        ? responseData
        : (responseData.data || []) as Booking[];
    },
  });

  const stats = {
    total: bookings?.length || 0,
    pending: bookings?.filter((b) => b.status === 'REQUESTED').length || 0,
    inProgress: bookings?.filter((b) => b.status === 'IN_PROGRESS').length || 0,
    completed: bookings?.filter((b) => b.status === 'COMPLETED').length || 0,
    revenue:
      bookings
        ?.filter((b) => b.status === 'COMPLETED')
        .reduce((sum, b) => sum + b.totalPrice, 0) || 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || 'Technician'}! 🔧
        </h1>
        <p className="text-muted-foreground">
          Manage your services and bookings.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Jobs
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : stats.total}
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">
              Pending
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-amber-600" /> {/* 👈 Used Here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : stats.pending}
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              In Progress
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : stats.inProgress}
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" /> {/* 👈 Used Here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                `$${stats.revenue.toFixed(2)}`
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
        ) : bookings?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No bookings yet</h3>
              <p className="text-sm text-muted-foreground">
                Wait for customers to book your services.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings?.slice(0, 5).map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{booking.service.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{booking.customer.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>${booking.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={booking.status} />
                    <Link href={`/technician/bookings/${booking.id}`}>
                      <Button variant="ghost" size="sm">
                        Manage
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