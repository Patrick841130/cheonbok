export default function Footer() {
    return (
        <footer className="py-24 bg-slate-950 text-white relative overflow-hidden mt-auto">
            {/* Footer Ornament */}
            <div
                className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none">
            </div>

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-2xl sm:text-4xl font-black mb-10 leading-tight">
                    "당신은 리더입니까,<br /> 아니면 추종자입니까?"
                </h2>
                <div
                    className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-3xl mb-12 border border-gray-800 shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-2">웹3 사관학교 입교 신청</h3>
                    <p className="text-sm text-gray-400 mb-8">성공적인 투자는 올바른 교육에서 시작됩니다.</p>
                    <a
                        href="https://forms.gle/UWHpkG7nHuPUzsZp6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-primary hover:bg-red-700 text-white py-5 rounded-xl font-black text-lg transition-all shadow-lg transform hover:scale-[1.01]"
                    >
                        얼리버드 신청서 작성하기
                    </a>
                </div>

                <div className="text-gray-600 text-xs flex flex-col items-center gap-4">
                    <div className="flex gap-6">
                        <span className="hover:text-gray-400 cursor-pointer">이용약관</span>
                        <span className="hover:text-gray-400 cursor-pointer">개인정보처리방침</span>
                        <span className="hover:text-gray-400 cursor-pointer">오시는 길</span>
                        {/* Admin Link Secret */}
                        <a href="/admin" className="hover:text-gray-400 cursor-pointer">관리자</a>
                    </div>
                    <p className="text-gray-500 font-medium">
                        웹3 사관학교 ㅣ 상호명 : 주식회사 엘케이브라더스 ㅣ 대표자 : 이 상 연
                    </p>
                    <p>&copy; 2026 CHEONBOK WEB3 ACADEMY. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
