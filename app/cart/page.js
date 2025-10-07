"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import { AuthGuard } from "@/components/auth/auth-guard"
import { getUserCart, findProductById } from "@/data/mock-data"
import { useAuth } from "@/hooks/use-auth"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { user } = useAuth()
  const router = useRouter()
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
        .filter((item) => item.product) // Filter out items with missing products

      setCartItems(itemsWithProducts)
    }
    setLoading(false)
  }, [user])

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    // Mock API call - in real app, this would update the database
    setCartItems((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = async (cartItemId) => {
    // Mock API call - in real app, this would remove from database
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading your cart...</p>
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
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>

            {cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16">
                <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                <Button asChild size="lg">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              /* Cart with Items */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <CartSummary items={cartItems} onCheckout={handleCheckout} />
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  )
}
