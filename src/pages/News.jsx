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
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-primary mb-3 uppercase tracking-widest">Web3 Academy News</h2>
                <h3 className="text-4xl font-black text-slate-900">사관학교 소식</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="h-48 overflow-hidden bg-gray-100 relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {item.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-3">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                                {item.content}
                            </p>
                            <div className="flex items-center text-primary text-sm font-bold group-hover:gap-2 transition-all">
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

    if (!article) return <div className="text-center py-40">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <Link to="/news" className="inline-flex items-center text-slate-500 hover:text-primary font-bold text-sm mb-8 transition-colors">
                <ChevronRight className="rotate-180 mr-1" size={16} /> Back to News
            </Link>

            <div className="mb-8">
                <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block">{article.category}</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{article.title}</h1>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Calendar size={18} />
                    <span>{article.date}</span>
                </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
                <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>

            <div className="prose prose-lg prose-slate mx-auto max-w-none">
                <p className="whitespace-pre-line text-slate-700 leading-8">
                    {article.content}
                </p>
            </div>
        </div>
    );
}
