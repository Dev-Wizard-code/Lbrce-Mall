"use client"

import { useAuth } from "@/hooks/use-auth"
import { mockData } from "@/data/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, MapPin } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function OrderDetailPage({ params }) {
  const { user } = useAuth()
  const orderId = params.id

  if (!user) {
    return <div>Loading...</div>
  }

  const order = mockData.orders.find((o) => o.id === orderId && o.userId === user.id)

  if (!order) {
    notFound()
  }

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

  const orderItems = order.items.map((item) => {
    const product = mockData.products.find((p) => p.id === item.productId)
    return { ...item, product }
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-600 mt-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.product?.image || "/placeholder.svg?height=80&width=80"}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product?.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getStatusColor(order.status)}>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{order.shipping}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p>{order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Payment Method:</span>
                  <span className="text-sm capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Payment Status:</span>
                  <Badge variant="outline" className="capitalize">
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
