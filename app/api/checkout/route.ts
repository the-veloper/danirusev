import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/checkout';
import { z } from 'zod';

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      price: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  metadata: z.record(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = checkoutSchema.parse(body);

    const session = await createCheckoutSession(validatedData);

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid request data', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Checkout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 