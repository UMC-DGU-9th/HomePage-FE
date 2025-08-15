import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  position: relative;
  width: 100vw;
  min-height: 120vh;
  padding: 14vh 0 16vh;
  background: radial-gradient(1000px 700px at 30% 10%, rgba(0,255,221,0.06), transparent 60%), var(--bg-base);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 94%, rgba(0,0,0,0));
`;

const Container = styled.div`
  width: min(1200px, 92vw);
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  color: #e6fff9;
  font-size: 2.6rem;
  text-align: center;
`;

const Sub = styled.p`
  margin: 0 0 28px 0;
  color: #9fb3c8;
  text-align: center;
`;

const Tabs = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 6px;
`;

const Tab = styled.button`
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: ${props => (props.$active ? '#001314' : '#cfe9e4')};
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: color 0.25s ease;
`;

const Indicator = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  height: 44px;
  width: calc((100% - 12px - 5 * 8px) / 6);
  border-radius: 10px;
  background: linear-gradient(90deg, #00ffdd, #00a2ff);
  box-shadow: 0 10px 30px rgba(0,255,221,0.18);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
`;

const ContentWrap = styled.div`
  margin-top: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media (max-width: 960px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  position: relative;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  padding: 18px 18px 18px 64px;
  color: #dff8f3;
  min-height: 92px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,255,221,0.12); }
`;

const Week = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(0,255,221,0.18);
  color: #001314;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 24px rgba(0,255,221,0.22);
`;

const CardTitle = styled.h3`
  margin: 0 0 6px 0;
  font-size: 1.05rem;
  color: #e6fff9;
`;

const CardDesc = styled.p`
  margin: 0;
  color: #a9c3c1;
  line-height: 1.5;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  color: #86a7a3;
  font-size: 0.92rem;
`;

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.color || '#00ffdd'};
  box-shadow: 0 0 10px ${p => p.color || '#00ffdd'}55;
`;

function CurriculumSection() {
  const tabs = useMemo(() => (
    ['iOS', 'Android', 'Web', 'Server', 'PM', 'Design']
  ), []);

  const data = useMemo(() => ({
    iOS: [
      { t: 'Swift 기초 · Xcode', d: '문법/옵셔널/컬렉션 · Xcode 프로젝트 구조' },
      { t: 'UIKit 레이아웃', d: 'AutoLayout, StackView, TableView' },
      { t: '네트워킹', d: 'URLSession, REST, 비동기/Combine 맛보기' },
      { t: '상태관리', d: 'MVVM, Coordinator 패턴' },
      { t: 'SwiftUI 입문', d: 'Declarative UI, NavigationStack' },
      { t: '프로덕트 실습', d: '실전 앱 구조 설계 & 배포 파이프라인' },
    ],
    Android: [
      { t: 'Kotlin 기초', d: 'Null-safety, Coroutines' },
      { t: 'Compose UI', d: '레이아웃/상태/네비게이션' },
      { t: '네트워킹', d: 'Retrofit, OkHttp, Flow' },
      { t: '아키텍처', d: 'MVVM, Hilt DI' },
      { t: '테스트', d: 'Unit/UI 테스트' },
      { t: '프로덕트 실습', d: '실전 앱 구조 설계 & Play 배포' },
    ],
    Web: [
      { t: 'HTML/CSS/JS', d: '시맨틱/반응형/ESNext' },
      { t: 'React 기본', d: '컴포넌트/상태/라우팅' },
      { t: '상태관리', d: 'Context/Zustand/Redux 중 택1' },
      { t: 'API/데이터', d: 'React Query, 에러/로딩 전략' },
      { t: '성능/애니', d: 'Code-splitting, GSAP/Framer' },
      { t: '프로덕트 실습', d: '실전 배포(Vercel) & 접근성' },
    ],
    Server: [
      { t: '언어/프레임워크', d: 'Node/Nest or Spring 중 택1' },
      { t: 'DB/ORM', d: 'RDB 기초, Prisma/JPA' },
      { t: 'REST/Swagger', d: 'API 설계/문서화' },
      { t: '인증/보안', d: 'JWT, 세션, CORS' },
      { t: '배포', d: 'Docker, CI/CD' },
      { t: '프로덕트 실습', d: '실전 운영/로깅/모니터링' },
    ],
    PM: [
      { t: '문제정의', d: 'JTBD, 페르소나' },
      { t: '가설/실험', d: 'MVP, 실험 설계' },
      { t: 'UX 흐름', d: '플로우/IA/스토리보드' },
      { t: '우선순위', d: 'RICE/Impact Effort' },
      { t: '데이터', d: '메트릭/분석/리텐션' },
      { t: '런치', d: '릴리즈/회고/로드맵' },
    ],
    Design: [
      { t: 'Foundations', d: '타이포/컬러/그리드' },
      { t: 'Figma', d: '컴포넌트/오토레이아웃' },
      { t: '인터랙션', d: '모션/마이크로 인터랙션' },
      { t: '디자인시스템', d: '토큰/모듈러 스케일' },
      { t: '핸드오프', d: '개발 협업/어노테이션' },
      { t: '프로덕트 실습', d: '실전 디자인/프로토타이핑' },
    ],
  }), []);

  const [active, setActive] = useState(0);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.curri-card',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
  }, [active]);

  const indicatorStyle = useMemo(() => ({ transform: `translateX(calc(${active} * (100% + 8px)))` }), [active]);
  const key = tabs[active];
  const weeks = data[key];

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>파트별 커리큘럼</Title>
        <Sub>실전 중심 로드맵으로, 6주 만에 프로덕트 레벨에 도달합니다.</Sub>

        <Tabs>
          <Indicator style={indicatorStyle} />
          {tabs.map((t, i) => (
            <Tab key={t} $active={i === active} onClick={() => setActive(i)}>{t}</Tab>
          ))}
        </Tabs>

        <ContentWrap ref={contentRef}>
          <Grid>
            {weeks.map((w, i) => (
              <Card className="curri-card" key={`${key}-${i}`}>
                <Week>{i + 1}</Week>
                <CardTitle>{w.t}</CardTitle>
                <CardDesc>{w.d}</CardDesc>
              </Card>
            ))}
          </Grid>

          <Legend>
            <span><Dot color="#00ffdd" /> 핵심</span>
            <span><Dot color="#00a2ff" /> 실습</span>
            <span><Dot color="#ffd166" /> 팀 협업</span>
          </Legend>
        </ContentWrap>
      </Container>
    </Section>
  );
}

export default CurriculumSection;


