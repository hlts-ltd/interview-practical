'use server';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { generateRandomSessionToken, createSession } from '@/lib/auth/sessions';
import {hashPassword} from '@/lib/auth/password';
import { prisma } from '@/database/prisma';
import { setSessionCookie } from '@/lib/auth/cookie';
import { faker } from '@faker-js/faker'

export async function signup(data: FormData) {
  const formDataRaw = {
    email: data.get('email') as string,
    name: data.get('name') as string,
    password: data.get('password') as string,
  };


  try {
    const passwordHash = await hashPassword(formDataRaw.password);

    const user = await prisma.user.create({
      data: {
        name: formDataRaw.name,
        email: formDataRaw.email,
        imageUrl: faker.image.avatar(),
        passwordHash
      },
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);

  } catch (error) {
    console.log('Error::', error);
  }

  redirect('/auth/login');
}
