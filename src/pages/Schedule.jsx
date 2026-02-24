import { useState, useEffect } from 'react';
import { useDataStore } from '../stores/dataStore';
import { cn } from '../lib/utils'; // Assumes utils.js exists

export default function Schedule() {
    const { schedule: fullSchedule, fetchSchedule } = useDataStore();
    const [activeTrack, setActiveTrack] = useState('basic');

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    if (!fullSchedule) return <div className="text-center py-20 text-slate-500 dark:text-[#94A3B8]">Loading...</div>;

    const currentTrackSchedule = fullSchedule[activeTrack] || [];
    const currentSchedule = currentTrackSchedule[0];

    const tracks = [
        { id: 'basic', label: '기초훈련반 (Basic)' },
        { id: 'intermediate', label: '생도육성반 (Intermediate)' },
        { id: 'master', label: '장교임관반 (Master)' }
    ];

    return (
        <div className="py-20 bg-[#F8F8F8] dark:bg-[#0F172A] min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="px-4 py-1 rounded-full bg-red-100 dark:bg-primary/10 text-[#E60013] dark:text-primary text-xs font-bold uppercase tracking-wider mb-4 inline-block transition-colors">
                        Curriculum Info
                    </span>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 transition-colors">강의 일정</h2>
                    <p className="text-slate-500 dark:text-[#94A3B8] font-medium transition-colors">실전 투자자를 위한 단계별 맞춤형 교육 로드맵</p>
                </div>

                {/* Track Selector */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white dark:bg-[#1E293B] p-1.5 rounded-full shadow-sm border border-gray-200 dark:border-[#334155] inline-flex transition-colors">
                        {tracks.map(track => (
                            <button
                                key={track.id}
                                onClick={() => setActiveTrack(track.id)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                                    activeTrack === track.id
                                        ? "bg-[#E60013] dark:bg-primary text-white shadow-md"
                                        : "text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                {track.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                {currentSchedule && (
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200 dark:border-[#334155] animate-in fade-in zoom-in-95 duration-300 transition-colors">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Schedule Image */}
                            {currentSchedule.image && (
                                <div className="lg:w-1/2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
                                        <span className="w-2 h-8 bg-[#E60013] dark:bg-primary rounded-full transition-colors"></span>
                                        월간 시간표
                                    </h3>
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-[#334155] hover:shadow-2xl transition-all duration-300">
                                        <img
                                            src={currentSchedule.image}
                                            alt={`${currentSchedule.month} 시간표`}
                                            className="w-full h-auto object-cover hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Weekly Details */}
                            <div className={currentSchedule.image ? "lg:w-1/2" : "w-full"}>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
                                    <span className="w-2 h-8 bg-slate-300 dark:bg-[#94A3B8] rounded-full transition-colors"></span>
                                    주차별 상세 계획
                                </h3>
                                <div className="space-y-6">
                                    {currentSchedule.weeks && currentSchedule.weeks.length > 0 ? (
                                        currentSchedule.weeks.map((week, idx) => (
                                            <div key={idx} className="flex gap-5 group">
                                                <div className="flex-col items-center hidden sm:flex">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#334155] text-slate-500 dark:text-[#94A3B8] font-bold flex items-center justify-center text-sm group-hover:bg-[#E60013] dark:group-hover:bg-primary group-hover:text-white transition-colors">
                                                        {idx + 1}
                                                    </div>
                                                    {idx !== currentSchedule.weeks.length - 1 && (
                                                        <div className="w-0.5 h-full bg-slate-200 dark:bg-[#334155] my-2 group-hover:bg-red-200 dark:group-hover:bg-blue-500/20 transition-colors"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 bg-[#F8F8F8] dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-200 dark:border-[#334155] group-hover:border-red-300 dark:group-hover:border-primary/30 group-hover:bg-white dark:group-hover:bg-[#1E293B] transition-all shadow-sm group-hover:shadow-md">
                                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center justify-between transition-colors">
                                                        {week.week}
                                                        <span className="text-xs text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider font-semibold transition-colors">Weekly Mission</span>
                                                    </h4>
                                                    <p className="text-slate-600 dark:text-[#94A3B8] font-medium leading-relaxed transition-colors">
                                                        {week.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 dark:text-[#94A3B8] text-center py-10 transition-colors">등록된 상세 일정이 없습니다.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
