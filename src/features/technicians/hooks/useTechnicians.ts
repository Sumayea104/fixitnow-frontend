import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Technician {
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
    price: number;
  }[];
}

interface TechniciansFilters {
  service?: string;
  location?: string;
  minRating?: number;
  isAvailable?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export function useTechnicians(filters: TechniciansFilters = {}) {
  const queryString = new URLSearchParams();

  if (filters.service) queryString.append('service', filters.service);
  if (filters.location) queryString.append('location', filters.location);
  if (filters.minRating) queryString.append('minRating', filters.minRating.toString());
  if (filters.isAvailable !== undefined) queryString.append('isAvailable', filters.isAvailable.toString());
  if (filters.search) queryString.append('search', filters.search);
  if (filters.page) queryString.append('page', filters.page.toString());
  if (filters.limit) queryString.append('limit', filters.limit.toString());

  const url = `/technicians${queryString.toString() ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: ['technicians', filters],
    queryFn: async () => {
      const response = (await api.get(url)) as { data: Technician[] };
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}