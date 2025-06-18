import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const Collections: CollectionConfig = {
  slug: 'collections',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'products'],
    group: 'Shop',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Collection banner image',
      },
    },
    {
      name: 'isAutomated',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically add products based on conditions',
      },
    },
    {
      name: 'conditions',
      type: 'group',
      admin: {
        condition: (data) => Boolean(data?.isAutomated),
      },
      fields: [
        {
          name: 'matchType',
          type: 'select',
          required: true,
          defaultValue: 'all',
          options: [
            {
              label: 'Match all conditions',
              value: 'all',
            },
            {
              label: 'Match any condition',
              value: 'any',
            },
          ],
        },
        {
          name: 'rules',
          type: 'array',
          fields: [
            {
              name: 'field',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Product Title',
                  value: 'name',
                },
                {
                  label: 'Product Category',
                  value: 'category',
                },
                {
                  label: 'Product Price',
                  value: 'price',
                },
                {
                  label: 'Product Tag',
                  value: 'tag',
                },
              ],
            },
            {
              name: 'operator',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Equals',
                  value: 'equals',
                },
                {
                  label: 'Not Equals',
                  value: 'not_equals',
                },
                {
                  label: 'Contains',
                  value: 'contains',
                },
                {
                  label: 'Not Contains',
                  value: 'not_contains',
                },
                {
                  label: 'Greater Than',
                  value: 'greater_than',
                },
                {
                  label: 'Less Than',
                  value: 'less_than',
                },
              ],
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}; 