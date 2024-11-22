import { useMemo } from 'react';
import { getCookie } from 'cookies-next';
import { Session } from '@/lib/auth';

export function useSession(): Session | null {
  const session = getCookie('session');

  return useMemo(() => session ? JSON.parse(atob(session as string)) : null, [session]);
}
