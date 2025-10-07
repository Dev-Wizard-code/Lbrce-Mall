"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Button } from "@/components/ui/button"
import { getUserCart, findProductById } from "@/data/mock-data"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Get user's cart items and populate with product details
      const userCartItems = getUserCart(user.id)
      const itemsWithProducts = userCartItems
        .map((cartItem) => ({
          ...cartItem,
          product: findProductById(cartItem.productId),
        }))
        .filter((item) => item.product)

      setCartItems(itemsWithProducts)
    }
    setLoading(false)
  }, [user])

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading checkout...</p>
            </div>
          </main>
          <Footer />
        </div>
      </AuthGuard>
    )
  }

  if (cartItems.length === 0) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-16">
                <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some items to your cart before proceeding to checkout.</p>
                <Button asChild size="lg">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-600">Complete your order</p>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="max-w-2xl mx-auto">
              <CheckoutForm cartItems={cartItems} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  )
}
