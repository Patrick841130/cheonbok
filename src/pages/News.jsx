import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDataStore } from '../stores/dataStore';
import { ChevronRight, Calendar } from 'lucide-react';

export function NewsList() {
    const { news, fetchNews } = useDataStore();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 transition-colors duration-300">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-[#E60013] dark:text-primary mb-3 uppercase tracking-widest transition-colors">Web3 Academy News</h2>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">사관학교 소식</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="group bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#334155] shadow-sm hover:shadow-xl hover:shadow-red-500/5 dark:hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                        <div className="h-48 overflow-hidden bg-slate-100 dark:bg-[#334155] relative transition-colors">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            <div className="absolute top-4 left-4 bg-[#E60013] dark:bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors">
                                {item.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-[#94A3B8] text-xs font-bold mb-3 transition-colors">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#E60013] dark:group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-slate-600 dark:text-[#94A3B8] text-sm line-clamp-3 mb-6 leading-relaxed transition-colors">
                                {item.content}
                            </p>
                            <div className="flex items-center text-[#E60013] dark:text-primary text-sm font-bold group-hover:gap-2 transition-all">
                                Read More <ChevronRight size={16} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function NewsDetail() {
    const { id } = useParams();
    const { news, fetchNews } = useDataStore();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const article = news.find(n => n.id === parseInt(id) || n.id === id);

    if (!article) return <div className="text-center py-40 text-slate-500 dark:text-[#94A3B8] transition-colors">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 transition-colors duration-300">
            <Link to="/news" className="inline-flex items-center text-slate-500 dark:text-[#94A3B8] hover:text-[#E60013] dark:hover:text-primary font-bold text-sm mb-8 transition-colors">
                <ChevronRight className="rotate-180 mr-1" size={16} /> Back to News
            </Link>

            <div className="mb-8">
                <span className="text-[#E60013] dark:text-primary font-bold text-sm tracking-wider uppercase mb-2 block transition-colors">{article.category}</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight transition-colors">{article.title}</h1>
                <div className="flex items-center gap-2 text-slate-500 dark:text-[#94A3B8] font-medium transition-colors">
                    <Calendar size={18} />
                    <span>{article.date}</span>
                </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border border-gray-200 dark:border-[#334155] transition-colors">
                <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto max-w-none transition-colors duration-300 text-slate-700 dark:text-[#CBD5E1]">
                <p className="whitespace-pre-line leading-8">
                    {article.content}
                </p>
            </div>
        </div>
    );
}
