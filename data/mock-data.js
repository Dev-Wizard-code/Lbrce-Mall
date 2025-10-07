export const mockData = {
  users: [
    {
      id: 1,
      email: "admin@lbrce.ac.in",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      studentId: "ADMIN001",
      department: "Administration",
      year: null,
      phone: "+91 9876543210",
      address: {
        hostel: "Admin Block",
        room: "101",
        city: "Mylavaram",
        state: "Andhra Pradesh",
        pincode: "521230",
      },
      createdAt: "2024-01-01T00:00:00Z",
      isActive: true,
    },
    {
      id: 2,
      email: "student1@lbrce.ac.in",
      password: "student123",
      name: "Rahul Kumar",
      role: "student",
      studentId: "20CS001",
      department: "Computer Science",
      year: 3,
      phone: "+91 9876543211",
      address: {
        hostel: "Boys Hostel A",
        room: "205",
        city: "Mylavaram",
        state: "Andhra Pradesh",
        pincode: "521230",
      },
      createdAt: "2024-01-15T00:00:00Z",
      isActive: true,
    },
    {
      id: 3,
      email: "student2@lbrce.ac.in",
      password: "student123",
      name: "Priya Sharma",
      role: "student",
      studentId: "20EC015",
      department: "Electronics",
      year: 2,
      phone: "+91 9876543212",
      address: {
        hostel: "Girls Hostel B",
        room: "301",
        city: "Mylavaram",
        state: "Andhra Pradesh",
        pincode: "521230",
      },
      createdAt: "2024-01-20T00:00:00Z",
      isActive: true,
    },
    {
      id: 4,
      email: "vendor@lbrce.ac.in",
      password: "vendor123",
      name: "Campus Store",
      role: "vendor",
      studentId: "VENDOR001",
      department: "Campus Services",
      year: null,
      phone: "+91 9876543213",
      address: {
        hostel: "Campus Store",
        room: "Ground Floor",
        city: "Mylavaram",
        state: "Andhra Pradesh",
        pincode: "521230",
      },
      createdAt: "2024-01-01T00:00:00Z",
      isActive: true,
    },
  ],
  categories: [
    {
      id: 1,
      name: "Books & Stationery",
      slug: "books-stationery",
      description: "Textbooks, notebooks, pens, and academic supplies",
      image: "/books-and-stationery.jpg",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      description: "Laptops, phones, accessories, and gadgets",
      image: "/electronics-gadgets.png",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 3,
      name: "Clothing & Fashion",
      slug: "clothing-fashion",
      description: "Casual wear, formal wear, and accessories",
      image: "/college-fashion-clothing.jpg",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 4,
      name: "Food & Snacks",
      slug: "food-snacks",
      description: "Healthy snacks, beverages, and meal options",
      image: "/healthy-snacks-food.jpg",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 5,
      name: "Sports & Fitness",
      slug: "sports-fitness",
      description: "Sports equipment, gym accessories, and fitness gear",
      image: "/sports-fitness-equipment.png",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 6,
      name: "Room Essentials",
      slug: "room-essentials",
      description: "Hostel room items, bedding, and daily necessities",
      image: "/hostel-room-essentials.jpg",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],
  products: [
    {
      id: 1,
      name: "Engineering Mathematics Textbook",
      slug: "engineering-mathematics-textbook",
      description: "Complete guide for engineering mathematics covering all topics for LBRCE curriculum",
      price: 450,
      originalPrice: 500,
      categoryId: 1,
      vendorId: 4,
      images: ["/engineering-mathematics-textbook.jpg", "/math-book-pages.jpg"],
      stock: 25,
      isActive: true,
      isFeatured: true,
      tags: ["textbook", "mathematics", "engineering"],
      specifications: {
        author: "Dr. B.S. Grewal",
        publisher: "Khanna Publishers",
        edition: "44th Edition",
        pages: 1232,
        language: "English",
      },
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "HP Pavilion Gaming Laptop",
      slug: "hp-pavilion-gaming-laptop",
      description: "Perfect for coding, gaming, and academic projects. Intel i5, 8GB RAM, 512GB SSD",
      price: 55000,
      originalPrice: 60000,
      categoryId: 2,
      vendorId: 4,
      images: ["/hp-gaming-laptop.jpg", "/laptop-keyboard-closeup.jpg"],
      stock: 5,
      isActive: true,
      isFeatured: true,
      tags: ["laptop", "gaming", "programming", "student"],
      specifications: {
        processor: "Intel Core i5-11400H",
        ram: "8GB DDR4",
        storage: "512GB SSD",
        graphics: "NVIDIA GTX 1650",
        display: "15.6 inch Full HD",
      },
      createdAt: "2024-01-02T00:00:00Z",
    },
    {
      id: 3,
      name: "LBRCE College T-Shirt",
      slug: "lbrce-college-tshirt",
      description: "Official LBRCE college t-shirt with college logo. Available in multiple colors",
      price: 299,
      originalPrice: 350,
      categoryId: 3,
      vendorId: 4,
      images: ["/college-t-shirt-with-logo.jpg", "/blue-college-t-shirt.jpg"],
      stock: 50,
      isActive: true,
      isFeatured: false,
      tags: ["clothing", "college", "official", "casual"],
      specifications: {
        material: "100% Cotton",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Navy Blue", "White", "Grey"],
        fit: "Regular Fit",
      },
      createdAt: "2024-01-03T00:00:00Z",
    },
    {
      id: 4,
      name: "Healthy Mix Nuts Pack",
      slug: "healthy-mix-nuts-pack",
      description: "Nutritious mix of almonds, cashews, and walnuts. Perfect study snack",
      price: 180,
      originalPrice: 200,
      categoryId: 4,
      vendorId: 4,
      images: ["/mixed-nuts-healthy-snack.jpg", "/almonds-cashews-walnuts.jpg"],
      stock: 100,
      isActive: true,
      isFeatured: false,
      tags: ["snacks", "healthy", "nuts", "study-food"],
      specifications: {
        weight: "250g",
        ingredients: "Almonds, Cashews, Walnuts",
        shelfLife: "6 months",
        packaging: "Sealed pouch",
      },
      createdAt: "2024-01-04T00:00:00Z",
    },
    {
      id: 5,
      name: "Badminton Racket Set",
      slug: "badminton-racket-set",
      description: "Professional badminton racket set with shuttlecocks. Great for campus sports",
      price: 1200,
      originalPrice: 1400,
      categoryId: 5,
      vendorId: 4,
      images: ["/badminton-racket-set.jpg", "/shuttlecock-badminton.jpg"],
      stock: 15,
      isActive: true,
      isFeatured: true,
      tags: ["sports", "badminton", "fitness", "recreation"],
      specifications: {
        material: "Carbon Fiber",
        weight: "85g",
        includes: "2 Rackets, 6 Shuttlecocks, Carry Bag",
        brand: "Yonex",
      },
      createdAt: "2024-01-05T00:00:00Z",
    },
    {
      id: 6,
      name: "Study Desk Lamp",
      slug: "study-desk-lamp",
      description: "LED desk lamp with adjustable brightness. Perfect for late night studies",
      price: 800,
      originalPrice: 900,
      categoryId: 6,
      vendorId: 4,
      images: ["/led-desk-lamp-study.jpg", "/adjustable-desk-lamp.jpg"],
      stock: 30,
      isActive: true,
      isFeatured: false,
      tags: ["lamp", "study", "LED", "hostel"],
      specifications: {
        power: "12W LED",
        features: "Touch Control, 3 Brightness Levels",
        color: "White/Black",
        warranty: "1 Year",
      },
      createdAt: "2024-01-06T00:00:00Z",
    },
  ],
  orders: [
    {
      id: 1,
      userId: 2,
      orderNumber: "LBRCE001",
      status: "delivered",
      totalAmount: 750,
      shippingAddress: {
        name: "Rahul Kumar",
        hostel: "Boys Hostel A",
        room: "205",
        phone: "+91 9876543211",
      },
      items: [
        {
          productId: 1,
          quantity: 1,
          price: 450,
          name: "Engineering Mathematics Textbook",
        },
        {
          productId: 3,
          quantity: 1,
          price: 299,
          name: "LBRCE College T-Shirt",
        },
      ],
      createdAt: "2024-01-15T10:30:00Z",
      deliveredAt: "2024-01-17T14:20:00Z",
    },
    {
      id: 2,
      userId: 3,
      orderNumber: "LBRCE002",
      status: "processing",
      totalAmount: 55000,
      shippingAddress: {
        name: "Priya Sharma",
        hostel: "Girls Hostel B",
        room: "301",
        phone: "+91 9876543212",
      },
      items: [
        {
          productId: 2,
          quantity: 1,
          price: 55000,
          name: "HP Pavilion Gaming Laptop",
        },
      ],
      createdAt: "2024-01-20T09:15:00Z",
    },
  ],
  cart: [
    {
      id: 1,
      userId: 2,
      productId: 4,
      quantity: 2,
      createdAt: "2024-01-21T08:00:00Z",
    },
    {
      id: 2,
      userId: 2,
      productId: 6,
      quantity: 1,
      createdAt: "2024-01-21T08:05:00Z",
    },
  ],
  roles: {
    admin: {
      name: "Administrator",
      permissions: [
        "manage_users",
        "manage_products",
        "manage_orders",
        "manage_categories",
        "view_analytics",
        "manage_vendors",
      ],
    },
    vendor: {
      name: "Vendor",
      permissions: ["manage_own_products", "view_own_orders", "update_order_status"],
    },
    student: {
      name: "Student",
      permissions: ["view_products", "place_orders", "manage_cart", "view_own_orders"],
    },
  },
  settings: {
    siteName: "LBRCE Mall",
    siteDescription: "Official ecommerce platform for LBRCE college students",
    currency: "INR",
    currencySymbol: "₹",
    shippingFee: 50,
    freeShippingThreshold: 1000,
    taxRate: 0.18,
    supportEmail: "support@lbrce.ac.in",
    supportPhone: "+91 8645123456",
  },
}

// Helper functions for data manipulation
export const findUserByEmail = (email) => {
  return mockData.users.find((user) => user.email === email)
}

export const findUserById = (id) => {
  return mockData.users.find((user) => user.id === Number.parseInt(id))
}

export const findProductById = (id) => {
  return mockData.products.find((product) => product.id === Number.parseInt(id))
}

export const findProductsByCategory = (categoryId) => {
  return mockData.products.filter((product) => product.categoryId === Number.parseInt(categoryId))
}

export const getFeaturedProducts = () => {
  return mockData.products.filter((product) => product.isFeatured && product.isActive)
}

export const getActiveCategories = () => {
  return mockData.categories.filter((category) => category.isActive)
}

export const getUserCart = (userId) => {
  return mockData.cart.filter((item) => item.userId === Number.parseInt(userId))
}

export const getUserOrders = (userId) => {
  return mockData.orders.filter((order) => order.userId === Number.parseInt(userId))
}

export const hasPermission = (userRole, permission) => {
  const role = mockData.roles[userRole]
  return role && role.permissions.includes(permission)
}

export const generateOrderNumber = () => {
  const prefix = "LBRCE"
  const timestamp = Date.now().toString().slice(-6) // Last 6 digits of timestamp
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}${timestamp}${random}`
}
