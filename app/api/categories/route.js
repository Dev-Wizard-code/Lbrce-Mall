import { NextResponse } from "next/server"
import { mockData, getActiveCategories } from "@/data/mock-data"

export async function GET() {
  try {
    const categories = getActiveCategories()

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description"]
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

    // Create new category
    const newCategory = {
      id: Math.max(...mockData.categories.map((c) => c.id)) + 1,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image: body.image || "/placeholder.svg",
      isActive: true,
      createdAt: new Date().toISOString(),
      ...body,
    }

    // Add to mock data
    mockData.categories.push(newCategory)

    return NextResponse.json({
      success: true,
      data: newCategory,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create category",
      },
      { status: 500 },
    )
  }
}
