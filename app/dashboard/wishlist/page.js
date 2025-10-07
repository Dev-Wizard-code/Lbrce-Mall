"use client"

import { useAuth } from "@/hooks/use-auth"
import { mockData } from "@/data/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState(mockData.wishlist.filter((item) => item.userId === user?.id))

  if (!user) {
    return <div>Loading...</div>
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId))
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (productId) => {
    // Mock add to cart functionality
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart.",
    })
  }

  const wishlistProducts = wishlistItems.map((item) => {
    const product = mockData.products.find((p) => p.id === item.productId)
    return { ...item, product }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-600 mt-2">Items you've saved for later</p>
      </div>

      {wishlistProducts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 text-center">Save items you love to your wishlist and shop them later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((item) => (
            <Card key={item.productId} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={item.product?.image || "/placeholder.svg?height=300&width=300"}
                  alt={item.product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">{item.product?.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.product?.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-blue-600">₹{item.product?.price}</span>
                  {item.product?.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{item.product.originalPrice}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => addToCart(item.productId)} className="flex-1" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button onClick={() => removeFromWishlist(item.productId)} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
