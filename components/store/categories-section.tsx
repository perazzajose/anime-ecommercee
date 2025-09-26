"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import type { Category } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name")

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Categorías</h2>
            <p className="text-muted-foreground">Cargando categorías...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-balance">Explora por Categorías</h2>
          <p className="text-muted-foreground text-pretty">Encuentra exactamente lo que buscas</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                    <Image
                      src={category.image_url || "/placeholder.svg?height=120&width=120"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
