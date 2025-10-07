"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Package, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderCard({ order }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
          <Badge className={getStatusColor(order.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </Badge>
        </div>
        <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount:</span>
            <span className="font-semibold">₹{order.total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Items:</span>
            <span className="text-sm">{order.items.length} item(s)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Payment:</span>
            <span className="text-sm capitalize">{order.paymentMethod}</span>
          </div>
          <div className="pt-3 border-t">
            <Link href={`/dashboard/orders/${order.id}`}>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
