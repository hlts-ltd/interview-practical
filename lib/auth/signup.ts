import crypto from 'node:crypto';
import { User, users } from '@/database';
import { hash } from './hash';

export function signup(details: Omit<User, 'id'>) {
  const user: User = {
    ...details,
    id: crypto.randomUUID(),
    password: hash(details.password),
  };

  users.add(user);

  return user;
}
