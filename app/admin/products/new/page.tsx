import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProductForm } from "@/components/admin/product-form"
import { requireAdminAuth } from "@/lib/auth"

export default async function NewProductPage() {
  await requireAdminAuth()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nuevo Producto</h1>
            <p className="text-muted-foreground">Agrega un nuevo producto al catálogo</p>
          </div>

          <ProductForm />
        </div>
      </main>
    </div>
  )
}
