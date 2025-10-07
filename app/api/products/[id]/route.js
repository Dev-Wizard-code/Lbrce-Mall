import { NextResponse } from "next/server"
import { mockData, findProductById } from "@/data/mock-data"

export async function GET(request, { params }) {
  try {
    const product = findProductById(params.id)

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const productIndex = mockData.products.findIndex((p) => p.id === Number.parseInt(params.id))

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    // Update product
    const updatedProduct = {
      ...mockData.products[productIndex],
      ...body,
      id: Number.parseInt(params.id), // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    mockData.products[productIndex] = updatedProduct

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update product",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const productIndex = mockData.products.findIndex((p) => p.id === Number.parseInt(params.id))

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    // Remove product from mock data
    const deletedProduct = mockData.products.splice(productIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedProduct,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
      },
      { status: 500 },
    )
  }
}
