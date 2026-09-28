import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      state.isDrawerOpen = true;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },

    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.product.id !== productId);
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleDrawer,
  setDrawerOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
