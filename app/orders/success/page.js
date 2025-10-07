"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Clock } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber") || "LBRCE001"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
              <p className="text-lg text-gray-600 mb-2">Thank you for your order. Your order number is:</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{orderNumber}</p>
              <p className="text-gray-600">
                We'll send you a confirmation email with order details and tracking information.
              </p>
            </div>

            {/* Order Timeline */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Order Processing</h3>
                      <p className="text-sm text-gray-600">We're preparing your items for delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <Truck className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Out for Delivery</h3>
                      <p className="text-sm text-gray-600">Your order will be delivered to your hostel</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Delivered</h3>
                      <p className="text-sm text-gray-600">Expected delivery within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/orders">View My Orders</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Need help with your order? Contact us at{" "}
                <a href="mailto:support@lbrce.ac.in" className="text-blue-600 hover:underline">
                  support@lbrce.ac.in
                </a>{" "}
                or call{" "}
                <a href="tel:+918645123456" className="text-blue-600 hover:underline">
                  +91 8645123456
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
