"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Laptop, Shirt, Coffee, Dumbbell, HomeIcon, Percent, Calendar } from "lucide-react"

const categories = [
  { name: "Books & Stationery", href: "/products?category=1", icon: BookOpen },
  { name: "Electronics", href: "/products?category=2", icon: Laptop },
  { name: "Fashion", href: "/products?category=3", icon: Shirt },
  { name: "Food & Snacks", href: "/products?category=4", icon: Coffee },
  { name: "Sports & Fitness", href: "/products?category=5", icon: Dumbbell },
  { name: "Room Essentials", href: "/products?category=6", icon: HomeIcon },
]

const quickLinks = [
  { name: "Student Deals", href: "/deals", icon: Percent, badge: "Hot" },
  { name: "Campus Events", href: "/events", icon: Calendar, badge: "New" },
]

export function Navigation() {
  return (
    <nav className="border-b bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Categories */}
          <div className="hidden lg:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex items-center space-x-4">
            {quickLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="sm" asChild className="relative">
                <Link href={link.href} className="flex items-center space-x-2">
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <Badge variant="destructive" className="ml-1 text-xs">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="lg:hidden pb-3">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Link>
            ))}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/categories">More...</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
