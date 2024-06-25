import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

import type { LayoutProps } from '../layout'

export default function AppLayout({ children }: LayoutProps) {
  /* if FALSE, redirect to AUTH. Avoid user to access APP pages */
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
