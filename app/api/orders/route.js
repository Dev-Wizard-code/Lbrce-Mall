import { NextResponse } from "next/server"
import { mockData, getUserOrders, generateOrderNumber } from "@/data/mock-data"

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

    const orders = getUserOrders(Number.parseInt(userId))

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, items, shippingAddress, paymentMethod, totalAmount } = body

    // Validate required fields
    if (!userId || !items || !shippingAddress || !totalAmount) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Create new order
    const newOrder = {
      id: Math.max(...mockData.orders.map((o) => o.id), 0) + 1,
      userId: Number.parseInt(userId),
      orderNumber: generateOrderNumber(),
      status: "processing",
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "cod",
      items,
      createdAt: new Date().toISOString(),
    }

    // Add to mock data
    mockData.orders.push(newOrder)

    // Clear user's cart (in real app, this would be done after successful payment)
    mockData.cart = mockData.cart.filter((item) => item.userId !== Number.parseInt(userId))

    return NextResponse.json({
      success: true,
      data: newOrder,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
