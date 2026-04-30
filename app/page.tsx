import HeroSection from '@/components/hero-section';
import CategoryFilter from '@/components/category-filter';
import ProductGrid from '@/components/product-grid';
import TrustSection from '@/components/trust-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CategoryFilter />
      <ProductGrid />
      <TrustSection />
    </main>
  )
}
