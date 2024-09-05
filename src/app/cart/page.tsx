'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, isLoading, fetchCart, updateItem, removeItem } = useCartStore();

  useEffect(() => { fetchCart(); }, [fetchCart]);

  if (isLoading) return <div className="container mx-auto px-4 py-8"><div className="h-96 bg-gray-100 rounded-lg animate-pulse" /></div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
        <Link href="/products"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.itemCount} items)</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border">
              <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                {item.product.images?.[0] && <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" />}
              </div>
              <div className="flex-1">
                <Link href={`/products/${item.product.slug}`} className="font-medium hover:text-blue-600">{item.product.name}</Link>
                <p className="text-lg font-bold mt-1">${Number(item.product.price).toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItem(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItem(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right font-bold">
                ${(Number(item.product.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg border p-6 h-fit sticky top-20">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal}</span></div>
            <div className="flex justify-between text-gray-500"><span>Shipping</span><span>Calculated at checkout</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span><span>${cart.subtotal}</span>
          </div>
          <Link href="/checkout" className="block mt-6">
            <Button className="w-full" size="lg">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
