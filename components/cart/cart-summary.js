"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { mockData } from "@/data/mock-data"

export function CartSummary({ items, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shippingFee = subtotal >= mockData.settings.freeShippingThreshold ? 0 : mockData.settings.shippingFee
  const tax = subtotal * mockData.settings.taxRate
  const total = subtotal + shippingFee + tax

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={shippingFee === 0 ? "text-green-600" : ""}>
              {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax (GST 18%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {subtotal < mockData.settings.freeShippingThreshold && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              Add {formatPrice(mockData.settings.freeShippingThreshold - subtotal)} more for free shipping!
            </p>
          </div>
        )}

        <Button onClick={onCheckout} className="w-full" size="lg" disabled={items.length === 0}>
          Proceed to Checkout
        </Button>

        <div className="text-xs text-gray-500 text-center">
          <p>Secure checkout with 256-bit SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
