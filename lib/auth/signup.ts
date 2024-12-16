import crypto from 'node:crypto';
import { User, users } from '@/database';
import { hash } from './hash';

export function signup(details: Omit<User, 'id'>) {
    
  if (Array.from(users).some((user) => user.email === details.email)) {
    throw new Error("Email is already registered.");
  }
  const uuid = crypto.randomUUID()
  const id = parseInt(uuid.replace(/[^0-9]/g, '').slice(0, 15))
  const user: User = {
    ...details,
    id: id,
    password: hash(details.password),
    favoriteSongs: [],
	profileImage: '',
  };

  users.add(user);

  return user;
}
