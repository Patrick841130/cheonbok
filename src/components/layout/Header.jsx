import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils'; // I need to create utils.js or just inline clsx functionality
import ThemeToggle from '../ThemeToggle';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: '홈', path: '/' },
        { name: '사관학교 소식', path: '/news' },
        { name: '강의 일정', path: '/schedule' },
        { name: '교관진 소개', path: '/instructors' },
    ];

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-[#0F172A]/95 backdrop-blur-lg border-b border-gray-200 dark:border-[#334155] z-50 h-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Cheonbok Logo" className="h-10 w-auto object-contain dark:invert dark:brightness-200" />
                        <span className="hidden sm:block text-sm font-bold text-slate-600 dark:text-[#94A3B8] group-hover:text-[#E60013] dark:group-hover:text-primary transition-colors">
                            웹3 사관학교
                        </span>
                    </Link>
                    <ThemeToggle />
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600 dark:text-[#94A3B8] items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`hover:text-black dark:hover:text-white transition-colors ${location.pathname === item.path ? 'text-[#E60013] dark:text-primary' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="https://forms.gle/UWHpkG7nHuPUzsZp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#E60013] dark:bg-primary hover:bg-[#c40010] dark:hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-500/30 dark:shadow-blue-500/25 hover:-translate-y-0.5 dark:glow-blue glow-red"
                    >
                        입교 신청
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800 dark:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-[#334155] shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 transition-colors duration-300">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`p-3 rounded-lg font-bold text-slate-600 dark:text-[#94A3B8] hover:bg-gray-100 dark:hover:bg-[#334155] hover:text-black dark:hover:text-white transition-colors ${location.pathname === item.path ? 'bg-red-50 dark:bg-blue-500/10 text-[#E60013] dark:text-primary' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="https://forms.gle/UWHpkG7nHuPUzsZp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#E60013] dark:bg-primary hover:bg-[#c40010] dark:hover:bg-blue-600 text-white px-5 py-3 rounded-lg text-center font-bold shadow-lg shadow-red-500/30 dark:shadow-blue-500/30 transition-colors"
                    >
                        입교 신청
                    </a>
                </div>
            )}
        </nav>
    );
}
