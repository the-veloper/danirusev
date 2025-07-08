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

  // Fetch the user's profile from the new 'profiles' table
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Твоят профил</h1>
      <AccountForm user={user} profile={profile} />
    </div>
  )
}
