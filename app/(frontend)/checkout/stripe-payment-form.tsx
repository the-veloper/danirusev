'use client'

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/stores/cart-store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface StripePaymentFormProps {
  orderId: number
}

export function StripePaymentForm({ orderId }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCartStore()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setErrorMessage("Stripe has not loaded yet. Please wait a moment and try again.")
      setIsLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-confirmation?order_id=${orderId}`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } else {
      setErrorMessage('An unexpected error occurred.')
    }
    
    // This part runs only if the payment fails to redirect
    toast.error(errorMessage)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Завършете плащането си</h2>
      <PaymentElement />
      <Button disabled={isLoading || !stripe || !elements} className="w-full mt-6 bg-main hover:bg-main/80 text-alt">
        {isLoading ? 'Обработване...' : 'Плати сега'}
      </Button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  )
}