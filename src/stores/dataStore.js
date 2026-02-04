import { create } from 'zustand';
import { newsApi, instructorsApi, scheduleApi } from '../lib/api';
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
        let savedItem = { ...item, id };
        try {
            const result = await newsApi.update(id, item);
            savedItem = result;
        } catch (e) {
            // If update fails (doesn't exist), try to create
            try {
                const created = await newsApi.create(item);
                savedItem = { ...item, id: created.id };
            } catch (createErr) {
                // Both failed, keep original
            }
        }
        set((state) => ({
            news: state.news.map((n) => (n.id === id ? savedItem : n)),
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
    fetchSchedule: async () => {
        try {
            const data = await scheduleApi.getAll();
            // If API returns data with items, use it
            const hasData = data && (data.basic?.length > 0 || data.intermediate?.length > 0 || data.master?.length > 0);
            if (hasData) {
                set({ schedule: data });
            } else {
                const localData = storage.getSchedule();
                set({ schedule: localData });
            }
        } catch (e) {
            const localData = storage.getSchedule();
            set({ schedule: localData });
        }
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

    saveSchedule: async () => {
        const { schedule } = get();
        try {
            // Save each track's items to API
            for (const track of ['basic', 'intermediate', 'master']) {
                for (const item of schedule[track] || []) {
                    try {
                        await scheduleApi.update(item.id, { ...item, track });
                    } catch {
                        try {
                            await scheduleApi.create({ ...item, track });
                        } catch {
                            // Continue if fails
                        }
                    }
                }
            }
        } catch (e) {
            // Fallback to localStorage
        }
        storage.saveSchedule(schedule);
    },
}));
