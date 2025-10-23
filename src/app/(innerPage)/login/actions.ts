'use server';

import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function loginUser(prevState: any, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    const errors: any = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.keys(errors).map(field => errors[field]).join(' ');
    return { message: errorMessage, status: 'error' };
  }

  const { email, password } = parsed.data;

  // In a real application, you would hash the password and save to a database
  console.log('Login user:', { email, password });

  // Simulate a delay for network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { message: 'Login successful!', status: 'success' };
}
