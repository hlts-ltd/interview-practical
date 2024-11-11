import { cookies } from 'next/headers';
import { users } from '@/database';
import type { Session } from './auth.types';
import { hash } from './hash';

const oneWeek = 1000 * 60 * 60 * 24 * 7;

interface Credentials {
  email: string,
  password: string,
}

export async function authenticate(credentials: Credentials): Promise<Session> {
  const user = Array.from(users).find(({ email, password }) => email === credentials.email && password === hash(credentials.password));

  if (!user) throw new Error('Unauthorised');

  const session: Session = { user };

  void await cookies().then(jar => jar.set(
    'session',
    Buffer.from(JSON.stringify(session), 'utf-8').toString('base64'),
    { expires: Date.now() + oneWeek }
  ));

  return session;
}
