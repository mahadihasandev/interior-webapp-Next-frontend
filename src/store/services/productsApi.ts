import { baseApi } from './api';
import { ApiResponse, Category, CustomSample, Product, ProductFilters } from '@/types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (response: ApiResponse<Category[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    getProducts: builder.query<ApiResponse<Product[]>, ProductFilters | void>({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.sort) params.append('sort', filters.sort);
        if (filters?.min_price) params.append('min_price', filters.min_price.toString());
        if (filters?.max_price) params.append('max_price', filters.max_price.toString());
        if (filters?.featured) params.append('featured', 'true');
        if (filters?.product_type) params.append('product_type', filters.product_type);
        if (filters?.page) params.append('page', filters.page.toString());

        const queryString = params.toString();
        return `/products${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getCustomFitProducts: builder.query<Product[], number | void>({
      query: (limit = 12) => `/products?product_type=custom_fit&per_page=${limit}`,
      transformResponse: (response: ApiResponse<Product[]>) => response.data,
      providesTags: [{ type: 'Product', id: 'CUSTOM_FIT' }],
    }),

    getFeaturedProducts: builder.query<Product[], number | void>({
      query: (limit = 6) => `/products/featured?limit=${limit}`,
      transformResponse: (response: ApiResponse<Product[]>) => response.data,
      providesTags: [{ type: 'Product', id: 'FEATURED' }],
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      transformResponse: (response: ApiResponse<Product>) => response.data,
      providesTags: (_result, _error, slug) => [{ type: 'Product', id: slug }],
    }),

    getVillaDesigns: builder.query<{ data: CustomSample[]; categories: Array<{ id: string; nameEn: string; nameAr: string }> }, void>({
      query: () => '/villa-designs',
      providesTags: [{ type: 'Product', id: 'VILLA_DESIGNS' }],
    }),

    submitCustomOrder: builder.mutation<ApiResponse<{ id: number; order_number: string }>, Record<string, unknown>>({
      query: (body) => ({
        url: '/custom-orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetCustomFitProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductBySlugQuery,
  useGetVillaDesignsQuery,
  useSubmitCustomOrderMutation,
} = productsApi;
