export const BookingStatuses = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  PAID: 'PAID',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

export const BookingStatusColors = {
  REQUESTED: 'bg-amber-100 text-amber-700 border-amber-200',
  ACCEPTED: 'bg-blue-100 text-blue-700 border-blue-200',
  DECLINED: 'bg-red-100 text-red-700 border-red-200',
  PAID: 'bg-purple-100 text-purple-700 border-purple-200',
  IN_PROGRESS: 'bg-green-100 text-green-700 border-green-200',
  COMPLETED: 'bg-gray-100 text-gray-700 border-gray-200',
  CANCELLED: 'bg-red-200 text-red-800 border-red-300',
} as const

export const BookingStatusLabels = {
  REQUESTED: 'Requested',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
  PAID: 'Paid',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const