'use client';

import { redirect } from "next/navigation";
import { logoutAction } from './logout.action';

export const Logout = async () => {
   logoutAction();
   redirect('/auth/login');
}

export default Logout;