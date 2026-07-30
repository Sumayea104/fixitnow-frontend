export const Roles = {
  CUSTOMER: 'CUSTOMER',
  TECHNICIAN: 'TECHNICIAN',
  ADMIN: 'ADMIN',
} as const

export type Role = (typeof Roles)[keyof typeof Roles]

export const RoleLabels = {
  [Roles.CUSTOMER]: 'Customer',
  [Roles.TECHNICIAN]: 'Technician',
  [Roles.ADMIN]: 'Admin',
} as const

export const RoleRoutes = {
  [Roles.CUSTOMER]: '/dashboard/customer',
  [Roles.TECHNICIAN]: '/dashboard/technician',
  [Roles.ADMIN]: '/dashboard/admin',
} as const