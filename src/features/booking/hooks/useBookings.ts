import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes?: number;
  totalPrice: number;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  service: {
    id: string;
    title: string;
    price: number;
    category: {
      name: string;
    };
  };
  technician: {
    id: string;
    user: {
      name: string;
      email: string;
      phone?: string;
    };
  };
}

export interface CreateBookingData {
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes?: number;
  notes?: string;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// 1. Single Booking Fetching Custom Hook
export function useBooking(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const response = (await api.get(`/bookings/${id}`)) as { data: Booking | { data: Booking } };
      return response.data;
    },
    enabled: Boolean(id),
  });
}

// 2. Bookings Management Custom Hook
export function useBookings() {
  const queryClient = useQueryClient();

  // Get all bookings
  const bookings = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = (await api.get('/bookings')) as { data: Booking[] | { data: Booking[] } };
      return response.data;
    },
  });

  // Create booking
  const createBooking = useMutation({
    mutationFn: async (data: CreateBookingData) => {
      const response = (await api.post('/bookings', data)) as { data: unknown };
      return response.data;
    },
    onSuccess: () => {
      toast.success('Booking created successfully!');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: unknown) => {
      const err = error as ApiErrorResponse;
      toast.error(err.response?.data?.message || err.message || 'Failed to create booking');
    },
  });

  // Cancel booking
  const cancelBooking = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      const response = (await api.patch(`/bookings/${id}/cancel`, { reason })) as { data: unknown };
      return response.data;
    },
    onSuccess: () => {
      toast.success('Booking cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: unknown) => {
      const err = error as ApiErrorResponse;
      toast.error(err.response?.data?.message || err.message || 'Failed to cancel booking');
    },
  });

  return {
    bookings,
    createBooking,
    cancelBooking,
    isLoading: bookings.isLoading || createBooking.isPending,
  };
}