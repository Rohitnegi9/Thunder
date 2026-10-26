import { create } from 'zustand';
import api from '../lib/api.js';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  async restore() {
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  async signup(form) {
    const { data } = await api.post('/auth/signup', form);
    set({ user: data.user });
  },
  async login(form) {
    const { data } = await api.post('/auth/login', form);
    set({ user: data.user });
  },
  async logout() {
    await api.post('/auth/logout');
    set({ user: null });
  },
}));
