"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { getActiveCategories } from "@/data/mock-data"
import { formatPrice } from "@/lib/utils"
import { X } from "lucide-react"

export function ProductFilters({ onFiltersChange, activeFilters = {} }) {
  const categories = getActiveCategories()
  const [priceRange, setPriceRange] = useState(activeFilters.priceRange || [0, 100000])
  const [selectedCategories, setSelectedCategories] = useState(activeFilters.categories || [])
  const [availability, setAvailability] = useState(activeFilters.availability || "all")

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId)

    setSelectedCategories(newCategories)
    onFiltersChange({
      categories: newCategories,
      priceRange,
      availability,
    })
  }

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange)
    onFiltersChange({
      categories: selectedCategories,
      priceRange: newRange,
      availability,
    })
  }

  const handleAvailabilityChange = (value) => {
    setAvailability(value)
    onFiltersChange({
      categories: selectedCategories,
      priceRange,
      availability: value,
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 100000])
    setAvailability("all")
    onFiltersChange({
      categories: [],
      priceRange: [0, 100000],
      availability: "all",
    })
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100000 || availability !== "all"

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                    {category?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                  </Badge>
                )
              })}
              {(priceRange[0] > 0 || priceRange[1] < 100000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handlePriceChange([0, 100000])} />
                </Badge>
              )}
              {availability !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {availability === "in-stock" ? "In Stock" : "Out of Stock"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleAvailabilityChange("all")} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={100000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability-all"
                checked={availability === "all"}
                onCheckedChange={() => handleAvailabilityChange("all")}
              />
              <Label htmlFor="availability-all" className="text-sm font-normal cursor-pointer">
                All Products
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability-in-stock"
                checked={availability === "in-stock"}
                onCheckedChange={() => handleAvailabilityChange("in-stock")}
              />
              <Label htmlFor="availability-in-stock" className="text-sm font-normal cursor-pointer">
                In Stock Only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability-out-of-stock"
                checked={availability === "out-of-stock"}
                onCheckedChange={() => handleAvailabilityChange("out-of-stock")}
              />
              <Label htmlFor="availability-out-of-stock" className="text-sm font-normal cursor-pointer">
                Out of Stock
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
