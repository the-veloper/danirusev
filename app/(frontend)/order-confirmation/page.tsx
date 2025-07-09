'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl text-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-green-600">
            Thank You For Your Order!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your order has been placed successfully.</p>
          {orderId && (
            <p className="text-lg">
              Your Order ID is: <span className="font-bold">{orderId}</span>
            </p>
          )}
          <p className="text-muted-foreground">
            You will receive an email confirmation shortly.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link href="/account">View Your Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}