'use client'

import { useCartStore } from '@/lib/stores/cart-store'
import { CheckCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface StripeSession {
  customer_details?: {
    name?: string
  }
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCartStore()

  const [session, setSession] = useState<StripeSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionId) {
      // Clear the cart as soon as we land on this page with a session ID
      clearCart()

      const fetchSession = async () => {
        try {
          // We need a server action or API route to fetch the session securely
          // For now, let's assume we have an API route for this.
          // This is NOT ideal for production, as it exposes session retrieval logic to the client.
          // A server component fetching data and passing it to a client component is better.
          // But for the purpose of clearing the cart, this will work.
          // A proper implementation would use a server component to fetch and pass data down.
          // This is a temporary solution to get the customer name.
          const res = await fetch(`/api/checkout/session?session_id=${sessionId}`)
          if (!res.ok) throw new Error('Session not found')
          const data = await res.json()
          setSession(data)
        } catch (err) {
          setError(true)
        } finally {
          setLoading(false)
        }
      }
      fetchSession()
    } else {
      setError(true)
      setLoading(false)
    }
  }, [sessionId, clearCart])

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl text-center">
        <Card>
          <CardHeader className="flex flex-col items-center space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-10 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-5 w-full" />
            <div className="pt-4 flex justify-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl text-center">
        <Card>
          <CardHeader>
            <CardTitle>Грешка</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Невалидна сесия или възникна грешка.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/">Начало</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const customerName = session?.customer_details?.name

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl text-center">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <CardTitle className="text-4xl text-main font-gagalin">
            Плащането е успешно!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            Благодарим Ви, {customerName || 'клиент'}! Вашата поръчка се обработва.
          </p>
          <p className="text-muted-foreground">
            Ще получите имейл за потвърждение съвсем скоро. Можете да проверите
            статуса на поръчката си във Вашия акаунт.
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <Button asChild variant="main" className="bg-main text-alt">
              <Link href="/orders">Вижте поръчките си</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Продължете с пазаруването</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
