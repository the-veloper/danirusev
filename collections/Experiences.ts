import type { CollectionConfig } from 'payload';

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'gradient',
      type: 'text',
      required: true,
      admin: {
        description: 'Tailwind CSS gradient classes (e.g., "from-yellow-400 via-amber-500 to-orange-600")',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
        description: 'Tailwind CSS background color class (e.g., "bg-taxi")',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: 'Lucide icon name (e.g., "Users", "Car", "Zap")',
      },
    },
    {
      name: 'sessions',
      type: 'text',
      required: true,
    },
    {
      name: 'detailedInfo',
      type: 'group',
      fields: [
        {
          name: 'overview',
          type: 'text',
          required: true,
        },
        {
          name: 'whatYouGet',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
          ],
        },
        {
          name: 'process',
          type: 'array',
          fields: [
            {
              name: 'step',
              type: 'text',
            },
          ],
        },
        {
          name: 'locations',
          type: 'array',
          fields: [
            {
              name: 'location',
              type: 'text',
            },
          ],
        },
        {
          name: 'requirements',
          type: 'array',
          fields: [
            {
              name: 'requirement',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};