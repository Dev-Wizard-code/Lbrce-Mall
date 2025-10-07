"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockData } from "@/data/mock-data"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Find product by slug
  const product = mockData.products.find((p) => p.slug === params.slug)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const productImages = {
    1: ["/engineering-mathematics-textbook.jpg", "/math-book-pages.jpg"],
    2: ["/hp-gaming-laptop.jpg", "/laptop-keyboard-closeup.jpg"],
    3: ["/college-t-shirt-with-logo.jpg", "/blue-college-t-shirt.jpg"],
    4: ["/mixed-nuts-healthy-snack.jpg", "/almonds-cashews-walnuts.jpg"],
    5: ["/badminton-racket-set.jpg", "/shuttlecock-badminton.jpg"],
    6: ["/led-desk-lamp-study.jpg", "/adjustable-desk-lamp.jpg"],
  }

  const images = productImages[product.id] || ["/placeholder.svg"]
  const discount = calculateDiscount(product.originalPrice, product.price)
  const category = mockData.categories.find((c) => c.id === product.categoryId)

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    })
  }

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to Checkout",
      description: "Taking you to the checkout page...",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                        selectedImage === index ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">{category?.name}</Badge>
                  {product.isFeatured && <Badge variant="default">Featured</Badge>}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.5) • 24 reviews</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      <Badge className="bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Stock:</span>
                  <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                    {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                  </Badge>
                </div>
              </div>

              {product.stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={handleAddToCart} className="flex-1">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button onClick={handleBuyNow} variant="outline" className="flex-1 bg-transparent">
                      Buy Now
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Free Campus Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">7-Day Return</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                  {product.specifications && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Rahul Kumar</span>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        Excellent product! Exactly what I needed for my studies. Fast delivery to hostel.
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Priya Sharma</span>
                        <span className="text-sm text-gray-500">1 week ago</span>
                      </div>
                      <p className="text-gray-600">Good quality and value for money. Recommended for students.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Campus Delivery</h4>
                      <p className="text-gray-600">
                        Free delivery to your hostel room within 24 hours for orders above ₹1000. ₹50 delivery charge
                        for orders below ₹1000.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Delivery Areas</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• All LBRCE hostels</li>
                        <li>• Faculty quarters</li>
                        <li>• Campus offices</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Return Policy</h4>
                      <p className="text-gray-600">
                        7-day return policy for unused items in original packaging. Contact support for return requests.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
