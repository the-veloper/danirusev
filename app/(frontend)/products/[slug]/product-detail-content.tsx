"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProductCard } from "@/components/products/product-card"
import { Product } from "@/types/payload-types"
import { getTextFromRichText } from "@/lib/utils"
import {
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react"

// Sample reviews data - this would normally come from an API
const sampleReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely amazing quality! The craftsmanship is impeccable and it looks even better in person.",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "1 month ago",
    comment:
      "Beautiful piece, exactly as pictured. Only minor complaint is that the clasp could be a bit sturdier.",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "3 weeks ago",
    comment: "Best purchase I've made this year. The quality is excellent and it arrived in perfect condition.",
    verified: true,
  },
]

interface ProductDetailContentProps {
  product: Product;
  relatedProducts: Product[];
  productImages: { url: string; alt: string }[];
}

export default function ProductDetailContent({ product, relatedProducts, productImages }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  // Make sure we have images even if product doesn't have any
  const images = productImages.length > 0 ? productImages : Array(4).fill({ url: "/placeholder.svg", alt: product.name })
  
  // Format description as plain text
  const description = getTextFromRichText(product.description)
  
  // Calculate discount percentage if compareAtPrice exists
  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null
  
  // Set up some hardcoded data for now - this would normally come from the product
  const variants = {
    colors: [
      { name: "Silver", value: "silver", available: true },
      { name: "Gold", value: "gold", available: true },
      { name: "Rose Gold", value: "rose-gold", available: false },
    ],
    sizes: [
      { name: "Small", value: "small", available: true },
      { name: "Medium", value: "medium", available: true },
      { name: "Large", value: "large", available: true },
    ],
  }
  
  const [selectedColor, setSelectedColor] = useState(variants.colors[0].value)
  const [selectedSize, setSelectedSize] = useState(variants.sizes[0].value)

  // Sample features and specifications
  const features = [
    "High-quality materials",
    "Handcrafted by artisans",
    "Hypoallergenic",
    "Tarnish resistant",
    "Gift box included",
    "1-year warranty"
  ]
  
  const specifications = {
    Material: "925 Sterling Silver",
    Weight: "15g", // Hardcoded for now
    Dimensions: "Adjustable",
    Gemstone: "Cubic Zirconia",
    Finish: "Polished",
    Origin: "Made in Italy"
  }
  
  // Navigation functions for images
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  // Get category name for breadcrumb
  const getCategoryName = () => {
    if (product.category) {
      return typeof product.category === 'object' ? product.category.name : 'Products'
    }
    return 'Products'
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gray-900">Home</Link> / {' '}
            <Link href="/products" className="hover:text-gray-900">Products</Link> / {' '}
            <Link href={`/categories/${typeof product.category === 'object' ? product.category.slug : ''}`} className="hover:text-gray-900">{getCategoryName()}</Link> /{' '}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedImage ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImage ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  In Stock
                </Badge>
                <Badge variant="outline">Free Shipping</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

              {/* Rating (hardcoded for now) */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.0 ({sampleReviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                    <Badge variant="destructive" className="bg-red-500">
                      {discountPercent}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Color Selection - Hardcoded for now */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {variants.colors.map((color) => (
                  <button
                    key={color.value}
                    disabled={!color.available}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                      selectedColor === color.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : color.available
                          ? "border-gray-200 hover:border-gray-300 text-gray-700"
                          : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                    }`}
                    onClick={() => color.available && setSelectedColor(color.value)}
                  >
                    {color.name}
                    {!color.available && <span className="ml-1">(Out of Stock)</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection - Hardcoded for now */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex gap-3">
                {variants.sizes.map((size) => (
                  <button
                    key={size.value}
                    disabled={!size.available}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                      selectedSize === size.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedSize(size.value)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">10 items available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button className="flex-1 h-12 text-base font-semibold">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="outline" className="w-full h-12 text-base font-semibold">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">Easy returns</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">2-Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-0">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent h-auto">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  Reviews ({sampleReviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This exquisite piece represents the pinnacle of craftsmanship and design. Handcrafted by skilled
                    artisans using only the finest materials, it combines timeless elegance with modern appeal.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Whether for everyday wear or special occasions, this piece is versatile and adds a touch of luxury to any outfit.
                    The careful attention to detail ensures this will be a cherished addition to your collection for years to come.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center gap-8 pb-6 border-b">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">4.0</div>
                      <div className="flex items-center justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Based on {sampleReviews.length} reviews
                      </div>
                    </div>
                    <Button>Write a Review</Button>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {sampleReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.name}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  <Check className="w-3 h-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 