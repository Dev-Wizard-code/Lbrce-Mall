import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { Star, ShoppingCart, Heart } from "lucide-react"

export function ProductGrid({ products }) {
  const productImages = {
    1: "/engineering-mathematics-textbook.jpg",
    2: "/hp-gaming-laptop.jpg",
    3: "/college-t-shirt-with-logo.jpg",
    4: "/mixed-nuts-healthy-snack.jpg",
    5: "/badminton-racket-set.jpg",
    6: "/led-desk-lamp-study.jpg",
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const discount = calculateDiscount(product.originalPrice, product.price)
        return (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={productImages[product.id] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>
                )}
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">4.5</span>
                  </div>
                </div>
                {product.stock <= 5 && product.stock > 0 && (
                  <Badge variant="destructive" className="absolute bottom-2 left-2">
                    Only {product.stock} left!
                  </Badge>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <div className="w-full">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {product.stock} in stock
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1" disabled={product.stock === 0}>
                    <Link href={`/products/${product.slug}`}>View Details</Link>
                  </Button>
                  <Button size="icon" variant="outline" disabled={product.stock === 0}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
