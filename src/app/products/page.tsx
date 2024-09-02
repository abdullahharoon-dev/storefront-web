'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/product-card';
import { useProducts, useCategories, useBrands } from '@/hooks/use-products';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { addItem } = useCartStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { data, isLoading } = useProducts({
    page, limit: 12, search: search || undefined, category: category || undefined, brand: brand || undefined,
    sortBy, sortOrder, minPrice: minPrice ? Number(minPrice) : undefined, maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <Label>Search</Label>
            <Input placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => { setCategory(v === 'all' ? '' : v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="All categories" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories?.map((c) => <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Brand</Label>
            <Select value={brand} onValueChange={(v) => { setBrand(v === 'all' ? '' : v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="All brands" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {brands?.map((b) => <SelectItem key={b.id} value={b.slug}>{b.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><Label>Min Price</Label><Input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /></div>
            <div><Label>Max Price</Label><Input type="number" placeholder="999" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></div>
          </div>
          <div>
            <Label>Sort By</Label>
            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(v) => { const [sb, so] = v.split('-'); setSortBy(sb); setSortOrder(so); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt-desc">Newest</SelectItem>
                <SelectItem value="createdAt-asc">Oldest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="text-center py-16 text-gray-500">No products found</div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{data?.meta.total} products found</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {data?.data.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={() => addItem(product.id)} />
                ))}
              </div>
              {data?.meta && data.meta.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button variant="outline" disabled={!data.meta.hasPrev} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                  <span className="flex items-center px-4 text-sm">Page {data.meta.page} of {data.meta.totalPages}</span>
                  <Button variant="outline" disabled={!data.meta.hasNext} onClick={() => setPage((p) => p + 1)}>Next</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
