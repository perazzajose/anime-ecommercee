import { AdminSetupForm } from "@/components/admin/admin-setup-form"

export default function AdminSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuración Inicial</h1>
          <p className="text-gray-600">Crea tu primera cuenta de administrador</p>
        </div>
        <AdminSetupForm />
      </div>
    </div>
  )
}
