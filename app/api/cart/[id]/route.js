import { NextResponse } from "next/server"
import { mockData } from "@/data/mock-data"

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const { quantity } = body

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid quantity is required",
        },
        { status: 400 },
      )
    }

    const cartItemIndex = mockData.cart.findIndex((item) => item.id === Number.parseInt(params.id))

    if (cartItemIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart item not found",
        },
        { status: 404 },
      )
    }

    // Update quantity
    mockData.cart[cartItemIndex].quantity = quantity

    return NextResponse.json({
      success: true,
      data: mockData.cart[cartItemIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update cart item",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const cartItemIndex = mockData.cart.findIndex((item) => item.id === Number.parseInt(params.id))

    if (cartItemIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart item not found",
        },
        { status: 404 },
      )
    }

    // Remove item from cart
    const deletedItem = mockData.cart.splice(cartItemIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedItem,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to remove cart item",
      },
      { status: 500 },
    )
  }
}
