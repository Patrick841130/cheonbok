import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../lib/api';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (username, password) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await authApi.login(username, password);
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return true;
                } catch (err) {
                    set({ error: err.message, isLoading: false });
                    return false;
                }
            },

            logout: () => {
                authApi.logout();
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            verifyToken: async () => {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    set({ isAuthenticated: false });
                    return false;
                }

                try {
                    const result = await authApi.verify();
                    if (result.valid) {
                        set({ user: result.user, isAuthenticated: true });
                        return true;
                    }
                } catch (e) {
                    // Token invalid
                }

                set({ isAuthenticated: false, user: null, token: null });
                localStorage.removeItem('authToken');
                return false;
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);
