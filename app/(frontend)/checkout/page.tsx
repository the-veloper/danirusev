import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CheckoutForm } from './checkout-form'

export default async function CheckoutPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // Redirect to sign-in page, but add a redirect URL to come back here
    const redirectTo = '/checkout'
    redirect(`/sign-in?redirect_to=${encodeURIComponent(redirectTo)}`)
  }

  // Fetch the user's profile to pre-fill the form
  // We use the function created in the previous task
  const { data: profile, error } = await supabase
    .rpc('get_profile_by_id', { user_id: user.id })
    .single()

  if (error) {
    console.error('Error fetching profile for checkout:', error.message)
    // We can still proceed, the form will just be empty
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <CheckoutForm profile={profile} />
    </div>
  )
}