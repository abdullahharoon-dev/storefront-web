import { create } from 'zustand';
import api from '@/lib/api';
import { Cart } from '@/types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()((set) => ({
  cart: null,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/cart');
      set({ cart: data.data });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productId, quantity = 1) => {
    const { data } = await api.post('/cart/items', { productId, quantity });
    set({ cart: data.data });
  },

  updateItem: async (itemId, quantity) => {
    const { data } = await api.patch(`/cart/items/${itemId}`, { quantity });
    set({ cart: data.data });
  },

  removeItem: async (itemId) => {
    const { data } = await api.delete(`/cart/items/${itemId}`);
    set({ cart: data.data });
  },

  clearCart: async () => {
    await api.delete('/cart');
    set({ cart: null });
  },
}));
