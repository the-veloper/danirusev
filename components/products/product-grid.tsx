'use client'

import { Product } from '@/types/payload-types'
import { ProductCard } from './product-card'
import { Button } from '../ui/button'

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
  showLoadMore?: boolean
}

export function ProductGrid({ 
  products, 
  title = "Featured Products", 
  description = "Discover our carefully curated selection of premium jewelry designed to complement your unique style", 
  showLoadMore = false 
}: ProductGridProps) {
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && products.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="default" className="">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}