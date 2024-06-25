'use server'

import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  /* eslint-disable */
  githubSignInURL.searchParams.set('client_id', 'Iv23lid9I1JV3uF8EJtE')
  githubSignInURL.searchParams.set('redirect_uri', 'http://localhost:3000/api/auth/callback')
  githubSignInURL.searchParams.set('scope', 'user')
  /* eslint-enable */

  redirect(githubSignInURL.toString())
}
