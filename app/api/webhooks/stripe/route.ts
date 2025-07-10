import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Stripe } from 'stripe'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/utils/supabase/server'

/**
 * This is the handler for the Stripe webhook. It listens for the
 * `checkout.session.completed` event, which is sent when a user
 * successfully completes a payment.
 *
 * When this event is received, we create an order in our database.
 */
async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session
  const { userId, shippingAddress, cartItems } = session.metadata!

  // Validate that we have the metadata we need
  if (!userId || !shippingAddress || !cartItems) {
    console.error('🚫 Missing metadata in checkout session:', session.id)
    // We can't create an order without this info, so we return early.
    // We return a 200 status to Stripe so it doesn't retry the webhook.
    return
  }

  const supabase = await createClient()

  // Check if we've already processed this event
  const { data: existingOrder, error: checkError } = await supabase
    .from('orders')
    .select('id')
    .eq('stripe_session_id', session.id)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    // An actual error occurred, not just "no rows found"
    console.error('Error checking for existing order:', checkError)
    throw new Error(`Database error: ${checkError.message}`)
  }

  if (existingOrder) {
    console.log(`✅ Webhook for session ${session.id} already processed.`)
    return
  }

  // Parse the metadata
  const shippingAddressSnapshot = JSON.parse(shippingAddress)
  const orderItemsForDb = JSON.parse(cartItems)
  const totalPrice = session.amount_total! / 100 // Convert from cents

  // Create the order in the database using the RPC function
  const { error: createOrderError } = await supabase.rpc(
    'create_order_with_items',
    {
      p_user_id: userId,
      p_total_price: totalPrice,
      p_shipping_address_snapshot: shippingAddressSnapshot,
      p_order_items: orderItemsForDb,
      p_stripe_session_id: session.id, // Pass the session ID
    },
  )

  if (createOrderError) {
    console.error('Error creating order from webhook:', createOrderError)
    throw new Error(`Database error: ${createOrderError.message}`)
  }

  console.log(`✅ Order created for session: ${session.id}`)

  // TODO: Here you could also trigger other post-payment actions,
  // such as sending a confirmation email to the user.
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

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
        await handleCheckoutSessionCompleted(event)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    return NextResponse.json({ received: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook handler failed: ${errorMessage}`)
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 },
    )
  }
}
 