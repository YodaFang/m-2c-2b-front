'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message is required"),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    const validatedData = contactFormSchema.parse(data);
    // Simulate a server call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted successfully:', validatedData);
    return { success: true, message: 'Your message has been sent! It only for demo purpose' };
  } catch (error: any) {
    console.error('Form submission error:', error);
    return { success: false, message: error.errors ? error.errors.map((err: any) => err.message).join(', ') : 'Failed to send message.' };
  }
}