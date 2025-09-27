"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { CategoriesTable } from "@/components/admin/categories-table"
import { CategoryForm } from "@/components/admin/category-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Category } from "@/lib/supabase"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleCategoryCreated = (category: Category) => {
    setCategories([...categories, category])
    setIsDialogOpen(false)
  }

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategories(categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
    setIsDialogOpen(false)
    setEditingCategory(null)
  }

  const handleCategoryDeleted = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
            <p className="text-muted-foreground">Administra las categorías de productos de tu tienda</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
              </DialogHeader>
              <CategoryForm
                category={editingCategory}
                onSuccess={editingCategory ? handleCategoryUpdated : handleCategoryCreated}
              />
            </DialogContent>
          </Dialog>
        </div>

        <CategoriesTable
          categories={categories}
          setCategories={setCategories}
          onEdit={handleEditCategory}
          onDelete={handleCategoryDeleted}
        />
      </main>
    </div>
  )
}
