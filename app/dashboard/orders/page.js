"use client"

import { useAuth } from "@/hooks/use-auth"
import { mockData } from "@/data/mock-data"
import OrderCard from "@/components/dashboard/order-card"
import { Card, CardContent } from "@/components/ui/card"
import { Package } from "lucide-react"

export default function OrdersPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  const userOrders = mockData.orders.filter((order) => order.userId === user.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>

      {userOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 text-center">When you place your first order, it will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
