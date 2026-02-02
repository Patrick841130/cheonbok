import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';

export default function Instructors() {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        setInstructors(storage.getInstructors());
    }, []);

    return (
        <div className="bg-slate-900 py-24 min-h-screen text-white relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-sm font-bold text-primary mb-3 uppercase tracking-widest">Master Instructors</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6">최고의 교관진</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        현업 최전선에서 활동하는 전문가들이 당신의 트레이딩을 '코칭'합니다.
                    </p>
                </div>

                <div className="space-y-32">
                    {instructors.map((instructor, index) => (
                        <div key={instructor.id} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Image */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-[2rem] opacity-20"></div>
                                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] lg:aspect-[3/4] shadow-2xl">
                                    <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-10 lg:p-14">
                                        <h3 className="text-3xl font-black text-white mb-1">{instructor.name}</h3>
                                        <p className="text-primary font-bold tracking-wider uppercase">{instructor.title}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2">
                                <div className="w-20 h-1 bg-primary mb-8"></div>
                                <h4 className="text-2xl font-bold text-white mb-6">" {instructor.philosophy} "</h4>
                                <div className="space-y-8">
                                    <div>
                                        <h5 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-3">Professional Background</h5>
                                        <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
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
