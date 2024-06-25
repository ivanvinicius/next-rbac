'use client'

import { AlertTriangle, Fingerprint, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGitHub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: signUpAction,
    onSuccess: () => {
      router.push('/auth/sign-in')
    },
  })

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {success === false && message && (
          <Alert variant={'destructive'}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" />

          {errors?.confirmPassword && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.confirmPassword[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            ' Create account'
          )}
        </Button>

        <Button className="w-full" variant={'link'} size="sm" asChild>
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGitHub}>
        <Button
          className="w-full gap-2"
          variant={'outline'}
          type="submit"
          disabled={isPending}
        >
          <Fingerprint className="h-4 w-4" />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
