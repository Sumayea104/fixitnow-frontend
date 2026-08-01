export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
  status: 'ACTIVE' | 'BANNED';
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}