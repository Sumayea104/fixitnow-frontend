import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return (response as { data: unknown }).data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}