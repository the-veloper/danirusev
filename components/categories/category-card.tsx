'use client'

import { Category } from '@/types/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl, getTextFromRichText } from '@/lib/utils'

interface CategoryCardProps {
  category: Category & { productCount?: number }
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Use the utility function to get the correct URL
  const imageUrl = getMediaUrl(category.image?.url)

  // Use the productCount if available, otherwise use 0
  const itemCount = category.productCount || 0
  
  // Categories with more products are considered popular
  // You can adjust this threshold based on your data
  const isPopular = itemCount > 10
  
  // Assign a random color from our palette
  const colors = ["blue", "purple", "green", "orange", "pink", "indigo"]
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/30 border-blue-200 hover:border-blue-300",
    purple: "from-purple-500/20 to-purple-600/30 border-purple-200 hover:border-purple-300",
    green: "from-green-500/20 to-green-600/30 border-green-200 hover:border-green-300",
    orange: "from-orange-500/20 to-orange-600/30 border-orange-200 hover:border-orange-300",
    pink: "from-pink-500/20 to-pink-600/30 border-pink-200 hover:border-pink-300",
    indigo: "from-indigo-500/20 to-indigo-600/30 border-indigo-200 hover:border-indigo-300",
  }
  
  return (
    <Card
      className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <Link href={`/categories/${category.slug}`}>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />

        {/* Popular Badge */}
        {isPopular && (
          <Badge className="absolute top-4 left-4 z-10 bg-yellow-500 hover:bg-yellow-600 text-white">
            Popular
          </Badge>
        )}

        <CardContent className="relative p-6 h-full flex flex-col">
          {/* Category Image */}
          <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden bg-white/50 shadow-sm">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={category.image?.alt || category.name}
              fill
              className="object-cover text-black transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Category Info */}
          <div className="text-center flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {getTextFromRichText(category.description)}
                </p>
              )}
            </div>

            {/* Item Count */}
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Explore Button */}
            <div className="flex items-center justify-center gap-2 text-gray-800 font-medium group-hover:gap-3 transition-all duration-300">
              <span className="text-sm">Explore</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
} 