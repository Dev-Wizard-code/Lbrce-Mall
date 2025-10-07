"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CategoriesSection() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Categories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Shop by{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-xl text-gray-600 text-pretty max-w-2xl mx-auto">
              Find everything you need for college life
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded-lg" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Categories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Shop by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-gray-600 text-pretty max-w-2xl mx-auto">
            Find everything you need for college life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const gradients = [
              "from-blue-500 to-cyan-500",
              "from-purple-500 to-pink-500",
              "from-amber-500 to-orange-500",
              "from-green-500 to-emerald-500",
              "from-red-500 to-rose-500",
            ]
            const gradient = gradients[index % gradients.length]

            return (
              <Link key={category.category_id} href={`/products?category=${category.category_id}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`relative aspect-square bg-gradient-to-br ${gradient} overflow-hidden`}>
                      <Image
                        src={
                          category.image_url ||
                          `/placeholder.svg?height=200&width=200&query=${category.name} category items for college students`
                        }
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="font-bold text-lg text-balance group-hover:text-primary transition-colors mb-2">
                        {category.name}
                      </h3>
                      <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm text-primary font-medium mr-2">Shop Now</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
