import { cookies } from 'next/headers';
import type { Session } from './auth.types';

interface Options {
  required?: boolean,
}

interface Required extends Options {
  required?: true,
}

interface Optional extends Options {
  required: false,
}

export async function session({ required }: Required): Promise<Session>;
export async function session({ required }: Optional): Promise<Session | null>;
export async function session({ required }: Options = {}): Promise<Session | null> {
  return cookies().then(jar => {
    const cookie = jar.get('session');

    if (required !== false && !cookie?.value) throw new Error('Unauthorised');

    return cookie?.value ? JSON.parse(Buffer.from(cookie.value, 'base64').toString('utf-8')) : null;
  });
}
