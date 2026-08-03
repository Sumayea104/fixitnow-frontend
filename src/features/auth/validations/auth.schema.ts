import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    role: z.enum(['CUSTOMER', 'TECHNICIAN']).default('CUSTOMER'), 
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });


// Type exports


export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;


export type RegisterInput = RegisterFormValues;