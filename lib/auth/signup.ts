import crypto from 'node:crypto';
import { User, users } from '@/database';
import { hash } from './hash';
import { faker } from "@faker-js/faker";

export function signup(details: User) {
  const user: User = {
    ...details,
    id: crypto.randomUUID(),
    userImage: faker.image.avatar(),
    password: hash(details.password),
    createdAt: new Date(),
  };

  users.add(user);

  return user;
}
