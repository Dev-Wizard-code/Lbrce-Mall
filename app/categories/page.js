export default function CategoriesPage() {
  const categories = [
    { name: "Electronics", icon: "💻", count: 45, color: "bg-blue-500" },
    { name: "Books & Stationery", icon: "📚", count: 120, color: "bg-emerald-500" },
    { name: "Fashion & Lifestyle", icon: "👕", count: 80, color: "bg-purple-500" },
    { name: "Sports & Fitness", icon: "⚽", count: 35, color: "bg-orange-500" },
    { name: "Home & Living", icon: "🏠", count: 25, color: "bg-pink-500" },
    { name: "Food & Beverages", icon: "🍕", count: 15, color: "bg-red-500" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-muted-foreground">Find exactly what you need for college life</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
              {category.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-muted-foreground">{category.count} products available</p>
          </div>
        ))}
      </div>
    </div>
  )
}
