import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Currency = 'SAR' | 'USD';

interface UiState {
  currency: Currency;
  isConsultationModalOpen: boolean;
  selectedRoomType?: string;
  mobileMenuOpen: boolean;
  isTrackingModalOpen: boolean;
  trackingOrderNumber?: string;
}

const initialState: UiState = {
  currency: 'SAR',
  isConsultationModalOpen: false,
  selectedRoomType: undefined,
  mobileMenuOpen: false,
  isTrackingModalOpen: false,
  trackingOrderNumber: undefined,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
    toggleCurrency: (state) => {
      state.currency = state.currency === 'SAR' ? 'USD' : 'SAR';
    },
    openConsultationModal: (state, action: PayloadAction<string | undefined>) => {
      state.isConsultationModalOpen = true;
      state.selectedRoomType = action.payload;
    },
    closeConsultationModal: (state) => {
      state.isConsultationModalOpen = false;
      state.selectedRoomType = undefined;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    openTrackingModal: (state, action: PayloadAction<string | undefined>) => {
      state.isTrackingModalOpen = true;
      state.trackingOrderNumber = action.payload;
    },
    closeTrackingModal: (state) => {
      state.isTrackingModalOpen = false;
      state.trackingOrderNumber = undefined;
    },
  },
});

export const {
  setCurrency,
  toggleCurrency,
  openConsultationModal,
  closeConsultationModal,
  toggleMobileMenu,
  setMobileMenuOpen,
  openTrackingModal,
  closeTrackingModal,
} = uiSlice.actions;

export default uiSlice.reducer;

