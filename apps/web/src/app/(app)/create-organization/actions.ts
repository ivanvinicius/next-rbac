'use server'
import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganization } from '@/http/create-organization'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Please include at least 2 characters.' }),

    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (!value) return true

          const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/
          return domainRegex.test(value)
        },
        { message: 'Please, provide a valid domain.' },
      ),

    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled',
      path: ['domain'],
    },
  )

export async function createOrganizationAction(data: FormData) {
  const parse = organizationSchema.safeParse(Object.fromEntries(data))

  if (!parse.success) {
    const errors = parse.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = parse.data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
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

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
