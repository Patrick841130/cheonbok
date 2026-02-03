import { create } from 'zustand';
import { newsApi, instructorsApi } from '../lib/api';
import { storage } from '../lib/storage';

export const useDataStore = create((set, get) => ({
    // News
    news: [],
    newsLoading: false,
    newsError: null,

    // Instructors
    instructors: [],
    instructorsLoading: false,
    instructorsError: null,

    // Schedule (localStorage only for now)
    schedule: null,

    // News actions
    fetchNews: async () => {
        set({ newsLoading: true, newsError: null });
        try {
            const data = await newsApi.getAll();
            // If API returns empty, use localStorage
            if (data && data.length > 0) {
                set({ news: data, newsLoading: false });
            } else {
                const localData = storage.getNews();
                set({ news: localData, newsLoading: false });
            }
        } catch (e) {
            // Fallback to localStorage
            const localData = storage.getNews();
            set({ news: localData, newsLoading: false });
        }
    },

    addNews: async (item) => {
        try {
            const created = await newsApi.create(item);
            set((state) => ({ news: [{ ...item, id: created.id }, ...state.news] }));
            storage.saveNews(get().news);
            return true;
        } catch (e) {
            const newItem = { ...item, id: Date.now() };
            set((state) => ({ news: [newItem, ...state.news] }));
            storage.saveNews(get().news);
            return true;
        }
    },

    updateNews: async (id, item) => {
        try {
            await newsApi.update(id, item);
        } catch (e) {
            // Fallback continues
        }
        set((state) => ({
            news: state.news.map((n) => (n.id === id ? { ...item, id } : n)),
        }));
        storage.saveNews(get().news);
    },

    deleteNews: async (id) => {
        try {
            await newsApi.delete(id);
        } catch (e) {
            // Fallback continues
        }
        set((state) => ({ news: state.news.filter((n) => n.id !== id) }));
        storage.saveNews(get().news);
    },

    // Instructors actions
    fetchInstructors: async () => {
        set({ instructorsLoading: true, instructorsError: null });
        try {
            const data = await instructorsApi.getAll();
            // If API returns empty, use localStorage
            if (data && data.length > 0) {
                set({ instructors: data, instructorsLoading: false });
            } else {
                const localData = storage.getInstructors();
                set({ instructors: localData, instructorsLoading: false });
            }
        } catch (e) {
            const localData = storage.getInstructors();
            set({ instructors: localData, instructorsLoading: false });
        }
    },

    updateInstructor: (id, field, value) => {
        set((state) => ({
            instructors: state.instructors.map((inst) =>
                inst.id === id ? { ...inst, [field]: value } : inst
            ),
        }));
    },

    saveInstructors: async () => {
        const { instructors } = get();
        const savedInstructors = [];

        try {
            for (const inst of instructors) {
                // Try to update first
                try {
                    await instructorsApi.update(inst.id, inst);
                    savedInstructors.push(inst);
                } catch (updateError) {
                    // If update fails (doesn't exist), create new
                    try {
                        const created = await instructorsApi.create(inst);
                        savedInstructors.push({ ...inst, id: created.id });
                    } catch (createError) {
                        // If both fail, keep original
                        savedInstructors.push(inst);
                    }
                }
            }
            // Update state with new IDs from server
            if (savedInstructors.length > 0) {
                set({ instructors: savedInstructors });
            }
        } catch (e) {
            // Fallback to localStorage
        }
        storage.saveInstructors(get().instructors);
    },

    // Schedule actions
    fetchSchedule: () => {
        const data = storage.getSchedule();
        set({ schedule: data });
    },

    updateSchedule: (track, index, field, value) => {
        set((state) => {
            const updatedTrack = [...state.schedule[track]];
            updatedTrack[index] = { ...updatedTrack[index], [field]: value };
            return {
                schedule: { ...state.schedule, [track]: updatedTrack },
            };
        });
    },

    saveSchedule: () => {
        storage.saveSchedule(get().schedule);
    },
}));
