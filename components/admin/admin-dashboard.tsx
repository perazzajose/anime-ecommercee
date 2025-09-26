import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

export async function AdminDashboard() {
  // En una implementación real, estos datos vendrían de la base de datos
  const stats = {
    totalProducts: 156,
    totalOrders: 89,
    totalUsers: 234,
    revenue: 15420,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+23% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productos Recientes</CardTitle>
            <CardDescription>Últimos productos agregados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Figura Nezuko Kamado", series: "Demon Slayer", price: "$89.99" },
                { name: "Nendoroid Tanjiro", series: "Demon Slayer", price: "$45.99" },
                { name: "Figura Goku Ultra Instinct", series: "Dragon Ball", price: "$129.99" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.series}</p>
                  </div>
                  <p className="font-medium">{product.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
            <CardDescription>Últimos pedidos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "#001", customer: "Juan Pérez", total: "$89.99", status: "Completado" },
                { id: "#002", customer: "María García", total: "$45.99", status: "Procesando" },
                { id: "#003", customer: "Carlos López", total: "$129.99", status: "Enviado" },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {order.id} - {order.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                  <p className="font-medium">{order.total}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
