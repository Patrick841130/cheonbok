import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center justify-center 
                rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-slate-900
                ${isDark ? 'bg-[#334155]' : 'bg-gray-200'}
            `}
            role="switch"
            aria-checked={isDark}
        >
            <span className="sr-only">Toggle theme</span>

            <motion.span
                layout
                initial={false}
                animate={{
                    x: isDark ? 16 : -16
                }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30
                }}
                className={`
                    pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                `}
            >
                <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${isDark ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'}`}>
                    <Sun size={14} className="text-[#FF6F21]" />
                </span>
                <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${isDark ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'}`}>
                    <Moon size={14} className="text-[#3B82F6]" />
                </span>
            </motion.span>
        </button>
    );
}
