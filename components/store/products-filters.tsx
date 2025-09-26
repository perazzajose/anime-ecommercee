"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import type { Category } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function ProductsFilters() {
  const [categories, setCategories] = useState<Category[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
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
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <Label htmlFor={category.id} className="text-sm">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Rango de Precio</h3>
            <div className="space-y-3">
              <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="w-full" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Series */}
          <div>
            <h3 className="font-medium mb-3">Series Populares</h3>
            <div className="space-y-2">
              {["Demon Slayer", "Dragon Ball", "Naruto", "One Piece", "Attack on Titan"].map((series) => (
                <div key={series} className="flex items-center space-x-2">
                  <Checkbox id={series} />
                  <Label htmlFor={series} className="text-sm">
                    {series}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Aplicar Filtros</Button>
        </CardContent>
      </Card>
    </div>
  )
}
