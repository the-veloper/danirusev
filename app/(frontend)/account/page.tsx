import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { AccountForm } from "./account-form"
import { Profile } from "@/types/supabase"

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Fetch profile from the 'ecommerce' schema.
  // We explicitly select from `profiles` in the `ecommerce` schema.
  // Fetch profile using the RPC call, providing types for both the
  // function name (as a literal type) and the expected return data.
  const { data: profile, error } = await supabase
    .rpc('get_user_profile', {})
    .returns<Profile>()
    .single()

  if (error) {
    console.error('Error fetching profile:', error.message)
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
        Вашият Профил
      </h1>
      <AccountForm user={user} profile={profile} />
    </div>
  )
}
