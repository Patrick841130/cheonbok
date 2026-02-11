import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function Home() {
    const chartData = {
        labels: ['온체인분석', '리스크관리', '멘탈통제', '매매시스템', '시장대응'],
        datasets: [
            {
                label: '일반 개미',
                data: [20, 30, 40, 15, 25],
                backgroundColor: 'rgba(148, 163, 184, 0.2)', // Slate 400
                borderColor: '#94a3b8',
                borderWidth: 1,
                pointRadius: 0,
            },
            {
                label: '사관학교 수료생',
                data: [90, 95, 85, 95, 90],
                backgroundColor: 'rgba(230, 0, 19, 0.2)', // Red
                borderColor: '#E60013',
                borderWidth: 3,
                pointBackgroundColor: '#E60013',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                grid: { color: '#e2e8f0' },
                angleLines: { color: '#e2e8f0' },
                pointLabels: {
                    color: '#64748b',
                    font: { size: 12, weight: 'bold', family: "'Nunito Sans', sans-serif" },
                },
                ticks: { display: false, max: 100 },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#475569', font: { size: 12, family: "'Nunito Sans', sans-serif" } },
            },
        },
    };

    // Images - using files moved to public/images
    const thumbConsult = "/images/admission_consult_1769661772850.png";
    const thumbContract = "/images/admission_contract_1769661791356.png";
    const thumbPayment = "/images/admission_payment_1769661808093.png";
    const thumbIdCard = "/images/admission_idcard_1769661827883.png";
    const thumbTraining = "/images/admission_training_1769661844024.png";

    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        { step: 1, id: 'Consult', title: '상담 (Consult)', desc: '필수 정보 등록 및 개인정보 암호화 저장', image: thumbConsult },
        { step: 2, id: 'Contract', title: '계약 (Contract)', desc: '수강 계약서 작성 및 윤리 규정 서약', image: thumbContract },
        { step: 3, id: 'Payment', title: '결제 (Payment)', desc: '계약 기반 수강료 납부 (미납 시 수강 제한)', image: thumbPayment },
        { step: 4, id: 'ID Card', title: '발급 (ID Card)', desc: '정식 수강생 식별 ID 카드 발급', image: thumbIdCard },
        { step: 5, id: 'Training', title: '교육 (Training)', desc: '단계별 오프라인 집중 훈련 시작', image: thumbTraining }
    ];

    // Auto-cycle steps every 1.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 bg-black text-center overflow-hidden min-h-[85vh] flex flex-col justify-center items-center">
                {/* 3D Spline Background */}
                <div className="absolute inset-0 z-0">
                    <iframe
                        src="https://my.spline.design/40cryptocoinspackweb3library-p068FL9yIvVxXbmn0zHbgWyy/"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        style={{ pointerEvents: 'none' }}
                    ></iframe>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 bg-[#FF6F21] rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">제 3기 마스터 클래스 모집 중</span>
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                        웹3 <span className="text-primary">AI 금융시대</span>.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                            당신은 준비되셨습니까?
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        당신은 선택하는 사람인가?<br />
                        아니면 선택당하는 사람인가?<br /><br />
                        결정하는 힘은<br />
                        미래의 나에게 남겨주는 가치 있는 선물!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <Link
                            to="/schedule"
                            className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition shadow-xl"
                        >
                            커리큘럼 확인
                        </Link>
                        <Link
                            to="/news"
                            className="px-8 py-4 bg-primary hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-600/30 transition transform hover:-translate-y-1"
                        >
                            소식 보기
                        </Link>
                    </div>
                </div>
            </section>

            {/* Concept Section */}
            <section id="concept" className="py-28 bg-[#F8F8F8] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-sm font-bold text-primary mb-3 uppercase tracking-widest">Core Philosophy</h2>
                            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8 leading-tight">
                                Leading이 아닌 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">Coaching</span>으로 완성된다.
                            </h3>
                            <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                                의존을 끊고, 판단을 갖추다.<br />
                                실전에서 살아남는 투자자의 기준.
                            </p>

                            <div className="space-y-4">
                                {/* Card 1 */}
                                <div className="group flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-red-100 shadow-sm hover:shadow-lg transition duration-300">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition">
                                        🚫
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">기존 리딩방 (Parasitic)</h4>
                                        <p className="text-sm text-slate-500 mt-1">타인의 신호에만 의존하며 판단력을 상실하는 수동적 매매.</p>
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="group flex gap-5 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                                    <div className="absolute right-0 top-0 w-32 h-32 bg-primary opacity-10 blur-[50px] rounded-full pointer-events-none"></div>
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition">
                                        🛡️
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-white text-lg">천복 사관학교 (Tactical)</h4>
                                        <p className="text-sm text-slate-400 mt-1">데이터 기반의 가설 수립과 교관의 피드백을 통한 독립적 매매.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative">
                            <div className="hidden md:block absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                            <h3 className="text-sm font-bold text-slate-400 mb-6 text-center uppercase tracking-widest">Graduate Competency Target</h3>
                            <div className="relative z-10 w-full h-[350px]">
                                <Radar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary mb-3 uppercase tracking-widest">Training Method</h2>
                        <h3 className="text-3xl font-black text-slate-900">3가지 핵심 원칙</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { id: '01', title: 'No Signal Policy', desc: "종목 추천은 없습니다. 우리는 오직 '보는 눈'을 이식합니다. 근거 없는 매매는 즉시 중단됩니다." },
                            { id: '02', title: 'Logical Violence', desc: "교관은 당신의 가설을 처절하게 검증합니다. 논리적 허점이 파괴된 자리에서 진짜 실력이 자라납니다." },
                            { id: '03', title: 'Data-Driven', desc: "뇌피셜이 아닌 온체인 데이터로 말합니다. 세력의 자금 흐름을 추적하여 승률을 극대화합니다." }
                        ].map((item) => (
                            <div key={item.id} className="p-10 rounded-2xl bg-[#F8F8F8] border border-gray-100 hover:bg-white hover:border-red-100 transition duration-300 card-hover group">
                                <div className="text-5xl font-black text-slate-200 mb-6 group-hover:text-red-100 transition">{item.id}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">투명하고 체계적인 5단계 입학 절차</h2>
                        <p className="text-slate-500">정해진 절차에 따라 엄격하게 선발되고 관리됩니다.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Step List */}
                        <div className="space-y-4 relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-slate-100 z-0"></div>

                            {steps.map((item) => (
                                <div
                                    key={item.step}
                                    className={`relative z-10 flex gap-6 p-4 rounded-2xl transition ${activeStep === item.step ? 'bg-red-50/50' : ''}`}
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-sm transition-all duration-300 ${activeStep === item.step ? 'bg-primary text-white scale-110 shadow-lg ring-4 ring-red-100' : 'bg-white border-2 border-slate-100 text-slate-400'}`}>
                                        {item.step}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className={`font-bold text-lg mb-1 transition-colors ${activeStep === item.step ? 'text-primary' : 'text-slate-900'}`}>
                                            {item.title}
                                        </h4>
                                        <p className={`text-sm transition-colors ${activeStep === item.step ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right: Dynamic Image Display */}
                        <div className="relative h-[500px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                            {steps.map((item) => (
                                <div
                                    key={item.step}
                                    className={`absolute inset-0 transition-opacity duration-500 ${activeStep === item.step ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                        <div>
                                            <div className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Step 0{item.step}</div>
                                            <h3 className="text-white text-2xl font-black">{item.title.split('(')[0]}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Fallback/Overlay effects could go here */}
                            <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
