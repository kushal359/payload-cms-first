import type { CollectionConfig } from 'payload'
import { formatPhoneNumber } from '@/components/PhoneInput'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'Phone Number',
      type: 'text',
      admin: {
          placeholder: '(123) 456-7890',
      },
      hooks: {
          afterChange: [(value: unknown): string => formatPhoneNumber(value as string)],
      }
    },
  ],
}
