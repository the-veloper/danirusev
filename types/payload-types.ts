export interface Media {
  id: string
  url: string
  alt: string
  caption?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  status: 'draft' | 'published' | 'archived'
  category: Category
  collections?: Collection[]
  images?: {
    image: Media
    altText: string
    isPrimary: boolean
  }[]
  variants?: {
    name: string
    options: {
      name: string
      price: number
      sku: string
      inventory: number
    }[]
  }[]
  metadata?: {
    title?: string
    description?: string
  }
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description?: string
  parent?: Category
  image?: Media
  metadata?: {
    title?: string
    description?: string
  }
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Collection {
  id: string
  name: string
  description?: string
  image?: Media
  isAutomated: boolean
  conditions?: {
    matchType: 'all' | 'any'
    rules: {
      field: 'name' | 'category' | 'price' | 'tag'
      operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than'
      value: string
    }[]
  }
  metadata?: {
    title?: string
    description?: string
  }
  slug: string
  createdAt: string
  updatedAt: string
}