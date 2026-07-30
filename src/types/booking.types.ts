export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export interface Booking {
  id: string
  bookingNumber: string
  customerId: string
  technicianId: string
  serviceId: string
  scheduledDate: string
  scheduledTime: string
  durationMinutes: number
  totalPrice: number
  status: BookingStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateBookingRequest {
  serviceId: string
  scheduledDate: string
  scheduledTime: string
  durationMinutes?: number
  notes?: string
}

export interface BookingResponse {
  id: string
  bookingNumber: string
  status: BookingStatus
  totalPrice: number
}