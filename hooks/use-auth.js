"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser, login as authLogin, logout as authLogout } from "@/lib/auth"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const user = await authLogin(email, password)
      setUser(user)
      return user
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    authLogout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    hasRole: (role) => user?.role === role,
    hasPermission: (permission) => {
      if (!user) return false
      // This would check against user permissions in real app
      return true
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
