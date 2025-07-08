"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { updateShippingInfo, FormState } from "./actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { User } from "@supabase/supabase-js"
import { Profile } from "@/types/supabase"

interface AccountFormProps {
  user: User
  profile: Profile | null
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  )
}

export function AccountForm({ user, profile }: AccountFormProps) {
  const initialState: FormState = { success: false, message: null, fieldErrors: null }
  const [state, formAction] = useActionState(updateShippingInfo, initialState)

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message)
    } else if (!state.success && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* User Info Column */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-1">
              <Label>Joined</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipping Info Column */}
      <div className="lg:col-span-2">
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Update your delivery address.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile?.full_name || ''}
                />
                {state.fieldErrors?.fullName && (
                  <p className="text-xs text-red-500">{state.fieldErrors.fullName}</p>
                )}
              </div>
               <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={profile?.phone_number || ''}
                />
                {state.fieldErrors?.phoneNumber && (
                  <p className="text-xs text-red-500">{state.fieldErrors.phoneNumber}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={profile?.address || ''}
                />
                {state.fieldErrors?.address && (
                  <p className="text-xs text-red-500">{state.fieldErrors.address}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={profile?.city || ''}
                />
                {state.fieldErrors?.city && (
                  <p className="text-xs text-red-500">{state.fieldErrors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  defaultValue={profile?.postal_code || ''}
                />
                {state.fieldErrors?.postalCode && (
                  <p className="text-xs text-red-500">{state.fieldErrors.postalCode}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={profile?.country || ''}
                />
                {state.fieldErrors?.country && (
                  <p className="text-xs text-red-500">{state.fieldErrors.country}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
