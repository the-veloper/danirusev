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

  // Fetch profile using the new RPC call to the correct schema
  const { data: profile, error } = await supabase
    .rpc("get_profile_by_id", { user_id: user.id })
    .single()

  if (error) {
    console.error("Error fetching profile:", error.message)
    // You might want to show an error message to the user
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Твоят профил</h1>
      <AccountForm user={user} profile={profile} />
    </div>
  )
}
