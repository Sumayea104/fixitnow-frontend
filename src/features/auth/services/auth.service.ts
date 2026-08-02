import { api } from '@/lib/api';
import { LoginInput, RegisterInput } from '../validations/auth.schema';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export const authService = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/login', data);
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/register', data);
  },

  getMe: async (): Promise<{ success: boolean; data: { user: User } }> => {
    return api.get<{ success: boolean; data: { user: User } }>('/auth/me');
  },

  token:
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null,
};