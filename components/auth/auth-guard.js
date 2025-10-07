"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children, requiredRole = null, requiredPermission = null }) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push("/unauthorized")
        return
      }

      // In a real app, you'd check permissions here
      if (requiredPermission && !user?.permissions?.includes(requiredPermission)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, loading, isAuthenticated, requiredRole, requiredPermission, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  return children
}

export function GuestGuard({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return children
}
