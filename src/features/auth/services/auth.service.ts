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
    token?: string;
    accessToken?: string;
    user: User;
  };
}

export const authService = {
  // 🌟 LOGIN
  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/api/auth/login', credentials); 
  },
  
  // 🌟 REGISTER
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/api/auth/register', data);
  },

  // 🌟 GET CURRENT USER (ME)
  getMe: async (): Promise<{ user: User }> => {
    const res = await api.get<{
      data?: {
        data?: { user: User };
        user?: User;
      };
      user?: User;
    }>('/api/auth/me');

    return (res.data?.data || res.data || { user: res.user }) as { user: User };
  },

  // 🌟 GET LOCAL STORAGE TOKEN
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
};