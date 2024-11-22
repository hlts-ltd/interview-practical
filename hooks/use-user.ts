import type { User } from '@/database';
import { useSession } from './use-session';

export function useUser(): User {
  const session = useSession();

  if (!session) throw new Error('Missing session');

  return session.user;
}
