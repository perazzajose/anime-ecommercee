"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AdminSetupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Creating admin user:", email)

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
        },
      })

      if (authError) {
        console.log("[v0] Auth error:", authError)
        throw authError
      }

      console.log("[v0] Auth user created:", authData.user?.id)

      if (authData.user) {
        const { error: adminError } = await supabase.from("admin_users").insert({
          id: authData.user.id,
          email: email,
          name: name,
          role: "admin",
          created_at: new Date().toISOString(),
        })

        if (adminError) {
          console.log("[v0] Admin record error:", adminError)
          throw adminError
        }

        console.log("[v0] Admin record created successfully")
        setSuccess(true)

        setTimeout(() => {
          router.push("/admin/login")
        }, 2000)
      }
    } catch (err: any) {
      console.log("[v0] Setup error:", err)
      setError(err.message || "Error al crear la cuenta de administrador")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="text-green-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Cuenta creada exitosamente!</h3>
        <p className="text-gray-600 mb-4">Revisa tu email para confirmar tu cuenta, luego podrás hacer login.</p>
        <p className="text-sm text-gray-500">Redirigiendo al login...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div>
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@tudominio.com"
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
          placeholder="Mínimo 6 caracteres"
          minLength={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creando cuenta..." : "Crear cuenta de administrador"}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Esta página solo debe usarse para crear el primer administrador
      </p>
    </form>
  )
}
