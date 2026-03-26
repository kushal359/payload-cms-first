import type { CollectionConfig } from 'payload'
//import { formatPhoneNumber } from '@/components/PhoneInput'
import { BlockComp } from '@/components/BlockComp'
import { BlockCompFamily } from '@/components/BlockCompFamily'

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
      required: true,
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
      name: 'email',
      type: 'email',
    },
    {
      name: 'phoneNumber',
      type: 'text',
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
    {
      name: 'Blocks',
      type: 'blocks',
      blocks: [BlockComp,BlockCompFamily],
    }
    
  ],
}
