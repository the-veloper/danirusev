import { Product, Category } from '@/types/payload-types'
import { getMediaUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'
import ProductDetailContent from './product-detail-content'

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?where[slug][equals]=${slug}&depth=2`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    
    if (!res.ok) {
      console.error('Failed to fetch product:', await res.text())
      return null
    }
    
    const data = await res.json()
    if (!data.docs || data.docs.length === 0) {
      return null
    }
    
    return data.docs[0]
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getRelatedProducts(categoryId: string, productId: string): Promise<Product[]> {
  try {
    // Fetch products from the same category, excluding the current product
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?where[category][equals]=${categoryId}&where[id][not_equals]=${productId}&limit=4&depth=1`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    
    if (!res.ok) {
      console.error('Failed to fetch related products:', await res.text())
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    notFound()
  }
  
  // Fetch related products from the same category
  const relatedProducts = await getRelatedProducts(
    typeof product.category === 'object' ? product.category.id : product.category,
    product.id
  )
  
  // Process product images
  const productImages = product.images?.map((img) => {
    return {
      url: getMediaUrl(img.image.url),
      alt: img.image.alt
    }
  }) || []
  
  return <ProductDetailContent product={product} relatedProducts={relatedProducts} productImages={productImages} />
} 