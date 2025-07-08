import { createClient } from "@/utils/supabase/server"
import { CheckoutForm } from "./checkout-form"
import { Profile } from "@/types/supabase"

export default async function CheckoutPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
    profile = data
  }

  return (
    <div className="container mx-auto py-12">
      <CheckoutForm user={user} profile={profile} />
    </div>
  )
}
