'use client';

import Link from 'next/link';
import { useBrands } from '@/hooks/use-products';

export default function BrandsPage() {
  const { data: brands, isLoading } = useBrands();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Brands</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands?.map((brand) => (
            <Link key={brand.id} href={`/products?brand=${brand.slug}`} className="group">
              <div className="bg-white rounded-lg border p-6 text-center hover:shadow-md transition-shadow">
                <h3 className="font-bold group-hover:text-blue-600">{brand.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
