"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = `#${searchParams.get("orderId")}`

  return (
    <div className="container mx-auto py-12 flex items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl">Thank You for Your Order!</CardTitle>
          <CardDescription>
            Your order has been placed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order number is <span className="font-bold text-foreground">#{orderId}</span>.
            We will notify you once it has been shipped.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account">View My Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
