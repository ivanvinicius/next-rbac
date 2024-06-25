import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github oauth code was not found.' },
      { status: 400 },
    )
  }

  const response = await signInWithGithub({ code })

  cookies().set('token', response.token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
