'use server';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

interface Options {
  redirect?: string,
}

export async function logout(options: Options = {}) {
  void await cookies().then(jar => jar.delete('session'));

  if (options.redirect) redirect(options.redirect, RedirectType.push);
}
