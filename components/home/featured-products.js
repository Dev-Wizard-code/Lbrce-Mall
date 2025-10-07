"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products?featured=true")
        const result = await response.json()
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data.slice(0, 6)) // Show only 6 featured products
        } else {
          console.error("Invalid data structure:", result)
          setProducts([])
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-white to-cyan-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Featured
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Featured
              </span>{" "}
              Products
            </h2>
            <p className="text-xl text-gray-600 text-pretty max-w-2xl mx-auto">
              Handpicked items perfect for college students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-xl" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg" />
                    <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
                    <div className="h-6 bg-gray-200 rounded-lg w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-cyan-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Featured
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            Products
          </h2>
          <p className="text-xl text-gray-600 text-pretty max-w-2xl mx-auto">
            Handpicked items perfect for college students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.isArray(products) &&
            products.map((product, index) => {
              const accentColors = [
                "border-t-blue-500",
                "border-t-purple-500",
                "border-t-amber-500",
                "border-t-green-500",
                "border-t-red-500",
                "border-t-cyan-500",
              ]
              const accentColor = accentColors[index % accentColors.length]

              return (
                <Card
                  key={product.product_id || product.id}
                  className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden ${accentColor} border-t-4`}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={
                          product.images?.[0] ||
                          `/placeholder.svg?height=300&width=300&query=${product.name} product for college students`
                        }
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                          {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                          OFF
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 shadow-lg"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-6 bg-white">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg line-clamp-2 text-balance text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 text-pretty">{product.short_description}</p>

                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-sm text-gray-500 ml-2 font-medium">(4.8)</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xl text-gray-800">
                                ₹{product.price?.toLocaleString() || "0"}
                              </span>
                              {product.compare_at_price && product.compare_at_price > product.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{product.compare_at_price.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-green-600 font-medium">✓ Free delivery</div>
                          </div>

                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary to-cyan-600 hover:from-cyan-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            asChild
                          >
                            <Link href={`/products/${product.product_id}`}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-8 py-3 text-lg font-semibold bg-transparent"
            asChild
          >
            <Link href="/products">
              <Sparkles className="mr-2 h-5 w-5" />
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
