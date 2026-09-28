import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Base RTK Query API definition.
 * Feature-specific endpoints inject themselves into this API using injectEndpoints.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['Product', 'Category', 'Consultation', 'Order'],
  endpoints: () => ({}),
});
