'use client';

import { useQuery,  } from '@tanstack/react-query';
import { UsersIcon, CalendarIcon, DollarSignIcon, ShieldCheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Stats {
  users: { total: number; active: number; banned: number };
  technicians: { total: number; verified: number; unverified: number };
  bookings: { total: number; pending: number; completed: number };
  revenue: { total: number };
}

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await api.get('/admin/dashboard/stats') as {
        data?: Stats | { data?: Stats };
      };

      const payload = res.data;

      if (!payload) {
        return undefined as unknown as Stats;
      }

      return ('data' in payload ? payload.data : payload) as Stats;
    },
  });

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || 'Admin'}! 🛡️
        </h1>
        <p className="text-muted-foreground">
          Platform overview and analytics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" /> {/* 👈 Used Here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : stats?.users?.total ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.users?.active ?? 0} active • {stats?.users?.banned ?? 0} banned
            </p>
          </CardContent>
        </Card>

        {/* Technicians Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Technicians</CardTitle>
            <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" /> {/* 👈 Used Here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : stats?.technicians?.total ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.technicians?.verified ?? 0} verified • {stats?.technicians?.unverified ?? 0} unverified
            </p>
          </CardContent>
        </Card>

        {/* Bookings Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bookings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" /> {/* 👈 Used Here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : stats?.bookings?.total ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.bookings?.pending ?? 0} pending • {stats?.bookings?.completed ?? 0} completed
            </p>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" /> {/* 👈 Used Here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                `$${(stats?.revenue?.total ?? 0).toFixed(2)}`
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm">Manage Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View and manage all users</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm">Manage Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Add or update service categories</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm">View All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Oversee all platform bookings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}