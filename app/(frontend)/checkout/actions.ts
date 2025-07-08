"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { CartItem } from "@/lib/stores/cart-store"

export interface CheckoutFormState {
  success: boolean
  message: string | null
  fieldErrors?: Record<string, string[] | undefined>
}

const shippingSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phoneNumber: z.string().min(5, "Phone number must be at least 5 characters"),
})

export async function processCheckout(
  prevState: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  const supabase = await createClient()
  const cookieStore = cookies()

  const { data: { user } } = await supabase.auth.getUser()

  const rawData = Object.fromEntries(formData.entries())
  const parsed = shippingSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your entries.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const cartItemsJSON = cookieStore.get('cart-storage')?.value
  if (!cartItemsJSON) {
    return { success: false, message: "Your cart is empty." }
  }

  const { state: { items: cartItems } } = JSON.parse(cartItemsJSON) as { state: { items: CartItem[] } }
  if (cartItems.length === 0) {
    return { success: false, message: "Your cart is empty." }
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      total_price: totalPrice,
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone_number: parsed.data.phoneNumber,
      address: parsed.data.address,
      city: parsed.data.city,
      postal_code: parsed.data.postalCode,
      country: parsed.data.country,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error("Error creating order:", orderError)
    return { success: false, message: `Database Error: Could not create order. ${orderError?.message}` }
  }

  // 2. Create the order items
  const orderItemsData = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: parseFloat(item.price),
    title: item.title,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItemsData)

  if (itemsError) {
    console.error("Error creating order items:", itemsError)
    // Attempt to delete the orphaned order
    await supabase.from("orders").delete().eq("id", order.id)
    return { success: false, message: `Database Error: Could not save order items. ${itemsError.message}` }
  }

  // 3. Clear the cart (by clearing the cookie)
  cookieStore.set('cart-storage', '', { maxAge: 0 })

  // 4. Revalidate paths and redirect
  revalidatePath("/")
  redirect(`/order-confirmation?orderId=${order.id}`)
}
