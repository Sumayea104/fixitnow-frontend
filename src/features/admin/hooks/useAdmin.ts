import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export interface DashboardStats {
  users: {
    total: number;
    active: number;
    banned: number;
  };
  technicians: {
    total: number;
    verified: number;
    unverified: number;
  };
  bookings: {
    total: number;
    pending: number;
    completed: number;
  };
  revenue: {
    total: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
  status: 'ACTIVE' | 'BANNED';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
}

export function useAdmin() {
  const queryClient = useQueryClient();

  // Dashboard Stats
  const stats = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard/stats');
      return ((response as { data?: DashboardStats })?.data || response) as DashboardStats;
    },
  });

  // All Users
  const users = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const response = await api.get('/admin/users');
      return ((response as { data?: User[] })?.data || response) as User[];
    },
  });

  // Update User Status
  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: 'ACTIVE' | 'BANNED' }) => {
      const response = await api.patch(`/admin/users/${userId}/status`, { status });
      return (response as { data?: unknown })?.data || response;
    },
    onSuccess: () => {
      toast.success('User status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update user status');
    },
  });

  // Categories
  const categories = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const response = await api.get('/admin/categories');
      return ((response as { data?: Category[] })?.data || response) as Category[];
    },
  });

  // Create Category
  const createCategory = useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
      const response = await api.post('/admin/categories', data);
      return (response as { data?: Category })?.data || response;
    },
    onSuccess: () => {
      toast.success('Category created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });

  // Update Category
  const updateCategory = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateCategoryInput> }) => {
      const response = await api.patch(`/admin/categories/${id}`, data);
      return (response as { data?: Category })?.data || response;
    },
    onSuccess: () => {
      toast.success('Category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });

  // Delete Category
  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/admin/categories/${id}`);
      return (response as { data?: unknown })?.data || response;
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });

  return {
    stats,
    users,
    updateUserStatus,
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading: stats.isLoading || users.isLoading || categories.isLoading,
  };
}