import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const discount = product.compareAtPrice
    ? Math.round(((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-lg border hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
        {discount && (
          <Badge className="absolute top-2 left-2 bg-red-500">-{discount}%</Badge>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" className="rounded-full h-8 w-8" onClick={onToggleWishlist}>
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-blue-600">{product.name}</h3>
        </Link>
        {product.brand && (
          <p className="text-xs text-gray-500 mt-1">{product.brand.name}</p>
        )}
        <div className="flex items-center gap-1 mt-2">
          {product.reviewCount > 0 && (
            <>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.averageRating.toFixed(1)} ({product.reviewCount})</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${Number(product.price).toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">${Number(product.compareAtPrice).toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={onAddToCart} disabled={product.stock === 0}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of stock</p>
        )}
      </div>
    </div>
  );
}
