import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils'; // I need to create utils.js or just inline clsx functionality

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

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
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50 h-20">
            <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">
                    웹3 사관학교
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="https://forms.gle/UWHpkG7nHuPUzsZp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-900/10 hover:-translate-y-0.5"
                    >
                        입교 신청
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`p-3 rounded-lg font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors ${location.pathname === item.path ? 'bg-red-50 text-primary' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="https://forms.gle/UWHpkG7nHuPUzsZp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-red-700 text-white px-5 py-3 rounded-lg text-center font-bold shadow-lg"
                    >
                        입교 신청
                    </a>
                </div>
            )}
        </nav>
    );
}
