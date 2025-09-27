"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Category } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProductFormProps {
  productId?: string
}

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
    image_url: "",
    anime_series: "",
    character_name: "",
    manufacturer: "",
    scale: "",
    material: "",
    dimensions: "",
    weight: "",
    is_featured: false,
    is_active: true,
  })

  useEffect(() => {
    fetchCategories()
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name")

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  async function fetchProduct() {
    if (!productId) return

    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

      if (error) throw error

      setFormData({
        name: data.name || "",
        description: data.description || "",
        price: data.price?.toString() || "",
        stock_quantity: data.stock_quantity?.toString() || "",
        category_id: data.category_id || "",
        image_url: data.image_url || "",
        anime_series: data.anime_series || "",
        character_name: data.character_name || "",
        manufacturer: data.manufacturer || "",
        scale: data.scale || "",
        material: data.material || "",
        dimensions: data.dimensions || "",
        weight: data.weight || "",
        is_featured: data.is_featured || false,
        is_active: data.is_active || true,
      })
    } catch (error) {
      console.error("Error fetching product:", error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description || null,
        price: Number.parseFloat(formData.price),
        stock_quantity: Number.parseInt(formData.stock_quantity),
        category_id: formData.category_id || null,
        image_url: formData.image_url || null,
        anime_series: formData.anime_series || null,
        character_name: formData.character_name || null,
        manufacturer: formData.manufacturer || null,
        scale: formData.scale || null,
        material: formData.material || null,
        dimensions: formData.dimensions || null,
        weight: formData.weight || null,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      }

      let error
      if (productId) {
        ;({ error } = await supabase.from("products").update(productData).eq("id", productId))
      } else {
        ;({ error } = await supabase.from("products").insert([productData]))
      }

      if (error) throw error

      router.push("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Producto *</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalles del Anime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="anime_series">Serie de Anime</Label>
              <Input
                id="anime_series"
                value={formData.anime_series}
                onChange={(e) => setFormData({ ...formData, anime_series: e.target.value })}
                placeholder="Demon Slayer, Naruto, etc."
              />
            </div>

            <div>
              <Label htmlFor="character_name">Nombre del Personaje</Label>
              <Input
                id="character_name"
                value={formData.character_name}
                onChange={(e) => setFormData({ ...formData, character_name: e.target.value })}
                placeholder="Nezuko Kamado, Naruto Uzumaki, etc."
              />
            </div>

            <div>
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                placeholder="Good Smile Company, Bandai, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scale">Escala</Label>
                <Input
                  id="scale"
                  value={formData.scale}
                  onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                  placeholder="1/8, 1/7, Nendoroid"
                />
              </div>
              <div>
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="PVC, ABS, Vinilo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dimensions">Dimensiones</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="20cm x 15cm x 10cm"
                />
              </div>
              <div>
                <Label htmlFor="weight">Peso</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="500g"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured">Producto Destacado</Label>
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Producto Activo</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Guardando..." : productId ? "Actualizar" : "Crear"} Producto
        </Button>
      </div>
    </form>
  )
}
