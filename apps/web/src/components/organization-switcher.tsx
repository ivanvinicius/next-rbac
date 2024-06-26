import { ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'

import { getCurrentOrg } from '@/auth/auth'
import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function OrganizationSwitcher() {
  const currentOrganization = getCurrentOrg()
  const { organizations } = await getOrganizations()

  const organizationActive = organizations.find(
    (org) => org.slug === currentOrganization,
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {organizationActive ? (
          <>
            <Avatar className="mr-2 size-5">
              {organizationActive.avatarUrl && (
                <AvatarImage src={organizationActive.avatarUrl} />
              )}
              <AvatarFallback>OR</AvatarFallback>
            </Avatar>
            <span className="truncate text-left">
              {organizationActive.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}

        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[200px]"
        align="end"
        alignOffset={-16}
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {organizations.map(({ id, name, avatarUrl, slug }) => (
            <DropdownMenuItem key={id} asChild>
              <Link href={`/org/${slug}`}>
                <Avatar className="mr-2 size-5">
                  {avatarUrl && <AvatarImage src={avatarUrl} />}
                  <AvatarFallback>OR</AvatarFallback>
                </Avatar>
                <span className="truncate">{name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <DropdownMenuItem asChild>
            <Link href={'/create-organization'}>
              <Plus className="mr-2 size-5" />
              Create Organization
            </Link>
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
