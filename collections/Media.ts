import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85
      }
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
  ],
  admin: {
    group: 'Content',
    description: 'Upload images for products, categories, and collections',
  },
}
