'use client'

import { Product } from '@/types/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { getMediaUrl, getTextFromRichText } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.isPrimary)?.image || 
                      (product.images && product.images.length > 0 ? product.images[0].image : null)
  
  // Use the utility function to get the correct URL
  const imageUrl = getMediaUrl(primaryImage?.url)
  
  // Calculate discount percentage if compareAtPrice exists
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : null
  
  // Hardcoded values for now - to be implemented later
  const rating = 4.5
  const reviewCount = Math.floor(Math.random() * 500) + 50
  const isNew = Math.random() > 0.7 // Random for demo purposes
  
  return (
    <Card className="group relative overflow-hidden border-0 bg-background shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-white">
              New
            </Badge>
          )}
          {discount && discount > 0 && (
            <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-white transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {getTextFromRichText(product.description)}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            {discount && discount > 0 && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                {discount}% off
              </Badge>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full mt-4 transition-all duration-300 hover:shadow-md" variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
} 