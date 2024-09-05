'use client';

import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { addItem } = useCartStore();
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const { data } = await api.get('/wishlist');
      return data;
    },
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8"><div className="h-96 bg-gray-100 rounded-lg animate-pulse" /></div>;

  const items = data?.data || [];

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save products you love for later</p>
        <Link href="/products"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wishlist ({items.length} items)</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item: { product: Parameters<typeof ProductCard>[0]['product'] }) => (
          <ProductCard key={item.product.id} product={item.product} onAddToCart={() => addItem(item.product.id)} />
        ))}
      </div>
    </div>
  );
}
