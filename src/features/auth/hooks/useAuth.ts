'use client';

import { authService } from '../services/auth.service';
import type { LoginInput, RegisterInput } from '../validations/auth.schema';
import type { User } from '../types/auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type AuthMeResponse = {
  user?: User | null;
  data?: {
    user?: User | null;
  };
};

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Current Logged-in User Data Fetching
  const { data: user, isLoading: isUserLoading } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = (await authService.getMe()) as unknown as AuthMeResponse;
        return response?.user ?? response?.data?.user ?? null;
      } catch {
        return null;
      }
    },
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
    retry: false,
  });

  // Login Mutation
  const login = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await authService.login(data);
      return response;
    },
    onSuccess: (data) => {
      const role = data.data.user.role.toLowerCase();
      localStorage.setItem('token', data.data.token);
      toast.success('Logged in successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push(`/${role}/dashboard`);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    },
  });

  // Register Mutation
  const register = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await authService.register(data);
      return response;
    },
    onSuccess: (data) => {
      const role = data.data.user.role.toLowerCase();
      localStorage.setItem('token', data.data.token);
      toast.success('Account created successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push(`/${role}/dashboard`);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    },
  });

  // Logout
  const logout = async () => {
    localStorage.removeItem('token');
    queryClient.clear();
    toast.success('Logged out');
    router.push('/login');
  };

  const isAuthenticated =
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false;

  return {
    user: user || null,
    login,
    register,
    logout,
    isLoading: login.isPending || register.isPending || isUserLoading,
    isAuthenticated,
  };
}