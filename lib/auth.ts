import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  return user
}

export async function requireAdminAuth() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", user.email)
    .eq("is_active", true)
    .single()

  if (error || !adminUser) {
    redirect("/admin/login")
  }

  return { user, adminUser }
}
