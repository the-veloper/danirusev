import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">Product Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The product you are looking for might have been removed or doesn't exist.
      </p>
      <Link 
        href="/products" 
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        Browse All Products
      </Link>
    </div>
  )
} 