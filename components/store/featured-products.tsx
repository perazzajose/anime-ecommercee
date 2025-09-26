"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import type { Product } from "@/lib/supabase"
import { ProductCard } from "@/components/store/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  async function fetchFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(name)
        `)
        .eq("is_featured", true)
        .eq("is_active", true)
        .limit(8)
        .order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching featured products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-balance">Productos Destacados</h2>
          <p className="text-muted-foreground text-pretty">Descubre nuestras figuras y productos más populares</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
