import { Fingerprint } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

export default async function SignInPage() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />

        <Link
          className="text-xs font-medium text-primary hover:underline"
          href="/auth/forgot-password"
        >
          Forgot your password
        </Link>
      </div>

      <Button className="w-full" type="submit">
        Sign in with e-mail
      </Button>

      <Button className="w-full" variant={'link'} asChild size="sm">
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button className="w-full gap-2" variant={'outline'} type="submit">
        <Fingerprint className="h-4 w-4" />
        Sign in with Github
      </Button>
    </form>
  )
}
