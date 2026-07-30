export type UserRole = 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  status: 'ACTIVE' | 'BANNED'
  profileImage?: string
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
  role: UserRole
}

export interface AuthResponse {
  user: User
  token: string
}