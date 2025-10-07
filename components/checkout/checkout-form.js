"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { formatPrice, generateOrderNumber } from "@/lib/utils"
import { mockData } from "@/data/mock-data"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Wallet, Building2, Truck } from "lucide-react"

export function CheckoutForm({ cartItems }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    hostel: user?.address?.hostel || "",
    room: user?.address?.room || "",
    specialInstructions: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shippingFee = subtotal >= mockData.settings.freeShippingThreshold ? 0 : mockData.settings.shippingFee
  const tax = subtotal * mockData.settings.taxRate
  const total = subtotal + shippingFee + tax

  const handleInputChange = (field, value) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Mock order creation
      const orderNumber = generateOrderNumber()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderNumber} has been placed and will be delivered soon.`,
      })

      router.push(`/orders/success?orderNumber=${orderNumber}`)
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Delivery Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={shippingInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hostel">Hostel</Label>
              <Select onValueChange={(value) => handleInputChange("hostel", value)} value={shippingInfo.hostel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hostel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boys-hostel-a">Boys Hostel A</SelectItem>
                  <SelectItem value="boys-hostel-b">Boys Hostel B</SelectItem>
                  <SelectItem value="girls-hostel-a">Girls Hostel A</SelectItem>
                  <SelectItem value="girls-hostel-b">Girls Hostel B</SelectItem>
                  <SelectItem value="faculty-quarters">Faculty Quarters</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room Number</Label>
              <Input
                id="room"
                value={shippingInfo.room}
                onChange={(e) => handleInputChange("room", e.target.value)}
                placeholder="e.g., 205"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Delivery Instructions (Optional)</Label>
            <Input
              id="instructions"
              value={shippingInfo.specialInstructions}
              onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
              placeholder="e.g., Call before delivery, Leave at reception"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer flex-1">
                <Wallet className="h-5 w-5" />
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when your order is delivered</div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
              <RadioGroupItem value="upi" id="upi" disabled />
              <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer flex-1">
                <Building2 className="h-5 w-5" />
                <div>
                  <div className="font-medium">UPI Payment</div>
                  <div className="text-sm text-gray-600">Coming soon</div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
              <RadioGroupItem value="card" id="card" disabled />
              <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5" />
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Coming soon</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
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
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
        <Label htmlFor="terms" className="text-sm cursor-pointer">
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>

      {/* Place Order Button */}
      <Button type="submit" size="lg" className="w-full" disabled={loading || !agreeToTerms}>
        {loading ? "Placing Order..." : `Place Order - ${formatPrice(total)}`}
      </Button>
    </form>
  )
}
