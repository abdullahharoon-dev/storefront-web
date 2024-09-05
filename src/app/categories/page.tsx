'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/use-products';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories?.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group">
              <div className="bg-white rounded-lg border p-8 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold group-hover:text-blue-600">{cat.name}</h2>
                {cat.description && <p className="text-gray-500 mt-2 text-sm">{cat.description}</p>}
                {cat.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.subcategories.map((sub) => (
                      <span key={sub.id} className="text-xs bg-gray-100 px-2 py-1 rounded">{sub.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
