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

export interface ShuttersOption {
  id: string;
  name: string;
  description: string;
  price_delta: number;
}

export interface AluminumOption {
  id: string;
  name: string;
  badge?: string;
  thickness?: string;
  price_delta: number;
}

export interface GlassOption {
  id: string;
  name: string;
  tint?: string;
  specs?: string;
  price_delta: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  selected?: boolean;
}

export interface CustomizationOptions {
  min_price?: number;
  max_price?: number;
  default_height?: number;
  default_width?: number;
  min_height?: number;
  max_height?: number;
  min_width?: number;
  max_width?: number;
  measurement_unit?: 'cm' | 'mm' | 'inch' | string;
  shutters_options?: ShuttersOption[];
  aluminum_options?: AluminumOption[];
  glass_options?: GlassOption[];
  color_options?: ColorOption[];
  addons?: AddonOption[];
}

export interface Product {
  id: number;
  vendor_id?: number | null;
  category_id: number;
  category?: Category;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  product_type?: 'ready_made' | 'custom_fit';
  customization_options?: CustomizationOptions;
  price_min?: number;
  price_max?: number;
  price_range_formatted?: string;
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
  custom_specs?: Record<string, unknown>;
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

export interface OrderItemDetail {
  id: number;
  product_id?: number;
  product_name: string;
  price?: number;
  unit_price?: number;
  quantity: number;
  subtotal?: number;
  product?: Product;
  custom_specs?: {
    color_finish?: string;
    alloy_hex?: string;
    height?: number | string;
    width?: number | string;
    glass_type?: string;
    [key: string]: unknown;
  };
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
  title?: string;
  created_at?: string;
  items?: OrderItemDetail[];
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
  product_type?: string;
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
    gauge?: '1.5mm' | '2.0mm' | '2.5mm' | string;
    mullionStyle?: 'minimal' | 'grid_3x2' | 'single_cross' | string;
    addons?: { [key: string]: boolean };
    layoutId?: string;
    fabricId?: string;
    legId?: string;
    seatDepth?: 'standard' | 'deep_lounge' | string;
    cushionCore?: 'cloud_plush' | 'down_blend' | 'firm_foam' | string;
  };
}

export interface VillaDesignsResponse {
  success: boolean;
  data: CustomSample[];
  categories: Array<{ id: string; nameEn: string; nameAr: string }>;
}

