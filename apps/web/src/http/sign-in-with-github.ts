import { api } from '@/http/api-client'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const body = JSON.stringify({
    code,
  })

  const response = await api
    .post('sessions/github', { body })
    .json<SignInWithGithubResponse>()

  return response
}
