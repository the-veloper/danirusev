import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';

async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log('Payment succeeded:', paymentIntent.id);
  // TODO: Update order status in your database
  // TODO: Send confirmation email to customer
}

async function handlePaymentIntentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  console.log('Payment failed:', paymentIntent.id);
  // TODO: Update order status in your database
  // TODO: Send failure notification to customer
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  console.log('Received webhook with signature:', signature?.slice(0, 10) + '...');

  if (!signature) {
    console.log('No stripe signature found in request');
    return NextResponse.json(
      { message: 'No stripe signature found' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('Webhook event constructed successfully:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { message: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 