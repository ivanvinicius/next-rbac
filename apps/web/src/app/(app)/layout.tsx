import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

import type { LayoutProps } from '../layout'

export default function AppLayout({ children }: LayoutProps) {
  /* if FALSE, redirect to AUTH. Avoid user to access APP pages */
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
