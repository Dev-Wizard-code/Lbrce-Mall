import { NextResponse } from "next/server"
import { mockData } from "@/data/mock-data"

export async function GET(request, { params }) {
  try {
    const order = mockData.orders.find((o) => o.id === Number.parseInt(params.id))

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch order",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const orderIndex = mockData.orders.findIndex((o) => o.id === Number.parseInt(params.id))

    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 },
      )
    }

    // Update order
    const updatedOrder = {
      ...mockData.orders[orderIndex],
      ...body,
      id: Number.parseInt(params.id), // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    // Add delivery timestamp if status is being changed to delivered
    if (body.status === "delivered" && mockData.orders[orderIndex].status !== "delivered") {
      updatedOrder.deliveredAt = new Date().toISOString()
    }

    mockData.orders[orderIndex] = updatedOrder

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
      },
      { status: 500 },
    )
  }
}
