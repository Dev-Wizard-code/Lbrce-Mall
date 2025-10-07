"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Package, Heart, ShoppingCart } from "lucide-react"
import { mockData } from "@/data/mock-data"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  // Get user-specific data
  const userOrders = mockData.orders.filter((order) => order.userId === user.id)
  const userCart = mockData.cart.filter((item) => item.userId === user.id)
  const userWishlist = mockData.wishlist.filter((item) => item.userId === user.id)

  const stats = [
    {
      title: "Total Orders",
      value: userOrders.length,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Cart Items",
      value: userCart.length,
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Wishlist Items",
      value: userWishlist.length,
      icon: Heart,
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Student ID</label>
              <p className="text-gray-900">{user.studentId || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      {userOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total}</p>
                    <Badge variant="outline" className="capitalize">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
