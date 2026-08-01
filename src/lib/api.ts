const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  },

  post: async <T>(endpoint: string, data?: unknown): Promise<T> => {
    const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  },

  put: async <T>(endpoint: string, data?: unknown): Promise<T> => {
    const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  },

  patch: async <T>(endpoint: string, data?: unknown): Promise<T> => {
    const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  },
};