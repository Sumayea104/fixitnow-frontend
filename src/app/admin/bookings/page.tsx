'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useAuth } from '@/features/auth/hooks/useAuth';

// Status badge dynamic styles
const statusColors: Record<string, string> = {
  REQUESTED: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  ACCEPTED: 'bg-blue-500 hover:bg-blue-600 text-white',
  PAID: 'bg-purple-500 hover:bg-purple-600 text-white',
  IN_PROGRESS: 'bg-green-500 hover:bg-green-600 text-white',
  COMPLETED: 'bg-gray-500 hover:bg-gray-600 text-white',
  DECLINED: 'bg-red-500 hover:bg-red-600 text-white',
  CANCELLED: 'bg-red-600 hover:bg-red-700 text-white',
};

interface Booking {
  id: string;
  bookingNumber: string;
  customer?: { name?: string };
  technician?: { user?: { name?: string } };
  service?: { title?: string };
  scheduledDate?: string;
  totalPrice?: number;
  status: string;
}

interface ApiResponse {
  data: Booking[];
}

export default function AdminBookingsPage() {
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const response = (await api.get('/admin/bookings')) as { data: ApiResponse };
      return response.data;
    },
    enabled: isAuthenticated,
  });

  const bookings: Booking[] = data?.data || [];

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

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">All Bookings</h1>
        <p className="text-muted-foreground">Oversee all platform bookings</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No bookings found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-sm">{booking.bookingNumber}</TableCell>
                    <TableCell>{booking.customer?.name || 'N/A'}</TableCell>
                    <TableCell>{booking.technician?.user?.name || 'N/A'}</TableCell>
                    <TableCell>{booking.service?.title || 'N/A'}</TableCell>
                    <TableCell>
                      {booking.scheduledDate
                        ? new Date(booking.scheduledDate).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      ${(Number(booking.totalPrice) || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[booking.status] || 'bg-gray-400 text-white'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
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