'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data.data as Order;
    },
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8"><div className="h-96 bg-gray-100 rounded-lg animate-pulse" /></div>;
  if (!data) return <div className="container mx-auto px-4 py-16 text-center">Order not found</div>;

  const order = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
        <Badge>{order.status}</Badge>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader><CardTitle>Items</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.product.images?.[0] && <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                  </div>
                  <p className="font-bold">${Number(item.total).toFixed(2)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span></div>
              {Number(order.discount) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${Number(order.discount).toFixed(2)}</span></div>}
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${Number(order.total).toFixed(2)}</span></div>
              <div className="flex justify-between mt-2"><span>Payment</span><Badge variant="outline">{order.paymentStatus}</Badge></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
            <CardContent className="text-sm text-gray-600">
              <p className="font-medium text-black">{order.address.fullName}</p>
              <p>{order.address.addressLine1}</p>
              <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
              <p>{order.address.phone}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
