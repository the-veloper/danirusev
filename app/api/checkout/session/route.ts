import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing session_id' },
      { status: 400 },
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error retrieving Stripe session:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 },
    )
  }
}
