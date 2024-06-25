import { api } from '@/http/api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  const body = JSON.stringify({
    name,
    email,
    password,
  })

  await api.post('users', { body })
}
