"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { User, Package, Heart, Settings, BarChart3 } from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const studentNavItems = [
    { href: "/dashboard", label: "Profile", icon: User },
    { href: "/dashboard/orders", label: "My Orders", icon: Package },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const adminNavItems = [
    { href: "/dashboard", label: "Overview", icon: BarChart3 },
    { href: "/dashboard/users", label: "Users", icon: User },
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/orders", label: "Orders", icon: Package },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const vendorNavItems = [
    { href: "/dashboard", label: "Overview", icon: BarChart3 },
    { href: "/dashboard/products", label: "My Products", icon: Package },
    { href: "/dashboard/orders", label: "Orders", icon: Package },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const getNavItems = () => {
    if (user?.role === "admin") return adminNavItems
    if (user?.role === "vendor") return vendorNavItems
    return studentNavItems
  }

  const navItems = getNavItems()

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
