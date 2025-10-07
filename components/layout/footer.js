import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LM</span>
              </div>
              <span className="font-bold text-white">LBRCE Mall</span>
            </div>
            <p className="text-sm">
              Official ecommerce platform for LBRCE college students. Shop for books, electronics, clothing, and more
              with campus delivery.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-blue-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/books-stationery" className="hover:text-blue-400">
                  Books & Stationery
                </Link>
              </li>
              <li>
                <Link href="/categories/electronics" className="hover:text-blue-400">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/clothing-fashion" className="hover:text-blue-400">
                  Clothing & Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/food-snacks" className="hover:text-blue-400">
                  Food & Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>LBRCE Campus, Mylavaram, AP 521230</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 8645123456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@lbrce.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 LBRCE Mall. All rights reserved. | Made for LBRCE College Students</p>
        </div>
      </div>
    </footer>
  )
}
