import { Role } from '@saas/auth'

import { api } from '@/http/api-client'

interface GetMembershipResponse {
  membership: {
    id: string
    userId: string
    role: Role
    organizationId: string
  }
}

export async function getMembership({ org }: { org: string }) {
  const response = await api
    .get(`organization/${org}/membership`)
    .json<GetMembershipResponse>()

  return response
}
