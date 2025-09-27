"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Category } from "@/lib/supabase"

interface CategoryFormProps {
  category?: Category | null
  onSuccess: (category: Category) => void
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  })

  const supabase = createBrowserClient()

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        image_url: category.image_url || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        image_url: "",
      })
    }
  }, [category])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (category) {
        // Update existing category
        const { data, error } = await supabase
          .from("categories")
          .update({
            name: formData.name,
            description: formData.description || null,
            image_url: formData.image_url || null,
          })
          .eq("id", category.id)
          .select()
          .single()

        if (error) throw error
        onSuccess(data)
      } else {
        // Create new category
        const { data, error } = await supabase
          .from("categories")
          .insert({
            name: formData.name,
            description: formData.description || null,
            image_url: formData.image_url || null,
          })
          .select()
          .single()

        if (error) throw error
        onSuccess(data)
      }
    } catch (error) {
      console.error("Error saving category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="image_url">URL de Imagen</Label>
        <Input
          id="image_url"
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Guardando..." : category ? "Actualizar Categoría" : "Crear Categoría"}
      </Button>
    </form>
  )
}
