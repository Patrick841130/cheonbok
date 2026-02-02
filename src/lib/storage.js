import { initialNews, initialInstructors, initialSchedule } from '../data/initialData';

const KEYS = {
    NEWS: 'cheonbok_news',
    INSTRUCTORS: 'cheonbok_instructors',
    SCHEDULE: 'cheonbok_schedule'
};

export const storage = {
    getNews: () => {
        const data = localStorage.getItem(KEYS.NEWS);
        return data ? JSON.parse(data) : initialNews;
    },
    saveNews: (news) => {
        localStorage.setItem(KEYS.NEWS, JSON.stringify(news));
    },

    getInstructors: () => {
        const data = localStorage.getItem(KEYS.INSTRUCTORS);
        return data ? JSON.parse(data) : initialInstructors;
    },
    saveInstructors: (instructors) => {
        localStorage.setItem(KEYS.INSTRUCTORS, JSON.stringify(instructors));
    },

    getSchedule: () => {
        const data = localStorage.getItem(KEYS.SCHEDULE);
        if (!data) return initialSchedule;

        try {
            const parsed = JSON.parse(data);
            // Validation: Check if it has the new structure keys (basic, intermediate, master)
            // If it's an array (old format), we return initialSchedule to force migration/reset
            if (Array.isArray(parsed) || !parsed.basic) {
                return initialSchedule;
            }
            return parsed;
        } catch (e) {
            return initialSchedule;
        }
    },
    saveSchedule: (schedule) => {
        localStorage.setItem(KEYS.SCHEDULE, JSON.stringify(schedule));
    },

    reset: () => {
        localStorage.clear();
        window.location.reload();
    }
};
