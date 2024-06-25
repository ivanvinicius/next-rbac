import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

import type { LayoutProps } from '../layout'

export default function AuthLayout({ children }: LayoutProps) {
  /* if TRUE, redirect to APP. Avoid user to access AUTH pages */
  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}
