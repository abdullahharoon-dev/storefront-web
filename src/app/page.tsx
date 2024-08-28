'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/product-card';
import { useFeaturedProducts, useCategories } from '@/hooks/use-products';
import { useCartStore } from '@/stores/cart-store';

export default function HomePage() {
  const { data: featuredData, isLoading: productsLoading } = useFeaturedProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { addItem } = useCartStore();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Quality Products
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Shop the latest trends with fast shipping and easy returns. Quality guaranteed.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <Truck className="h-10 w-10 text-blue-600" />
            <div><h3 className="font-semibold">Free Shipping</h3><p className="text-sm text-gray-500">On orders over $50</p></div>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="h-10 w-10 text-blue-600" />
            <div><h3 className="font-semibold">Secure Payment</h3><p className="text-sm text-gray-500">100% secure checkout</p></div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="h-10 w-10 text-blue-600" />
            <div><h3 className="font-semibold">Easy Returns</h3><p className="text-sm text-gray-500">30-day return policy</p></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/categories" className="text-blue-600 hover:underline text-sm">View all</Link>
          </div>
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories?.slice(0, 5).map((cat) => (
                <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group">
                  <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-blue-50 hover:border-blue-200 border transition-colors">
                    <h3 className="font-medium group-hover:text-blue-600">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{cat.subcategories.length} subcategories</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products?isFeatured=true" className="text-blue-600 hover:underline text-sm">View all</Link>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <div key={i} className="h-72 bg-white rounded-lg animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredData?.data.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={() => addItem(product.id)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
