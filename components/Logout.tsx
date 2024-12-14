'use client';
import { FC, ReactNode } from 'react';
import { logout } from '@/lib/auth/logout';

interface Props {
  children?: ReactNode,
}

export const Logout: FC<Props> = ({ children }) => {
  return (
    <button onClick={() => logout()} className='bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition'>
      {children ?? 'Logout'}
    </button>
  )
}
