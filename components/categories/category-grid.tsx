'use client'

import { Category } from '@/types/payload-types'
import { CategoryCard } from './category-card'

interface CategoryGridProps {
  categories: Array<Category & { productCount?: number }>
  title?: string
  description?: string
}

export function CategoryGrid({ 
  categories, 
  title = "Shop by Category", 
  description = "Explore our diverse range of jewelry categories and find the perfect piece for any occasion" 
}: CategoryGridProps) {
  return (
    <div>
      {/* Header */}
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>}
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}