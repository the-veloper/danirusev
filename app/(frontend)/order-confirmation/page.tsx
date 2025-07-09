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
          <CardTitle className="text-4xl text-main font-gagalin ">
            Благодарим за Вашата поръчка!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Вашата поръчка е изпратена успешно.</p>
          {orderId && (
            <p className="text-lg">
              № на поръчката е: <span className="font-bold">{orderId}</span>
            </p>
          )}
          <p className="text-muted-foreground">
            Скоро ще получите имейл с информация за поръчката.
          </p>
          <div className="pt-4">
            <Button asChild variant='main' className='bg-main text-alt'>
              <Link href="/orders">Разгледайте Вашата поръчка</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}