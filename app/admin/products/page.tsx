import { Suspense } from "react"
import { ProductsTable } from "@/components/admin/products-table"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { requireAdminAuth } from "@/lib/auth"

export default async function ProductsPage() {
  await requireAdminAuth()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Productos</h1>
              <p className="text-muted-foreground">Gestiona el catálogo de productos</p>
            </div>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </Link>
          </div>

          <Suspense fallback={<div>Cargando productos...</div>}>
            <ProductsTable />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
