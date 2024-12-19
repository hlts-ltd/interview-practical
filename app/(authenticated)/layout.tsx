import { FC, ReactNode } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { HeaderBar } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAuth } from '@/lib/auth/cookie';


interface Props {
  children: ReactNode,
}

const RootLayout: FC<Props> = async ({ children }) => {
  console.log('entry point of app')

  const { user } = await getAuth();

  if (!user) redirect('/auth/login', RedirectType.replace);

  return (
    <Layout>
        <HeaderBar />
        {children}
        <Footer />
    </Layout>
  );
};

export default RootLayout;
