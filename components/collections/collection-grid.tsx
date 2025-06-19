'use client'

import { Collection } from '@/types/payload-types'
import { CollectionCard } from './collection-card'

interface CollectionGridProps {
  collections: Array<Collection & { productCount?: number; productImages?: string[] }>
  title?: string
  description?: string
}

export function CollectionGrid({ 
  collections, 
  title = "Curated Collections",
  description = "Handpicked collections by our experts, designed to inspire and delight" 
}: CollectionGridProps) {
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

      {/* Collection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}