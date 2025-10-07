"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSort } from "@/components/products/product-sort"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { mockData } from "@/data/mock-data"
import { Search, Filter } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState(mockData.products)
  const [filteredProducts, setFilteredProducts] = useState(mockData.products)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 100000],
    availability: "all",
  })
  const [sortBy, setSortBy] = useState("name-asc")

  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.categoryId))
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply availability filter
    if (filters.availability === "in-stock") {
      filtered = filtered.filter((product) => product.stock > 0)
    } else if (filters.availability === "out-of-stock") {
      filtered = filtered.filter((product) => product.stock === 0)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "popular":
          return b.isFeatured - a.isFeatured
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, filters, sortBy])

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
            <p className="text-lg text-gray-600">Discover all products available in the LBRCE Mall marketplace</p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ProductSort onSortChange={handleSortChange} currentSort={sortBy} />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <ProductFilters onFiltersChange={handleFiltersChange} activeFilters={filters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters onFiltersChange={handleFiltersChange} activeFilters={filters} />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
