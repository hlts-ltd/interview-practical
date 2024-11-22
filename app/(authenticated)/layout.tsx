import { FC, ReactNode } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/lib/auth';
import Layout from '@/components/Layout';
import { Logout } from '@/components/Logout';

interface Props {
  children: ReactNode,
}

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth.session({ required: false });

  if (!session) redirect('/auth/login', RedirectType.replace);

  return (
    <Layout>
      <div className="flex justify-between">
        <p>Welcome, {session.user.name}!</p>

        <Logout />
      </div>

      {children}
    </Layout>
  );
};

export default RootLayout;
