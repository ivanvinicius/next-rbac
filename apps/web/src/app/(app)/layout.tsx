import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

interface Props {
  children: React.ReactNode
  sheet: React.ReactNode
}

export default function AppLayout({ children, sheet }: Props) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
