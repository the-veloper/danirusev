import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type { Stripe } from 'stripe'

// This client can be used to call the RPC function in the public schema.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  console.log('✅ Received checkout.session.completed event.')
  const session = event.data.object as Stripe.Checkout.Session

  const { userId, shippingAddress, cartItems } = session.metadata || {}
  if (!userId || !shippingAddress || !cartItems) {
    throw new Error(`🚫 Missing metadata in checkout session: ${session.id}`)
  }

  console.log(`[INFO] Metadata validated for session: ${session.id}`)

  const { error } = await supabase.rpc('create_order_from_webhook', {
    p_user_id: userId,
    p_total_price: session.amount_total! / 100,
    p_shipping_address_snapshot: JSON.parse(shippingAddress),
    p_cart_items: JSON.parse(cartItems),
  })

  if (error) {
    console.error('❌ Error calling create_order_from_webhook:', error)
    throw new Error(`Database RPC error: ${error.message}`)
  }

  console.log(`✅✅✅ Order successfully processed for session: ${session.id}`)
}

export async function POST(req: Request) {
  // FIX: Await the headers() call to get the actual Headers object.
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Webhook signature verification failed: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        // This is where you handle the successful payment.
        await handleCheckoutSessionCompleted(event)
        break
      // You can add more event types here if needed
      // case 'payment_intent.succeeded':
      //   ...
      //   break
      default:
        // console.log(`Unhandled event type: ${event.type}`)
        break
    }
    // Acknowledge receipt of the event
    return NextResponse.json({ received: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook handler failed for event ${event.type}: ${errorMessage}`)
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 },
    )
  }
}