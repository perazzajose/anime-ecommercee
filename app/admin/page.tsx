import { Suspense } from "react"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { requireAdminAuth } from "@/lib/auth"

export default async function AdminPage() {
  await requireAdminAuth()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
              <p className="text-muted-foreground">Gestiona tu tienda de anime</p>
            </div>
          </div>

          <Suspense fallback={<div>Cargando...</div>}>
            <AdminDashboard />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
