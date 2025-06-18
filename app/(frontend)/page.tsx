import { ProductGrid } from '@/components/products/product-grid'
import { CategoryGrid } from '@/components/categories/category-grid'
import { CollectionGrid } from '@/components/collections/collection-grid'
import { Product, Category, Collection } from '@/types/payload-types'

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?where[status][equals]=published`)
  const data = await res.json()
  return data.docs
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`)
  const data = await res.json()
  return data.docs
}

async function getCollections(): Promise<Collection[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/collections`)
  const data = await res.json()
  return data.docs
}

export default async function Home() {
  const [products, categories, collections] = await Promise.all([
    getProducts(),
    getCategories(),
    getCollections(),
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Categories</h2>
        <CategoryGrid categories={categories} />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Collections</h2>
        <CollectionGrid collections={collections} />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Latest Products</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  )
}
