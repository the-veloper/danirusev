import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Stripe } from 'stripe'
import { stripe } from '@/lib/stripe'

// GET handler for simple connectivity testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Stripe webhook endpoint is live.',
  })
}

async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  console.log('✅ PaymentIntent succeeded:', paymentIntent.id)
  // TODO: Update order status in your database
  // TODO: Send confirmation email to customer
}

async function handlePaymentIntentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  console.log('❌ PaymentIntent failed:', paymentIntent.id)
  // TODO: Update order status in your database
  // TODO: Send failure notification to customer
}

export async function POST(req: Request) {
  console.log('--- Stripe Webhook POST Request Received ---')
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  console.log('Received webhook with signature:', signature?.slice(0, 10) + '...')

  if (!signature) {
    console.error('🚫 No stripe-signature found in request headers.')
    return NextResponse.json(
      { message: 'Missing stripe-signature header' },
      { status: 400 },
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
    console.log('✅ Webhook event constructed successfully:', event.type)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Webhook signature verification failed: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 },
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook handler for event ${event.type} failed: ${errorMessage}`)
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 },
    )
  }
} 