export const initialNews = [
    {
        id: 1,
        title: '제 3기 마스터 클래스 모집 시작',
        date: '2026-01-20',
        category: '공지사항',
        image: 'https://images.unsplash.com/photo-1621504450168-b8c437542054?auto=format&fit=crop&q=80&w=1000',
        content: '천복 웹3 사관학교 제 3기 마스터 클래스 모집이 시작되었습니다. 이번 기수는 15명 소수 정예로 운영됩니다.'
    },
    {
        id: 2,
        title: '비트코인 반감기 이후의 시장 전망 세미나',
        date: '2026-02-05',
        category: '특강',
        image: 'https://images.unsplash.com/photo-1518546305927-5a42099435d0?auto=format&fit=crop&q=80&w=1000',
        content: '반감기 이후 온체인 데이터의 변화와 시장 흐름을 분석하는 오픈 세미나가 개최됩니다.'
    }
];

export const initialInstructors = [
    {
        id: 1,
        name: '이상연',
        title: '총괄 교관 (Head Instructor)',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        bio: '전직 제도권 프랍 트레이더 출신. 10년 이상의 실전 트레이딩 경력과 온체인 데이터 분석의 권위자.',
        philosophy: '시장은 예측하는 것이 아니라 대응하는 것입니다. 데이터는 거짓말을 하지 않습니다.'
    },
    {
        id: 2,
        name: '정요천',
        title: '전술 교관 (Tactical Instructor)',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        bio: '암호화폐 1세대 트레이더. 차트 패턴 분석과 기술적 분석의 스페셜리스트.',
        philosophy: '차트 뒤에 숨겨진 인간의 심리를 읽어내야 합니다. 기술은 심리의 그림자입니다.'
    },
    {
        id: 3,
        name: '김태완',
        title: '멘탈 코치 (Mental Coach)',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
        bio: '금융 심리학 전문가. 수천 명의 트레이더 심리 상담 및 멘탈 케어 전담.',
        philosophy: '가장 강력한 적은 시장이 아니라 바로 당신 자신입니다. 평정심이 수익을 만듭니다.'
    }
];

export const initialSchedule = {
    basic: [
        {
            id: 'basic-feb',
            month: '1개월차',
            image: '/images/schedule_basic_feb.png',
            weeks: [
                { week: '1주차', desc: '선물 시장 구조 및 Bitget 완전 기초' },
                { week: '2주차', desc: '캔들 및 차트 기초' },
                { week: '3주차', desc: '손절, 익절 관리 및 리스크 관리' },
                { week: '4주차', desc: '실전매매 및 수료 평가' }
            ]
        },
        {
            id: 'basic-mar',
            month: '2개월차',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
            weeks: [
                { week: '1주차', desc: '선물 거래의 기초: 레버리지와 리스크 관리' },
                { week: '2주차', desc: '매매 일지 작성법 및 습관 형성' },
                { week: '3주차', desc: '단기 매매(스캘핑) 기초 전략' },
                { week: '4주차', desc: '기초 과정 종합 평가' }
            ]
        }
    ],
    intermediate: [
        {
            id: 'inter-feb',
            month: '1개월차',
            image: '/images/schedule_intermediate_feb.png',
            weeks: [
                { week: '1주차', desc: '시장 구조 및 흐름 읽기' },
                { week: '2주차', desc: '실전 진입 패턴 1, 2' },
                { week: '3주차', desc: '물타기, 분할, 레버리지 전략' },
                { week: '4주차', desc: '트레이딩 멘탈 관리 및 개인전략 완성' }
            ]
        },
        {
            id: 'inter-mar',
            month: '2개월차',
            image: 'https://images.unsplash.com/photo-1611974765270-ca125863436d?auto=format&fit=crop&q=80&w=1000',
            weeks: [
                { week: '1주차', desc: '거시 경제와 비트코인 상관관계 분석' },
                { week: '2주차', desc: '펀딩비 전략과 김치 프리미엄 차익거래' },
                { week: '3주차', desc: '멘탈 관리와 슬럼프 극복' },
                { week: '4주차', desc: '실전 계좌 운용 및 피드백' }
            ]
        }
    ],
    master: [
        {
            id: 'master-feb',
            month: '1개월차',
            image: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?auto=format&fit=crop&q=80&w=1000',
            weeks: [
                { week: '1주차', desc: '나만의 트레이딩 알고리즘 설계' },
                { week: '2주차', desc: '헤지펀드 운용 전략 벤치마킹' },
                { week: '3주차', desc: '고강도 실전 트레이딩 부트캠프' },
                { week: '4주차', desc: '트레이딩 심리학 마스터' }
            ]
        },
        {
            id: 'master-mar',
            month: '2개월차',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
            weeks: [
                { week: '1주차', desc: '자금 관리(Money Management)의 정수' },
                { week: '2주차', desc: '팀 트레이딩 및 리더십 훈련' },
                { week: '3주차', desc: '최종 수익률 경연 대회' },
                { week: '4주차', desc: '마스터 자격 부여 및 수료식' }
            ]
        }
    ]
};
