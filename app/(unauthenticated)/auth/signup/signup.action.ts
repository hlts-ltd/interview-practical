'use server';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export async function signup(data: FormData) {
  try {
    await auth.signup({
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
    });
    redirect('/auth/login');
  } catch (error) {
    return { error: (error as Error).message };
  }
}
