import { NextResponse } from "next/server"
import { mockData } from "@/data/mock-data"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const inStock = searchParams.get("inStock")
    const featured = searchParams.get("featured")

    let products = [...mockData.products]

    // Apply filters
    if (categoryId) {
      products = products.filter((product) => product.categoryId === Number.parseInt(categoryId))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    if (minPrice) {
      products = products.filter((product) => product.price >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      products = products.filter((product) => product.price <= Number.parseInt(maxPrice))
    }

    if (inStock === "true") {
      products = products.filter((product) => product.stock > 0)
    }

    if (featured === "true") {
      products = products.filter((product) => product.isFeatured)
    }

    // Only return active products
    products = products.filter((product) => product.isActive)

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "price", "categoryId", "vendorId", "stock"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Create new product
    const newProduct = {
      id: Math.max(...mockData.products.map((p) => p.id)) + 1,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      images: body.images || ["/placeholder.svg"],
      originalPrice: body.originalPrice || body.price,
      isActive: true,
      isFeatured: false,
      tags: body.tags || [],
      specifications: body.specifications || {},
      createdAt: new Date().toISOString(),
      ...body,
    }

    // Add to mock data (in real app, this would save to database)
    mockData.products.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 500 },
    )
  }
}
