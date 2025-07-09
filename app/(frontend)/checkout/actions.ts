'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// More robust Zod schema for a cart item, coercing string numbers to actual numbers
const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.coerce.number(), // Automatically converts string to number
  quantity: z.coerce.number(),
})

// Schema for the entire checkout payload, handling data as it comes from FormData
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  phoneNumber: z.string().min(5, 'Phone number must be at least 5 characters'),
  totalPrice: z.coerce.number().positive('Total price must be positive'),
  // cartItems is a JSON string that we need to parse and then validate
  cartItems: z.string().transform((val, ctx) => {
    try {
      const parsed = JSON.parse(val)
      return z.array(cartItemSchema).parse(parsed)
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid cart items format.',
      })
      return z.NEVER
    }
  }),
})

export interface CheckoutFormState {
  success: boolean
  message: string | null
  fieldErrors?: Record<string, string[] | null> | null
  orderId?: bigint | null
}

export async function createOrder(
  prevState: CheckoutFormState,
  formData: FormData,
): Promise<CheckoutFormState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'User not authenticated.' }
  }

  const rawData = Object.fromEntries(formData.entries())
  const validation = checkoutFormSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check the fields.',
      fieldErrors: validation.error.flatten().fieldErrors,
    }
  }

  const { data: validatedData } = validation

  // This is the snapshot we'll save to the order
  const shippingAddressSnapshot = {
    fullName: validatedData.fullName,
    address: validatedData.address,
    city: validatedData.city,
    postalCode: validatedData.postalCode,
    country: validatedData.country,
    phoneNumber: validatedData.phoneNumber,
    email: user.email, // Add user email to the snapshot
  }

  // This is the array of items for the database function
  const orderItemsForDb = validatedData.cartItems.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
    title: item.title,
  }))

  // Call the transactional database function
  const { data: newOrderId, error } = await supabase.rpc(
    'create_order_with_items',
    {
      p_user_id: user.id,
      p_total_price: validatedData.totalPrice,
      p_shipping_address_snapshot: shippingAddressSnapshot,
      p_order_items: orderItemsForDb,
    },
  )

  if (error) {
    console.error('Error creating order:', error)
    return { success: false, message: `Database Error: ${error.message}` }
  }

  revalidatePath('/account') // User might have an "orders" tab in their account

  return {
    success: true,
    message: 'Order created successfully!',
    orderId: newOrderId,
  }
}
