'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import type { LoginInput, RegisterInput } from '../validations/auth.schema';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
  typeof window !== 'undefined'
    ? !!localStorage.getItem('token')
    : false;

  return {
    login,
    register,
    logout,
    isLoading: login.isPending || register.isPending,
  isAuthenticated,
  };
}