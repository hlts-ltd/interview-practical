import { FC, ReactNode } from 'react'
import { redirect, RedirectType } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Layout } from '@/components/Layout'
import Header from '@/components/Header'

interface Props {
  children: ReactNode,
}

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await auth.session({ required: false });

  if (!session) redirect('/auth/login', RedirectType.replace);

	return (
		<Layout>
            <Header session={ session ? session : false} />
			<main className='container mx-auto py-6'>{children}</main>
		</Layout>
	)
}

export default RootLayout
