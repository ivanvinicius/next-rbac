import { auth } from '@/auth/is-authenticated'

export default async function Home() {
  const { user } = await auth()

  return <pre className="">{JSON.stringify(user, null, 2)}</pre>
}
