import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
}

// Safely read initial cached state in browser
const getInitialAuth = (): { user: AuthUser | null; token: string | null } => {
  if (typeof window !== 'undefined') {
    try {
      const savedToken = localStorage.getItem('latelier_token');
      const savedUser = localStorage.getItem('latelier_user');
      if (savedToken && savedUser) {
        return {
          token: savedToken,
          user: JSON.parse(savedUser),
        };
      }
    } catch {
      // Ignore storage errors
    }
  }
  return { user: null, token: null };
};

const initialAuth = getInitialAuth();

const initialState: AuthState = {
  user: initialAuth.user,
  token: initialAuth.token,
  isAuthenticated: !!initialAuth.token,
  isAuthModalOpen: false,
  authMode: 'login',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<'login' | 'register' | undefined>) => {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.authMode = action.payload;
      }
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    setAuthMode: (state, action: PayloadAction<'login' | 'register'>) => {
      state.authMode = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAuthModalOpen = false;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('latelier_token', action.payload.token);
          localStorage.setItem('latelier_user', JSON.stringify(action.payload.user));
        } catch {
          // Ignore
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('latelier_token');
          localStorage.removeItem('latelier_user');
        } catch {
          // Ignore
        }
      }
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthMode,
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
