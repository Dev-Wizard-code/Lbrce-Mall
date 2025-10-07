import { NextResponse } from "next/server"
import { mockData, getUserCart, findProductById } from "@/data/mock-data"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 },
      )
    }

    const cartItems = getUserCart(Number.parseInt(userId))
    const cartWithProducts = cartItems
      .map((item) => ({
        ...item,
        product: findProductById(item.productId),
      }))
      .filter((item) => item.product)

    return NextResponse.json({
      success: true,
      data: cartWithProducts,
      count: cartWithProducts.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch cart",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, productId, quantity = 1 } = body

    if (!userId || !productId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID and Product ID are required",
        },
        { status: 400 },
      )
    }

    // Check if product exists
    const product = findProductById(productId)
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    // Check if item already exists in cart
    const existingItemIndex = mockData.cart.findIndex(
      (item) => item.userId === Number.parseInt(userId) && item.productId === Number.parseInt(productId),
    )

    if (existingItemIndex !== -1) {
      // Update quantity
      mockData.cart[existingItemIndex].quantity += quantity
      const updatedItem = {
        ...mockData.cart[existingItemIndex],
        product,
      }

      return NextResponse.json({
        success: true,
        data: updatedItem,
      })
    } else {
      // Add new item
      const newCartItem = {
        id: Math.max(...mockData.cart.map((c) => c.id), 0) + 1,
        userId: Number.parseInt(userId),
        productId: Number.parseInt(productId),
        quantity,
        createdAt: new Date().toISOString(),
      }

      mockData.cart.push(newCartItem)

      return NextResponse.json({
        success: true,
        data: {
          ...newCartItem,
          product,
        },
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add to cart",
      },
      { status: 500 },
    )
  }
}
