import { AuthGuard } from "@/components/auth/auth-guard"
import DashboardNav from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <DashboardNav />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </AuthGuard>
  )
}
