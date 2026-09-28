import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isConsultationModalOpen: boolean;
  selectedRoomType?: string;
  mobileMenuOpen: boolean;
  isTrackingModalOpen: boolean;
  trackingOrderNumber?: string;
}

const initialState: UiState = {
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
  openConsultationModal,
  closeConsultationModal,
  toggleMobileMenu,
  setMobileMenuOpen,
  openTrackingModal,
  closeTrackingModal,
} = uiSlice.actions;

export default uiSlice.reducer;
