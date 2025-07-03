// import { ProductGrid } from '@/components/products/product-grid'
// import { CategoryGrid } from '@/components/categories/category-grid'
// import { CollectionGrid } from '@/components/collections/collection-grid'
// import { Product, Category, Collection } from '@/types/payload-types'
// import { getMediaUrl } from '@/lib/utils'
import Hero from '@/components/hero/hero'
import DriftExperienceCards from '@/components/experiences/drift-experience-cards'

// async function getProducts(): Promise<Product[]> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?where[status][equals]=published&depth=1`,
//       { next: { revalidate: 3600 } } // Cache for 1 hour
//     )
    
//     if (!res.ok) {
//       console.error('Failed to fetch products:', await res.text())
//       return []
//     }
    
//     const data = await res.json()
//     return data.docs || []
//   } catch (error) {
//     console.error('Error fetching products:', error)
//     return []
//   }
// }

// async function getCategories(): Promise<Category[]> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`,
//       { next: { revalidate: 3600 } } // Cache for 1 hour
//     )
    
//     if (!res.ok) {
//       console.error('Failed to fetch categories:', await res.text())
//       return []
//     }
    
//     const data = await res.json()
//     const categories = data.docs || []
    
//     // Fetch product counts for each category
//     const productsRes = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?depth=1&limit=500`,
//       { next: { revalidate: 3600 } } // Cache for 1 hour
//     )
    
//     if (!productsRes.ok) {
//       console.error('Failed to fetch products for count:', await productsRes.text())
//       return categories
//     }
    
//     const productsData = await productsRes.json()
//     const products = productsData.docs || []
    
//     // Calculate product counts per category
//     const categoryCounts: Record<string, number> = {}
//     products.forEach((product: any) => {
//       // Check if category exists and is either a reference ID or an object
//       if (product.category) {
//         const categoryId = typeof product.category === 'string' 
//           ? product.category 
//           : product.category.id
        
//         categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1
//       }
//     })
    
//     // Add productCount to each category
//     return categories.map((category: Category) => ({
//       ...category,
//       productCount: categoryCounts[category.id] || 0
//     }))
//   } catch (error) {
//     console.error('Error fetching categories:', error)
//     return []
//   }
// }

// async function getCollections(): Promise<Collection[]> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/collections`,
//       { next: { revalidate: 3600 } } // Cache for 1 hour
//     )
    
//     if (!res.ok) {
//       console.error('Failed to fetch collections:', await res.text())
//       return []
//     }
    
//     const data = await res.json()
//     const collections = data.docs || []
    
//     // Fetch products with full depth to get collections and images
//     const productsRes = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?depth=1&limit=500`,
//       { next: { revalidate: 3600 } } // Cache for 1 hour
//     )
    
//     if (!productsRes.ok) {
//       console.error('Failed to fetch products for collections:', await productsRes.text())
//       return collections
//     }
    
//     const productsData = await productsRes.json()
//     const products = productsData.docs || []
    
//     // Map to keep track of products per collection and their images
//     const collectionProducts: Record<string, any[]> = {}
    
//     // Process products to map them to collections
//     products.forEach((product: any) => {
//       if (product.collections && Array.isArray(product.collections)) {
//         product.collections.forEach((collection: any) => {
//           // Handle both populated objects and simple IDs
//           const collectionId = typeof collection === 'string' ? collection : collection.id
          
//           if (!collectionProducts[collectionId]) {
//             collectionProducts[collectionId] = []
//           }
          
//           // Add this product to the collection
//           collectionProducts[collectionId].push(product)
//         })
//       }
//     })
    
//     // Add productCount and productImages to each collection
//     return collections.map((collection: Collection) => {
//       const collectionProductsList = collectionProducts[collection.id] || []
      
//       // Extract images from the products
//       const productImages = collectionProductsList
//         .filter(product => product.images && product.images.length > 0)
//         .map(product => {
//           const primaryImage = product.images.find((img: any) => img.isPrimary)?.image || 
//                              (product.images.length > 0 ? product.images[0].image : null)
          
//           return primaryImage ? getMediaUrl(primaryImage.url) : '/placeholder.svg'
//         })
//         .slice(0, 4) // Limit to 4 images
      
//       // Pad with placeholders if needed
//       while (productImages.length < 4) {
//         productImages.push('/placeholder.svg')
//       }
      
//       return {
//         ...collection,
//         productCount: collectionProductsList.length,
//         productImages
//       }
//     })
//   } catch (error) {
//     console.error('Error fetching collections:', error)
//     return []
//   }
// }

export default async function Home() {
  // const [products, categories, collections] = await Promise.all([
  //   getProducts(),
  //   getCategories(),
  //   getCollections(),
  // ])

  return (
    <main className="min-h-screen">
      <Hero  />
      <DriftExperienceCards />
      {/* Categories Section */}
      {/* <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <CategoryGrid 
            categories={categories} 
            title="Browse by Category" 
            description="Explore our carefully curated categories of fine jewelry" 
          />
        </div>
      </section>

      {/* Featured Collections */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <CollectionGrid 
            collections={collections} 
            title="Featured Collections" 
            description="Discover our exclusive curated collections for every occasion"
          />
        </div>
      </section> */}

      {/* Latest Products */}
      {/* <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ProductGrid 
            products={products} 
            title="Latest Additions" 
            description="Our newest arrivals - be the first to discover these exquisite pieces" 
            showLoadMore={true}
          />
        </div>
      </section> */}
    </main>
  )
}
