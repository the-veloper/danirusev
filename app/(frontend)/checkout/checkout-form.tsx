"use client"

import { useActionState } from "react"
import { processCheckout, CheckoutFormState } from "./actions"
import { useCartStore } from "@/lib/stores/cart-store"
import { User } from "@supabase/supabase-js"
import { Profile } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "sonner"
import * as LucideIcons from 'lucide-react';

interface CheckoutFormProps {
  user: User | null
  profile: Profile | null
}

const gradients = [
  'from-yellow-400 via-amber-500 to-orange-600',
  'from-cyan-400 via-rent to-indigo-600',
  'from-lime-400 via-mix to-emerald-600',
];
const experienceGradients: { [key: string]: string } = {
  '1': gradients[0], '2': gradients[1], '3': gradients[2],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Processing Order..." : "Place Order"}
    </Button>
  )
}

export function CheckoutForm({ user, profile }: CheckoutFormProps) {
  const { items: cartItems, clearCart } = useCartStore()
  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)

  const initialState: CheckoutFormState = { success: false, message: null }
  const [state, formAction] = useActionState(processCheckout, initialState)

  useEffect(() => {
    if (state.success) {
      // The redirect will happen on the server, but we clear the client-side store just in case
      clearCart()
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state, clearCart])

  const getLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-8 w-8 text-white" /> : null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Right Side - Shipping Form */}
      <div className="lg:order-last">
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        {!user && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            Have an account? <Link href="/sign-in" className="font-bold underline">Log in</Link> for a faster checkout.
          </div>
        )}
        <form action={formAction}>
          <Card>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ... form fields ... */}
              <div className="md:col-span-2 pt-4">
                <SubmitButton />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Left Side - Order Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <Card>
          <CardContent className="pt-6">
            {cartItems.length > 0 ? (
              <>
                <ScrollArea className="h-[40vh]">
                  <div className="flex flex-col gap-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`relative aspect-square h-16 w-16 overflow-hidden rounded-md flex items-center justify-center bg-gradient-to-br ${experienceGradients[item.id] || gradients[0]}`}>
                            {getLucideIcon(item.icon)}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">{(parseFloat(item.price) * item.quantity).toFixed(2)} лв</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} лв</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{subtotal.toFixed(2)} лв</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p>Your cart is empty.</p>
                <Button variant="outline" asChild className="mt-4">
                  <Link href="/experiences">Browse Experiences</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
