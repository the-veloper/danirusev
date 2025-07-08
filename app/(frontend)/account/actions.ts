"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define a type for our form state to fix the TypeScript error
export interface FormState {
  success: boolean
  message: string | null
  fieldErrors?: {
    fullName?: string[]
    address?: string[]
    city?: string[]
    postalCode?: string[]
    country?: string[]
    phoneNumber?: string[]
  } | null
}

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phoneNumber: z.string().min(5, "Phone number must be at least 5 characters"),
})

export async function updateShippingInfo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "User not authenticated" }
  }

  const rawData = Object.fromEntries(formData.entries())
  const parsed = shippingSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your entries.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: parsed.data.fullName,
    address: parsed.data.address,
    city: parsed.data.city,
    postal_code: parsed.data.postalCode,
    country: parsed.data.country,
    phone_number: parsed.data.phoneNumber,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error updating profile:", error)
    return { success: false, message: `Database Error: ${error.message}` }
  }

  revalidatePath("/account")
  return { success: true, message: "Shipping information updated successfully!" }
}