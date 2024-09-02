'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useProduct } from '@/hooks/use-products';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug);
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gray-100 rounded animate-pulse w-1/4" />
            <div className="h-24 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="container mx-auto px-4 py-16 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.images[selectedImage] ? (
              <Image src={product.images[selectedImage].url} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button key={img.id} onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${i === selectedImage ? 'border-blue-600' : 'border-gray-200'}`}>
                  <Image src={img.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.brand && <p className="text-sm text-gray-500 mb-1">{product.brand.name}</p>}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-500 ml-1">({product.reviewCount} reviews)</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold">${Number(product.price).toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-xl text-gray-400 line-through">${Number(product.compareAtPrice).toFixed(2)}</span>
            )}
          </div>

          <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className="mt-3">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Badge>

          <Separator className="my-6" />

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <Separator className="my-6" />

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon"><Heart className="h-5 w-5" /></Button>
          </div>

          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>SKU: {product.sku}</p>
            <p>Category: {product.category.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
