export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon?: string;
  products_count?: number;
  created_at?: string;
}

export interface Product {
  id: number;
  category_id: number;
  category?: Category;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  dimensions?: string;
  materials?: string;
  color?: string;
  stock: number;
  in_stock: boolean;
  image_url: string;
  gallery: string[];
  is_featured: boolean;
  rating: number;
  reviews_count: number;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ConsultationRequest {
  client_name: string;
  email: string;
  phone: string;
  room_type: string;
  budget_range: string;
  style_preference?: string;
  notes?: string;
  preferred_date?: string;
}

export interface ConsultationResponse {
  id: number;
  client_name: string;
  email: string;
  phone: string;
  room_type: string;
  budget_range: string;
  style_preference?: string;
  notes?: string;
  preferred_date?: string;
  status: string;
  created_at: string;
}

export interface OrderItemRequest {
  product_id: number;
  quantity: number;
}

export interface OrderCheckoutRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  payment_method?: 'demo_card' | 'card' | 'cash' | 'bank_transfer' | 'fake_payment';
  notes?: string;
  items: OrderItemRequest[];
}

export interface OrderResponse {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at?: string;
  items?: Array<{
    id: number;
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ProductFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  sort?: 'latest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
  min_price?: number;
  max_price?: number;
  page?: number;
}

export interface CustomSample {
  id: string;
  dbId?: number;
  type: 'fitting' | 'sofa';
  titleEn: string;
  titleAr: string;
  tagline: string;
  roomCategory: string;
  roomCategoryLabel: string;
  categoryNameAr?: string;
  locationTag: string;
  photoUrl: string;
  detailPhotoUrl: string;
  priceSAR: number;
  priceUSD: number;
  advanceDepositSAR: number;
  advanceDepositUSD: number;
  saudiFeatures: string[];
  specs: {
    dimensions: string;
    finishOrFabric: string;
    coreMaterial: string;
    hardware: string;
  };
  configData: {
    finishId?: string;
    glassId?: string;
    heightInches?: number;
    widthInches?: number;
    gauge?: string;
    mullionStyle?: string;
    addons?: { [key: string]: boolean };
    layoutId?: string;
    fabricId?: string;
    legId?: string;
    seatDepth?: string;
    cushionCore?: string;
  };
}

export interface VillaDesignsResponse {
  success: boolean;
  data: CustomSample[];
  categories: Array<{ id: string; nameEn: string; nameAr: string }>;
}

