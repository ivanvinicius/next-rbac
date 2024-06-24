'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const response = await signInWithPassword({
    email: String(email),
    password: String(password),
  })

  console.log(response)
}
