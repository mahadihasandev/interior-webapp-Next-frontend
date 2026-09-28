import { baseApi } from './api';
import {
  ApiResponse,
  ConsultationRequest,
  ConsultationResponse,
  OrderCheckoutRequest,
  OrderResponse,
} from '@/types';

export const consultationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookConsultation: builder.mutation<ApiResponse<ConsultationResponse>, ConsultationRequest>({
      query: (body) => ({
        url: '/consultations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Consultation'],
    }),

    createOrder: builder.mutation<ApiResponse<OrderResponse>, OrderCheckoutRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product', 'Order'],
    }),

    getOrder: builder.query<ApiResponse<OrderResponse>, string>({
      query: (orderNumber) => `/orders/${orderNumber}`,
      providesTags: ['Order'],
    }),

    fakePayOrder: builder.mutation<ApiResponse<OrderResponse>, string>({
      query: (orderNumber) => ({
        url: `/orders/${orderNumber}/fake-pay`,
        method: 'POST',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBookConsultationMutation,
  useCreateOrderMutation,
  useGetOrderQuery,
  useFakePayOrderMutation,
} = consultationApi;
