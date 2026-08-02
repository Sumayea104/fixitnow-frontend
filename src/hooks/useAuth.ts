'use client';

import { authService } from '@/features/auth/services/auth.service';
import { LoginInput, RegisterInput } from '@/features/auth/validations/auth.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (data) => {
      const role = data?.data?.user?.role?.toLowerCase();
      const token = data?.data?.token || data?.data?.accessToken;

      if (token) {
        localStorage.setItem('token', token);
      }
      
      toast.success('Logged in successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      if (role) {
        router.push(`/${role}/dashboard`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (data) => {
      const role = data?.data?.user?.role?.toLowerCase();
      const token = data?.data?.token || data?.data?.accessToken;

      if (token) {
        localStorage.setItem('token', token);
      }

      toast.success('Registered successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (role) {
        router.push(`/${role}/dashboard`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  // Get Current User Query
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const res = await authService.getMe();
      return res.data;
    },
    retry: false,
  });

  // Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['user'], null);
    queryClient.clear();
    toast.info('Logged out');
    router.push('/login');
  };

  return {
    user,
    isLoading,
    isError,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
  };
}