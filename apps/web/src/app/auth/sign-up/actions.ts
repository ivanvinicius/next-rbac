'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, provide your full name.',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Please, provide your password with 6 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password does not match',
    path: ['confirmPassword'],
  })

export async function signUpAction(data: FormData) {
  const parse = signUpSchema.safeParse(Object.fromEntries(data))

  if (!parse.success) {
    const errors = parse.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = parse.data

  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
