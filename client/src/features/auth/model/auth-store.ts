import { create } from 'zustand';
import { User } from '../../../shared/types';

export interface AuthState {
  user: Partial<User> | null;
  isLoggedIn: boolean;
  setUser: (user: Partial<User>) => void;
  setLoggedIn: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isRefreshing: false,
  setUser: (user: Partial<User>) => set({ user }),
  setLoggedIn: () => set({ isLoggedIn: true }),

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },
}));
