import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { StudentFeatures } from "@/components/home/student-features"
import { PriceSection } from "@/components/home/price-section"
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <StudentFeatures />
        <PriceSection/>
      </main>
      <Footer />
    </div>
  )
}
