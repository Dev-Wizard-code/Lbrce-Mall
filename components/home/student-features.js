"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Percent, MessageCircle, Sparkles, GraduationCap } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Percent,
    title: "Student Deals",
    description: "Exclusive discounts and offers for LBRCE students. Save up to 50% on essential items.",
    badge: "Save 50%",
    href: "/deals",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    icon: Calendar,
    title: "Campus Events",
    description: "Stay updated with college events and purchase related merchandise and supplies.",
    badge: "New",
    href: "/events",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Users,
    title: "Peer Marketplace",
    description: "Buy and sell used textbooks, gadgets, and other items with fellow students.",
    badge: "Beta",
    href: "/marketplace",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: MessageCircle,
    title: "Student Support",
    description: "Get help from our dedicated student support team. We understand college life.",
    badge: "24/7",
    href: "/support",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
  },
]

export function StudentFeatures() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="h-4 w-4" />
            Student Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Made for{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Students</span>
          </h2>
          <p className="text-xl text-gray-600 text-pretty max-w-3xl mx-auto">
            LBRCE Mall is designed specifically for college students. Enjoy features and services tailored to your
            academic and social needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-0 shadow-lg overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={`bg-gradient-to-r ${feature.gradient} text-white border-0 shadow-md`}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-balance font-bold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-pretty mb-6 text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={`w-full group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:text-white group-hover:border-transparent transition-all duration-300 border-2 font-semibold`}
                >
                  <Link href={feature.href}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
