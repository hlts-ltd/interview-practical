'use server';
import { prisma } from '@/database/prisma';
import { verifyPasswordHash } from '@/lib/auth/password';
import { generateRandomSessionToken, createSession } from '@/lib/auth/sessions';
import { setSessionCookie } from '@/lib/auth/cookie';

export async function login(data: FormData) {

  const formDataRaw = {
    email: data.get('email') as string,
    password: data.get('password') as string,
  };

  // todo: validate formDataRaw  using Zod (and retrieve typed formData) before proceeding 

  try {
    const user = await prisma.user.findUnique({
      where: { email: formDataRaw.email },
    });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, formDataRaw.password);

    if (!validPassword) {
      throw new Error('Incorrect email or password');
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    // todo: error handling
  }




}
