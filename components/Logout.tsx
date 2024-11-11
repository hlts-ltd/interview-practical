'use client';
import { FC, ReactNode } from 'react';
import { logout } from '@/lib/auth/logout';

interface Props {
  children?: ReactNode,
}

export const Logout: FC<Props> = ({ children }) => {
  return (
    <button onClick={() => logout()}>
      {children ?? 'Logout'}
    </button>
  )
}
