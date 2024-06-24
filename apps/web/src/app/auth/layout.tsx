import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/is-authenticated'

import type { LayoutProps } from '../layout'

export default function AuthLayout({ children }: LayoutProps) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}
