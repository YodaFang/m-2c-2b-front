'use server';

import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function registerUser(prevState: any, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    const errors: any = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.keys(errors).map(field => errors[field]).join(' ');
    return { message: errorMessage, status: 'error' };
  }

  const { name, email, password } = parsed.data;

  // In a real application, you would hash the password and save to a database
  console.log('Registering user:', { name, email, password });

  // Simulate a delay for network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { message: 'Registration successful!', status: 'success' };
}
