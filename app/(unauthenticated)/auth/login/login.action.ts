'use server';
import { auth } from '@/lib/auth';

export async function login(data: FormData) {
  void await auth.authenticate({ email: data.get('email'), password: data.get('password') });
}
