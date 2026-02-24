import { useEffect } from 'react';
import { useDataStore } from '../stores/dataStore';

export default function Instructors() {
    const { instructors, fetchInstructors } = useDataStore();

    useEffect(() => {
        fetchInstructors();
    }, [fetchInstructors]);

    return (
        <div className="bg-white dark:bg-[#0F172A] py-24 min-h-screen text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500 dark:bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500 dark:bg-cyan-500 opacity-5 blur-[100px] rounded-full pointer-events-none transition-colors"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-sm font-bold text-[#E60013] dark:text-primary mb-3 uppercase tracking-widest transition-colors">Master Instructors</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 transition-colors">최고의 교관진</h3>
                    <p className="text-slate-500 dark:text-[#94A3B8] max-w-2xl mx-auto text-lg transition-colors">
                        현업 최전선에서 활동하는 전문가들이 당신의 트레이딩을 '코칭'합니다.
                    </p>
                </div>

                <div className="space-y-32">
                    {instructors.map((instructor, index) => (
                        <div key={instructor.id} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Image */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute inset-0 bg-[#E60013] dark:bg-primary translate-x-4 translate-y-4 rounded-[2rem] opacity-10 dark:opacity-20 transition-colors"></div>
                                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] lg:aspect-[3/4] shadow-2xl bg-slate-50 dark:bg-transparent transition-colors">
                                    <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 dark:from-[#0F172A]/90 to-transparent p-10 lg:p-14 transition-colors">
                                        <h3 className="text-3xl font-black text-white mb-1">{instructor.name}</h3>
                                        <p className="text-[#E60013] dark:text-primary font-bold tracking-wider uppercase transition-colors">{instructor.title}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2 bg-[#F8F8F8] dark:bg-transparent p-10 rounded-3xl border border-gray-100 dark:border-none shadow-sm dark:shadow-none transition-colors">
                                <div className="w-20 h-1 bg-[#E60013] dark:bg-primary mb-8 transition-colors"></div>
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">" {instructor.philosophy} "</h4>
                                <div className="space-y-8">
                                    <div>
                                        <h5 className="text-slate-400 dark:text-[#94A3B8] font-bold uppercase tracking-wider text-xs mb-3 transition-colors">Professional Background</h5>
                                        <p className="text-slate-600 dark:text-[#CBD5E1] leading-relaxed text-lg whitespace-pre-line transition-colors">
                                            {instructor.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
