import type { CollectionConfig } from 'payload'
//import { formatPhoneNumber } from '@/components/PhoneInput'

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
      name: 'selectUsers',
      label: 'Select Users',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        components:{
          Field: 'src/components/UsersSelect#UsersSelect'
        }
      },
      filterOptions: {
        role: {
          equals: 'user',
        },
      },
    },
    {
      name: 'Content',
      type: 'textarea',
      admin: {
        components: {
          Field: 'src/components/RichTextContent#RichTextContent'
        }
      }
    },
    
  ],
}
