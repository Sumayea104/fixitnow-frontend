import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface TechnicianProfile {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  averageRating: number;
  totalReviews: number;
  location?: string;
  isAvailable: boolean;
  isVerified: boolean;
  completedJobs: number;
  skills: string[];
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
  services: {
    id: string;
    title: string;
    description: string;
    price: number;
    discountedPrice?: number;
    durationMinutes?: number;
    category: {
      id: string;
      name: string;
    };
  }[];
  availabilitySlots: {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isRecurring: boolean;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment?: string;
    customer: {
      id: string;
      name: string;
      profileImage?: string;
    };
    createdAt: string;
  }[];
}

export function useTechnicianProfile(id: string) {
  return useQuery({
    queryKey: ['technician', id],
    queryFn: async () => {
      const response = await api.get<TechnicianProfile>(`/technicians/${id}`);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}