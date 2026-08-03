'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, User, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Booking } from '@/features/booking/hooks/useBookings';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

const statusConfig = {
  REQUESTED: { label: 'Requested', variant: 'warning' as const },
  ACCEPTED: { label: 'Accepted', variant: 'info' as const },
  PAID: { label: 'Paid', variant: 'default' as const },
  IN_PROGRESS: { label: 'In Progress', variant: 'success' as const },
  COMPLETED: { label: 'Completed', variant: 'secondary' as const },
  DECLINED: { label: 'Declined', variant: 'destructive' as const },
  CANCELLED: { label: 'Cancelled', variant: 'destructive' as const },
};

const statusColors: Record<string, string> = {
  REQUESTED: 'bg-yellow-500 text-white',
  ACCEPTED: 'bg-blue-500 text-white',
  PAID: 'bg-purple-500 text-white',
  IN_PROGRESS: 'bg-green-500 text-white',
  COMPLETED: 'bg-gray-500 text-white',
  DECLINED: 'bg-red-500 text-white',
  CANCELLED: 'bg-red-600 text-white',
};

export function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const config =
    statusConfig[booking.status as keyof typeof statusConfig] || {
      label: booking.status,
      variant: 'secondary' as const,
    };

  const canCancel = ['REQUESTED', 'ACCEPTED', 'PAID'].includes(
    booking.status as keyof typeof statusConfig,
  );

  const handleCancel = () => {
    onCancel?.(booking.id);
    setIsDialogOpen(false);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{booking.service?.title || 'Service'}</h3>
              <Badge variant="secondary" className="text-xs">
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {booking.technician?.user?.name || 'Technician'}
            </p>
          </div>
          <Badge className={statusColors[booking.status] || 'bg-gray-500 text-white'}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : 'N/A'}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {booking.scheduledTime || 'N/A'}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            ${booking.totalPrice?.toFixed(2) ?? '0.00'}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            {booking.service?.category?.name || 'Service'}
          </div>
        </div>

        {booking.notes && (
          <p className="mt-2 text-sm text-muted-foreground border-t pt-2">
            {booking.notes}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/customer/bookings/${booking.id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            View Details
          </Button>
        </Link>

        {canCancel && onCancel && (
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isCancelling}>
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this booking? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go Back</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel} className="bg-red-500 hover:bg-red-600">
                  {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}