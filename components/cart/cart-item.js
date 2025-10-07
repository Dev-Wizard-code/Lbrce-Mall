"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return

    setIsUpdating(true)
    try {
      await onUpdateQuantity(item.id, newQuantity)
      toast({
        title: "Cart Updated",
        description: `Quantity updated to ${newQuantity}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    try {
      await onRemove(item.id)
      toast({
        title: "Item Removed",
        description: `${item.product.name} removed from cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      })
    }
  }

  const productImages = {
    1: "/engineering-mathematics-textbook.jpg",
    2: "/hp-gaming-laptop.jpg",
    3: "/college-t-shirt-with-logo.jpg",
    4: "/mixed-nuts-healthy-snack.jpg",
    5: "/badminton-racket-set.jpg",
    6: "/led-desk-lamp-study.jpg",
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={productImages[item.product.id] || "/placeholder.svg"}
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{item.product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.product.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold">{formatPrice(item.product.price)}</span>
              {item.product.originalPrice > item.product.price && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(item.product.originalPrice)}</span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating || item.quantity >= item.product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Total Price */}
          <div className="text-right">
            <div className="text-lg font-bold">{formatPrice(item.product.price * item.quantity)}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>

        {/* Stock Warning */}
        {item.quantity >= item.product.stock && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              Maximum available quantity reached ({item.product.stock} in stock)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
