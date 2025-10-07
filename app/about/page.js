export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About LBRCE Mall</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your one-stop destination for all college essentials, designed specifically for LBRCE students
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            LBRCE Mall is dedicated to providing students with easy access to quality products at affordable prices. We
            understand the unique needs of college students and strive to make shopping convenient and budget-friendly.
          </p>

          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ Student-friendly prices with exclusive discounts</li>
            <li>✅ Campus delivery available</li>
            <li>✅ Wide range of academic and lifestyle products</li>
            <li>✅ Secure payment options including UPI and cards</li>
            <li>✅ Easy returns and exchanges</li>
          </ul>
        </div>

        <div className="bg-emerald-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>📧 Email: support@lbrcemall.edu.in</p>
            <p>📞 Phone: +91 9876543210</p>
            <p>📍 Address: LBRCE Campus, Mylavaram, Krishna District, AP</p>
            <p>🕒 Hours: Mon-Sat 9:00 AM - 8:00 PM</p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <span className="text-blue-600 cursor-pointer">Facebook</span>
              <span className="text-pink-600 cursor-pointer">Instagram</span>
              <span className="text-blue-400 cursor-pointer">Twitter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
