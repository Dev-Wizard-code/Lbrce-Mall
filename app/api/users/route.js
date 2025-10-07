import { NextResponse } from "next/server"
import { mockData } from "@/data/mock-data"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    let users = [...mockData.users]

    // Filter by role if specified
    if (role) {
      users = users.filter((user) => user.role === role)
    }

    // Remove passwords from response
    users = users.map(({ password, ...user }) => user)

    return NextResponse.json({
      success: true,
      data: users,
      count: users.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["email", "password", "name", "role"]
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

    // Check if email already exists
    const existingUser = mockData.users.find((user) => user.email === body.email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        { status: 400 },
      )
    }

    // Create new user
    const newUser = {
      id: Math.max(...mockData.users.map((u) => u.id)) + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      ...body,
    }

    // Add to mock data
    mockData.users.push(newUser)

    // Remove password from response
    const { password, ...userResponse } = newUser

    return NextResponse.json({
      success: true,
      data: userResponse,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user",
      },
      { status: 500 },
    )
  }
}
