import { AdminRegisterForm } from "@/components/admin/admin-register-form"

export default function AdminRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar Administrador</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Crear cuenta de administrador</p>
        </div>
        <AdminRegisterForm />
      </div>
    </div>
  )
}
