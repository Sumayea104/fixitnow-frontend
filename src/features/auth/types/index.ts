// Import User type from auth types
import type { User } from '@/features/auth/services/auth.service';

// Re-export all types from features
export * from '@/features/auth/types/auth.types';

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Booking Types
export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  totalPrice: number;
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  durationMinutes?: number;
  categoryId: string;
  technicianId: string;
  isActive: boolean;
  isFeatured: boolean;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Technician Types
export interface Technician {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  averageRating: number;
  totalReviews: number;
  location?: string;
  isAvailable: boolean;
  isVerified: boolean;
  completedJobs: number;
  skills: string[];
  user?: User;  // ✅ Now User is imported
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  parentCategoryId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string;
  images: string[];
  isPublic: boolean;
  isVerified: boolean;
  helpfulCount: number;
  reply?: string;
  replyAt?: string;
  createdAt: string;
  updatedAt: string;
  customer?: User;
  technician?: Technician;
}