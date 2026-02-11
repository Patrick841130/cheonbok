import { useState, useEffect } from 'react';
import { useDataStore } from '../stores/dataStore';
import { cn } from '../lib/utils'; // Assumes utils.js exists

export default function Schedule() {
    // Initial state: load full object, but default view is 'basic' track
    const { schedule: fullSchedule, fetchSchedule } = useDataStore();
    const [activeTrack, setActiveTrack] = useState('basic');

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    if (!fullSchedule) return <div>Loading...</div>;

    const currentTrackSchedule = fullSchedule[activeTrack] || [];
    const currentSchedule = currentTrackSchedule[0];

    const tracks = [
        { id: 'basic', label: '기초훈련반 (Basic)' },
        { id: 'intermediate', label: '생도육성반 (Intermediate)' },
        { id: 'master', label: '장교임관반 (Master)' }
    ];

    return (
        <div className="py-20 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="px-4 py-1 rounded-full bg-red-100 text-primary text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                        Curriculum Info
                    </span>
                    <h2 className="text-4xl font-black text-slate-900 mb-4">강의 일정</h2>
                    <p className="text-slate-500 font-medium">실전 투자자를 위한 단계별 맞춤형 교육 로드맵</p>
                </div>

                {/* Track Selector */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-200 inline-flex">
                        {tracks.map(track => (
                            <button
                                key={track.id}
                                onClick={() => setActiveTrack(track.id)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                                    activeTrack === track.id
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {track.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Month Tabs Removed */}

                {/* Content Area */}
                {currentSchedule && (
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Schedule Image */}
                            {currentSchedule.image && (
                                <div className="lg:w-1/2">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                                        월간 시간표
                                    </h3>
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
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
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-slate-400 rounded-full"></span>
                                    주차별 상세 계획
                                </h3>
                                <div className="space-y-6">
                                    {currentSchedule.weeks && currentSchedule.weeks.length > 0 ? (
                                        currentSchedule.weeks.map((week, idx) => (
                                            <div key={idx} className="flex gap-5 group">
                                                <div className="flex-col items-center hidden sm:flex">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                                        {idx + 1}
                                                    </div>
                                                    {idx !== currentSchedule.weeks.length - 1 && (
                                                        <div className="w-0.5 h-full bg-slate-100 my-2 group-hover:bg-red-50 transition-colors"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:border-red-100 group-hover:bg-white transition-all shadow-sm group-hover:shadow-md">
                                                    <h4 className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                                                        {week.week}
                                                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Weekly Mission</span>
                                                    </h4>
                                                    <p className="text-slate-600 font-medium leading-relaxed">
                                                        {week.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 text-center py-10">등록된 상세 일정이 없습니다.</p>
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
