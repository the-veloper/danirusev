'use client'

import { useCartStore } from '@/lib/stores/cart-store'
import { Profile } from '@/types/supabase'
import { useActionState, useEffect, useMemo } from 'react'
import { useFormStatus } from 'react-dom'
import { createOrder, CheckoutFormState } from './actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface CheckoutFormProps {
  profile: Profile | null
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-main hover:bg-main/80 text-alt"
    >
      {pending ? 'Processing...' : 'Confirm and Place Order'}
    </Button>
  )
}

export function CheckoutForm({ profile }: CheckoutFormProps) {
  const router = useRouter()
  const { items, clearCart } = useCartStore()

  const initialState: CheckoutFormState = {
    success: false,
    message: null,
    fieldErrors: null,
    orderId: null,
  }
  const [state, formAction] = useActionState(createOrder, initialState)

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + parseFloat(item.price as any) * item.quantity,
      0,
    )
  }, [items])

  useEffect(() => {
    if (state.success && state.orderId) {
      toast.success(state.message || 'Order placed successfully!')
      clearCart()
      router.push(`/order-confirmation?order_id=${state.orderId}`)
    } else if (!state.success && state.message) {
      toast.error(state.message)
    }
  }, [state, clearCart, router])

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p>Your cart is empty.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(parseFloat(item.price as any) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Shipping Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hidden fields to pass cart data to the server action */}
              <input
                type="hidden"
                name="cartItems"
                value={JSON.stringify(
                  items.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                  })),
                )}
              />
              <input type="hidden" name="totalPrice" value={subtotal} />

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile?.full_name ?? ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={profile?.phone_number ?? ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={profile?.address ?? ''}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={profile?.city ?? ''}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    defaultValue={profile?.postal_code ?? ''}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={profile?.country ?? ''}
                  required
                />
              </div>
              <div className="pt-4">
                <SubmitButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}