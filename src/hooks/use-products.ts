import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Product, PaginatedResponse, Category, Brand } from '@/types';

export const useProducts = (params?: Record<string, string | number | boolean | undefined>) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Product>>('/products', { params });
      return data;
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/${slug}`);
      return data.data as Product;
    },
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data.data as Category[];
    },
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await api.get('/brands');
      return data.data as Brand[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useProducts({ isFeatured: true, limit: 8 });
};
