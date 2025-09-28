"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AdminRegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Attempting to register admin:", email)

      // 1. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
        },
      })

      if (authError) {
        console.log("[v0] Auth registration error:", authError)
        throw authError
      }

      console.log("[v0] Auth user created:", authData.user?.id)

      // 2. Add user to admin_users table
      if (authData.user) {
        const { error: adminError } = await supabase.from("admin_users").insert({
          id: authData.user.id,
          email: authData.user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (adminError) {
          console.log("[v0] Admin table error:", adminError)
          throw adminError
        }

        console.log("[v0] Admin user created successfully")
        alert("Administrador registrado exitosamente. Revisa tu email para confirmar la cuenta.")
        router.push("/admin/login")
      }
    } catch (error: any) {
      console.log("[v0] Registration error:", error)
      setError(error.message || "Error al registrar administrador")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">{error}</div>}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Registrando..." : "Registrar Administrador"}
      </Button>

      <div className="text-center">
        <a href="/admin/login" className="text-blue-600 hover:text-blue-500">
          ¿Ya tienes cuenta? Inicia sesión
        </a>
      </div>
    </form>
  )
}
