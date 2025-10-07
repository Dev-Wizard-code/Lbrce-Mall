import { NextResponse } from "next/server"
import { findUserByEmail } from "@/data/mock-data"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Find user by email
    const user = findUserByEmail(email)

    if (!user || user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Account is deactivated",
        },
        { status: 401 },
      )
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    return NextResponse.json({
      success: true,
      data: userResponse,
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Login failed",
      },
      { status: 500 },
    )
  }
}
