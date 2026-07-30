export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  success: false
  message: string
  errors?: Array<{
    path: string
    message: string
  }>
}