export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Student Deals</h1>
        <p className="text-muted-foreground">Exclusive discounts for LBRCE students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Electronics Sale</h3>
          <p className="mb-4">Up to 40% off on laptops, phones, and accessories</p>
          <span className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
            Valid till Dec 31
          </span>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Books & Stationery</h3>
          <p className="mb-4">25% off on all academic books and supplies</p>
          <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">Valid till Jan 15</span>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Fashion & Lifestyle</h3>
          <p className="mb-4">30% off on clothing, shoes, and accessories</p>
          <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
            Valid till Dec 25
          </span>
        </div>
      </div>
    </div>
  )
}
