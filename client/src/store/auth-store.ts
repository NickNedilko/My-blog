import { create } from 'zustand';
import { User } from '../types';

export interface AuthState {
  user: Partial<User> | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: Partial<User>) => void;
  setToken: (token: string) => void;
  setLoggedIn: () => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  setUser: (user: Partial<User>) => set({ user }),
  setToken: (token: string) => set({ token }),
  setLoggedIn: () => set({ isLoggedIn: true }),
  login: (token: string) => {
    localStorage.setItem('authToken', token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    set({ user: null, token: null, isLoggedIn: false });
    localStorage.removeItem('authToken');
  },
}));
