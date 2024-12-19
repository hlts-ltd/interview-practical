import { ReactNode } from 'react';
import type { Metadata } from "next";
import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Layout } from '@/components/Layout';
import "../globals.css";
import { getAuth } from '@/lib/auth/cookie';

export const metadata: Metadata = {
  title: "HAIDI Practical Assessment",
  description: "Generated by create next app",
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {

    const { user } = await getAuth();
  
    if (user) redirect('/', RedirectType.replace);

  return (
    <Layout>
      {children}
    </Layout>
  );
}
