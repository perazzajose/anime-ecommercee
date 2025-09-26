import { createBrowserClient, createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Cliente para el navegador
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Cliente para el servidor
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Tipos para TypeScript
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock_quantity: number
  category_id: string | null
  image_url: string | null
  images: string[]
  anime_series: string | null
  character_name: string | null
  manufacturer: string | null
  release_date: string | null
  dimensions: string | null
  weight: string | null
  material: string | null
  scale: string | null
  is_featured: boolean
  is_active: boolean
  tags: string[]
  created_at: string
  updated_at: string
  category?: Category
}

export interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}
