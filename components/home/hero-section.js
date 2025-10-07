"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users, ShoppingBag, Star, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50" />
      <div className="absolute inset-0">
        <img
          src="/vibrant-college-students-shopping-with-laptops-and.jpg"
          alt="Students shopping"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="w-fit bg-gradient-to-r from-primary to-secondary text-white border-0 px-4 py-2 text-sm font-medium animate-pulse">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Welcome to LBRCE Mall ✨
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">
                  Your Campus
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}
                    Shopping
                  </span>
                  <br />
                  <span className="text-amber-500">Destination</span>
                </h1>

                <p className="text-xl text-gray-600 text-pretty max-w-lg leading-relaxed">
                  Everything you need for college life - from textbooks and tech to fashion and food.
                  <span className="font-semibold text-primary"> Exclusive deals</span> for LBRCE students.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-cyan-600 hover:from-cyan-600 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/products">
                    Start Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-400 text-amber-600 hover:bg-amber-50 hover:border-amber-500 transition-all duration-300 bg-transparent"
                  asChild
                >
                  <Link href="/deals">
                    <Star className="mr-2 h-4 w-4" />
                    Student Deals
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    1000+
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Brands</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <ShoppingBag className="h-6 w-6" />
                        <span className="font-bold">Electronics</span>
                      </div>
                      <div className="text-sm opacity-90">Laptops, Phones, Gadgets</div>
                      <img
                        src="/modern-laptop-and-smartphone-on-desk.jpg"
                        alt="Electronics"
                        className="w-full h-16 object-cover rounded-lg mt-3 opacity-80"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="h-6 w-6" />
                        <span className="font-bold">Peer Market</span>
                      </div>
                      <div className="text-sm opacity-90">Buy & Sell with Students</div>
                      <img
                        src="/placeholder-eyxez.png"
                        alt="Peer Market"
                        className="w-full h-16 object-cover rounded-lg mt-3 opacity-80"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 mt-8">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <Zap className="h-6 w-6" />
                        <span className="font-bold">Student Deals</span>
                      </div>
                      <div className="text-sm opacity-90">Exclusive Discounts</div>
                      <img
                        src="/discount-tags-and-sale-badges.jpg"
                        alt="Student Deals"
                        className="w-full h-16 object-cover rounded-lg mt-3 opacity-80"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <Star className="h-6 w-6" />
                        <span className="font-bold">Campus Events</span>
                      </div>
                      <div className="text-sm opacity-90">Tech Fest, Sports Day</div>
                      <img
                        src="/college-campus-festival-with-students.jpg"
                        alt="Campus Events"
                        className="w-full h-16 object-cover rounded-lg mt-3 opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
