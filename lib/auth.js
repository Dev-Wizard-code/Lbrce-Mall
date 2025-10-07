import { findUserByEmail, hasPermission } from "@/data/mock-data"

// Mock session storage (in real app, this would be JWT or session cookies)
let currentUser = null

export const login = async (email, password) => {
  const user = findUserByEmail(email)

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password")
  }

  if (!user.isActive) {
    throw new Error("Account is deactivated")
  }

  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user
  currentUser = userWithoutPassword

  // In real app, set HTTP-only cookie or JWT token
  if (typeof window !== "undefined") {
    localStorage.setItem("lbrce_user", JSON.stringify(userWithoutPassword))
  }

  return userWithoutPassword
}

export const logout = () => {
  currentUser = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("lbrce_user")
  }
}

export const getCurrentUser = () => {
  if (currentUser) return currentUser

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lbrce_user")
    if (stored) {
      currentUser = JSON.parse(stored)
      return currentUser
    }
  }

  return null
}

export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

export const checkPermission = (permission) => {
  const user = getCurrentUser()
  if (!user) return false

  return hasPermission(user.role, permission)
}

export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new Error("Authentication required")
  }
  return getCurrentUser()
}

export const requirePermission = (permission) => {
  const user = requireAuth()
  if (!checkPermission(permission)) {
    throw new Error(`Permission denied: ${permission}`)
  }
  return user
}

// Mock user roles and permissions
export const ROLES = {
  ADMIN: "admin",
  VENDOR: "vendor",
  STUDENT: "student",
}

export const PERMISSIONS = {
  MANAGE_USERS: "manage_users",
  MANAGE_PRODUCTS: "manage_products",
  MANAGE_ORDERS: "manage_orders",
  MANAGE_CATEGORIES: "manage_categories",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_VENDORS: "manage_vendors",
  MANAGE_OWN_PRODUCTS: "manage_own_products",
  VIEW_OWN_ORDERS: "view_own_orders",
  UPDATE_ORDER_STATUS: "update_order_status",
  VIEW_PRODUCTS: "view_products",
  PLACE_ORDERS: "place_orders",
  MANAGE_CART: "manage_cart",
  VIEW_OWN_ORDERS: "view_own_orders",
}
