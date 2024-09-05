'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useCartStore } from '@/stores/cart-store';
import { Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, fetchCart } = useCartStore();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('0');
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const { data } = await api.get('/addresses');
      return data.data as Address[];
    },
  });

  useEffect(() => {
    if (addresses?.length) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr.id);
    }
  }, [addresses]);

  const applyCoupon = async () => {
    if (!couponCode || !cart) return;
    try {
      const { data } = await api.post('/coupons/validate', { code: couponCode, orderAmount: Number(cart.subtotal) });
      setDiscount(data.data.discount);
    } catch {
      setDiscount('0');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;
    setIsOrdering(true);
    try {
      const { data } = await api.post('/orders', {
        addressId: selectedAddress,
        couponCode: couponCode || undefined,
      });
      const orderId = data.data.id;

      const { data: paymentData } = await api.post('/payments/create-checkout-session', { orderId });
      if (paymentData.data.url) {
        window.location.href = paymentData.data.url;
      } else {
        router.push(`/orders/${orderId}`);
      }
    } catch {
      setIsOrdering(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const total = (Number(cart.subtotal) - Number(discount)).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
            <CardContent>
              {addresses?.length === 0 ? (
                <p className="text-gray-500">No addresses found. Please add one in your profile.</p>
              ) : (
                <div className="space-y-3">
                  {addresses?.map((addr) => (
                    <label key={addr.id} className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer ${selectedAddress === addr.id ? 'border-blue-600 bg-blue-50' : ''}`}>
                      <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="mt-1" />
                      <div>
                        <p className="font-medium">{addr.fullName}</p>
                        <p className="text-sm text-gray-500">{addr.addressLine1}, {addr.city}, {addr.state} {addr.postalCode}</p>
                        <p className="text-sm text-gray-500">{addr.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Coupon Code</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <Button variant="outline" onClick={applyCoupon}>Apply</Button>
              </div>
              {Number(discount) > 0 && <p className="text-green-600 text-sm mt-2">Discount: -${discount}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg border p-6 h-fit sticky top-20">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="truncate mr-2">{item.product.name} × {item.quantity}</span>
                <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal}</span></div>
            {Number(discount) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${discount}</span></div>}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total}</span></div>
          <Button className="w-full mt-6" size="lg" onClick={handlePlaceOrder} disabled={isOrdering || !selectedAddress}>
            {isOrdering ? 'Processing...' : 'Place Order & Pay'}
          </Button>
        </div>
      </div>
    </div>
  );
}
