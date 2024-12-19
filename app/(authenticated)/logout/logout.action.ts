'use server'

import { redirect } from "next/navigation";
import { invalidateSession } from '@/lib/auth/sessions';
import { deleteSessionCookie } from '@/lib/auth/cookie';
import { getAuth } from '@/lib/auth/cookie';

export async function logoutAction() {
      const { session } = await getAuth();
    
      if (!session) {
        redirect('/auth/login');
      }
    
      await invalidateSession(session.id);
      await deleteSessionCookie();
}