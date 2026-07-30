export const Routes = {
  HOME: '/',
  SERVICES: '/services',
  TECHNICIANS: '/technicians',
  LOGIN: '/login',
  REGISTER: '/register',

  // Customer
  CUSTOMER_DASHBOARD: '/dashboard/customer',
  CUSTOMER_BOOKINGS: '/dashboard/customer/bookings',
  CUSTOMER_PAYMENTS: '/dashboard/customer/payments',
  CUSTOMER_PROFILE: '/dashboard/customer/profile',

  // Technician
  TECHNICIAN_DASHBOARD: '/dashboard/technician',
  TECHNICIAN_BOOKINGS: '/dashboard/technician/bookings',
  TECHNICIAN_AVAILABILITY: '/dashboard/technician/availability',
  TECHNICIAN_PROFILE: '/dashboard/technician/profile',

  // Admin
  ADMIN_DASHBOARD: '/dashboard/admin',
  ADMIN_USERS: '/dashboard/admin/users',
  ADMIN_CATEGORIES: '/dashboard/admin/categories',
  ADMIN_BOOKINGS: '/dashboard/admin/bookings',

  // Payment
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_CANCEL: '/payment/cancel',
} as const