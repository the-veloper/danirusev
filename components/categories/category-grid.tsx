'use client'

import { Category } from '@/types/payload-types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl, getTextFromRichText } from '@/lib/utils'

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  console.log('Categories:', categories)
  
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => {
        console.log('Category:', category.name, 'Image:', category.image)
        
        // Use the utility function to get the correct URL
        const imageUrl = getMediaUrl(category.image?.url)
        
        return (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card className="group h-full overflow-hidden transition-colors hover:border-primary">
              <CardHeader className="border-b border-muted p-0">
                {category.image && (
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={imageUrl}
                      alt={category.image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">{category.name}</h3>
                {category.description && (
                  <p className="mt-2 text-sm text-muted-foreground text-center line-clamp-2">
                    {getTextFromRichText(category.description)}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}