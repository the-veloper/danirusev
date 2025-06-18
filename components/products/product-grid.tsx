'use client'

import { Product } from '@/types/payload-types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { getTextFromRichText } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  console.log('Products:', products)
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        // First try to find primary image, then fall back to first image
        const primaryImage = product.images?.find((img) => img.isPrimary)?.image || 
                            (product.images && product.images.length > 0 ? product.images[0].image : null)
        
        console.log('Product:', product.name, 'Image used:', primaryImage)
        
        return (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Card className="group h-full overflow-hidden transition-colors hover:border-primary">
              <CardHeader className="border-b border-muted p-0">
                {primaryImage && (
                  <div className="aspect-square relative">
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="grid gap-2 p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {getTextFromRichText(product.description)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">${product.price}</p>
                  {product.compareAtPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      ${product.compareAtPrice}
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}