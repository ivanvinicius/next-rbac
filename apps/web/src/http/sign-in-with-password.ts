import { api } from '@/http/api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const body = JSON.stringify({
    email,
    password,
  })

  const response = await api
    .post('sessions/password', { body })
    .json<SignInWithPasswordResponse>()

  return response
}
