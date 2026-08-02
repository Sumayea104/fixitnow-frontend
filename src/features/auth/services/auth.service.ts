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
    token: string;
    accessToken: string;
    user: User;
  };
}

export const authService = {

  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response;
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response;
  },

  getMe: async (): Promise<{ success: boolean; data: { user: User } }> => {
    return api.get<{ success: boolean; data: { user: User } }>('/auth/me');
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
};