import { api } from '@/http/api-client'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations() {
  const response = await api
    .get('organizations')
    .json<GetOrganizationsResponse>()

  return response
}
