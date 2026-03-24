import type { CollectionConfig } from 'payload'

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
        components: {
          Field: 'src/components/PhoneInput#PhoneInput', 
        },
      }, 
    },
  ],
}
