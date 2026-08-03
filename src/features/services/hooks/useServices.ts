import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  durationMinutes?: number;
  isActive: boolean;
  isFeatured: boolean;
  images: string[];
  tags: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
  technician: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      profileImage?: string;
    };
    averageRating: number;
    totalReviews: number;
    location?: string;
  };
  averageRating: number;
  totalReviews: number;
  createdAt: string;
}

interface ServicesFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export function useServices(filters: ServicesFilters = {}) {
  const queryString = new URLSearchParams();

  if (filters.category) queryString.append('category', filters.category);
  if (filters.minPrice) queryString.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) queryString.append('maxPrice', filters.maxPrice.toString());
  if (filters.rating) queryString.append('rating', filters.rating.toString());
  if (filters.search) queryString.append('search', filters.search);
  if (filters.page) queryString.append('page', filters.page.toString());
  if (filters.limit) queryString.append('limit', filters.limit.toString());

  const url = `/services${queryString.toString() ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: ['services', filters],
    queryFn: async () => {
      const response = (await api.get(url)) as { data: Service[] };
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}