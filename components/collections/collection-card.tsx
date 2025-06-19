'use client'

import { Collection } from '@/types/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl, getTextFromRichText } from '@/lib/utils'

interface CollectionCardProps {
  collection: Collection & { 
    productCount?: number;
    productImages?: string[];
  }
}

export function CollectionCard({ collection }: CollectionCardProps) {
  // Use the utility function to get the correct URL
  const coverImage = getMediaUrl(collection.image?.url)
  
  // Use the productCount if available, otherwise use 0
  const itemCount = collection.productCount || 0
  
  // For demo purposes, generate some placeholder product images
  // In a real app, you'd use actual product images from the collection
  const productImages = collection.productImages || Array(4).fill('/placeholder.svg')
  
  // In a real app, these would be properties of the collection
  // For now, let's generate some random ones for visual variety
  const isNew = Math.random() > 0.7
  const isFeatured = Math.random() > 0.7
  const curator = collection.name.includes('Summer') ? 'Style Team' : 
                  collection.name.includes('Winter') ? 'Seasonal Experts' : 
                  'Jewelry Curators'
  
  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isFeatured && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Featured</Badge>}
          {isNew && (
            <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-white">
              New
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:text-red-500"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Product Preview Grid */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
          {productImages.slice(0, 4).map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <CardContent className="p-6">
        {/* Collection Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link href={`/collections/${collection.slug}`}>
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {collection.name}
                </h3>
              </Link>
              {curator && <p className="text-sm text-muted-foreground mt-1">Curated by {curator}</p>}
            </div>
            <Badge variant="outline" className="ml-2 text-xs">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Badge>
          </div>

          {collection.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {getTextFromRichText(collection.description)}
            </p>
          )}

          {/* View Collection Button */}
          <Link href={`/collections/${collection.slug}`}>
            <Button className="w-full mt-4 group/btn transition-all duration-300 hover:shadow-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <span>View Collection</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 