'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Package } from 'lucide-react';
import api from '@/lib/api';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-indigo-100 text-indigo-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data;
    },
  });

  const orders: Order[] = data?.data || [];

  if (isLoading) return <div className="container mx-auto px-4 py-8"><div className="h-96 bg-gray-100 rounded-lg animate-pulse" /></div>;

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
        <Link href="/products"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-bold">{order.orderNumber}</span>
                  <span className="text-sm text-gray-500 ml-4">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <Badge className={statusColors[order.status]}>{order.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{order.items.length} items</span>
                <span className="font-bold text-lg text-black">${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
