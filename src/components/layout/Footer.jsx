export default function Footer() {
    return (
        <footer className="py-24 bg-slate-950 dark:bg-[#0B1120] text-white relative overflow-hidden mt-auto transition-colors duration-300">
            {/* Footer Ornament */}
            <div
                className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-900/20 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-300"></div>

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-2xl sm:text-4xl font-black mb-10 leading-tight">
                    "당신은 선택하는 사람인가?<br /> 아니면 선택당하는 사람인가?"
                </h2>
                <div
                    className="bg-gradient-to-br from-gray-800 dark:from-[#1E293B] to-black dark:to-[#0F172A] p-8 rounded-3xl mb-12 border border-gray-800 dark:border-[#334155] shadow-2xl transition-colors duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">웹3 사관학교 입교 신청</h3>
                    <p className="text-sm text-gray-400 dark:text-[#94A3B8] mb-8 transition-colors">성공적인 투자는 올바른 교육에서 시작됩니다.</p>
                    <a
                        href="https://forms.gle/UWHpkG7nHuPUzsZp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#E60013] dark:bg-primary hover:bg-[#c40010] dark:hover:bg-blue-600 text-white py-5 rounded-xl font-black text-lg transition-all shadow-lg transform hover:scale-[1.01] dark:glow-blue"
                    >
                        얼리버드 신청서 작성하기
                    </a>
                </div>

                <div className="text-gray-600 dark:text-[#475569] text-xs flex flex-col items-center gap-4 transition-colors duration-300">
                    <div className="flex gap-6">
                        <span className="hover:text-gray-400 dark:hover:text-[#94A3B8] cursor-pointer transition-colors">이용약관</span>
                        <span className="hover:text-gray-400 dark:hover:text-[#94A3B8] cursor-pointer transition-colors">개인정보처리방침</span>
                        <span className="hover:text-gray-400 dark:hover:text-[#94A3B8] cursor-pointer transition-colors">오시는 길</span>
                        {/* Admin Link Secret */}
                        <a href="/admin" className="hover:text-gray-400 dark:hover:text-[#94A3B8] cursor-pointer transition-colors">관리자</a>
                    </div>
                    <p className="text-gray-500 dark:text-[#64748B] font-medium transition-colors">
                        웹3 사관학교 ㅣ 상호명 : 주식회사 엘케이브라더스 ㅣ 대표자 : 이 상 연
                    </p>
                    <p>&copy; 2026 WEB3 ACADEMY. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
