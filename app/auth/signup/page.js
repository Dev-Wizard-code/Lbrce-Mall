import { SignupForm } from "@/components/auth/signup-form"
import { GuestGuard } from "@/components/auth/auth-guard"
import Link from "next/link"

export default function SignupPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">LBRCE Mall</h1>
            <p className="mt-2 text-sm text-gray-600">Join the official LBRCE student marketplace</p>
          </div>

          <SignupForm />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GuestGuard>
  )
}
