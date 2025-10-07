"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export  function PriceSection() {
  const [prices, setPrices] = useState([])

  useEffect(() => {
    // Temporary dummy data (replace with API later if needed)
    const dummyPrices = [
      { id: 1, name: "Basic Pack", price: "₹199", features: ["1 Month Access", "Basic Deals", "Email Support"] },
      { id: 2, name: "Student Pro", price: "₹499", features: ["6 Months Access", "Exclusive Deals", "Priority Support"] },
      { id: 3, name: "Premium Plus", price: "₹999", features: ["1 Year Access", "All Deals", "24/7 Support"] },
    ]
    setPrices(dummyPrices)
  }, [])

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-4 py-2 text-sm font-medium">
            💰 Pricing Plans
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4">Choose Your Best Plan</h2>
          <p className="text-gray-600 mt-2">Affordable packages designed for every student</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prices.map((plan) => (
            <Card
              key={plan.id}
              className="shadow-xl border-0 hover:scale-105 transform transition duration-300 bg-white rounded-2xl"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-extrabold text-primary">{plan.price}</div>
                <ul className="text-gray-600 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>
                <button className="mt-6 px-6 py-3 w-full rounded-xl bg-gradient-to-r from-primary to-cyan-600 text-white font-semibold hover:opacity-90 transition">
                  Get Started
                </button>
              </CardContent>
            </Card>