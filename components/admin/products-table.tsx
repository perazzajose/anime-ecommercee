"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/supabase"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(name)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error

      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Productos ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Serie</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 relative">
                      <Image
                        src={product.image_url || "/placeholder.svg?height=48&width=48"}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.character_name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.anime_series}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category?.name || "Sin categoría"}</Badge>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"}>
                      {product.stock_quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => deleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
