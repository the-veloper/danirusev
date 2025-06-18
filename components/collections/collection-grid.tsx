'use client'

import { Collection } from '@/types/payload-types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl, getTextFromRichText } from '@/lib/utils'

interface CollectionGridProps {
  collections: Collection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  console.log('Collections:', collections)
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => {
        console.log('Collection:', collection.name, 'Image:', collection.image)
        
        // Use the utility function to get the correct URL
        const imageUrl = getMediaUrl(collection.image?.url)
        
        return (
          <Link key={collection.id} href={`/collections/${collection.slug}`}>
            <Card className="group h-full overflow-hidden transition-colors hover:border-primary">
              <CardHeader className="border-b border-muted p-0">
                {collection.image && (
                  <div className="aspect-[2/1] relative">
                    <Image
                      src={imageUrl}
                      alt={collection.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">{collection.name}</h3>
                {collection.description && (
                  <div className="mt-2 text-sm text-muted-foreground text-center line-clamp-2">
                    {getTextFromRichText(collection.description)}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}