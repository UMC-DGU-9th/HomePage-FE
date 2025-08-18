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
  
  @media (max-width: 768px) {
    min-height: 100vh;
    padding: 10vh 0 12vh;
  }
`;

const Container = styled.div`
  width: min(1200px, 92vw);
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  color: #e6fff9;
  font-size: 2.6rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0 0 8px 0;
  }
`;

const Sub = styled.p`
  margin: 0 0 28px 0;
  color: #9fb3c8;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin: 0 0 24px 0;
    line-height: 1.4;
  }
`;

const Tabs = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 6px;
  
  @media (max-width: 768px) {
    gap: 4px;
    padding: 4px;
    flex-wrap: nowrap;
    overflow-x: auto;
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    /* 스크롤 스냅 */
    scroll-snap-type: x mandatory;
  }
`;

const Tab = styled.button`
  height: 44px;
  min-width: 70px;
  flex: 1;
  border: 0;
  border-radius: 10px;
  background: ${props => (props.$active ? 'linear-gradient(90deg, #00ffdd, #00a2ff)' : 'transparent')};
  color: ${props => (props.$active ? '#001314' : '#cfe9e4')};
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 0.25s ease;
  white-space: nowrap;
  padding: 0 8px;
  box-shadow: ${props => (props.$active ? '0 8px 25px rgba(0,255,221,0.25)' : 'none')};
  
  &:hover {
    background: ${props => (props.$active ? 'linear-gradient(90deg, #00ffdd, #00a2ff)' : 'rgba(255,255,255,0.08)')};
    transform: ${props => (props.$active ? 'none' : 'translateY(-1px)')};
  }
  
  @media (max-width: 768px) {
    height: 40px;
    min-width: 80px;
    flex: 0 0 auto;
    font-size: 0.9rem;
    padding: 0 12px;
    scroll-snap-align: start;
  }
`;

const ContentWrap = styled.div`
  margin-top: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 960px) { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 14px;
  }
  
  @media (max-width: 620px) { 
    grid-template-columns: 1fr; 
    gap: 12px;
  }
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
  
  // &:hover { 
  //   transform: translateY(-4px); 
  //   box-shadow: 0 16px 40px rgba(0,255,221,0.12); 
  // }
  
  @media (max-width: 768px) {
    padding: 16px 16px 16px 56px;
    min-height: 80px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 14px 14px 52px;
    min-height: 76px;
  }
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
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    left: 12px;
    top: 12px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    left: 10px;
    top: 10px;
    font-size: 0.85rem;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 6px 0;
  font-size: 1.05rem;
  color: #e6fff9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 5px 0;
  }
`;

const CardDesc = styled.p`
  margin: 0;
  color: #a9c3c1;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;



function CurriculumSection() {
  const tabs = useMemo(() => (
    ['Plan', 'Design', 'Web', 'Android', 'iOS', 'Node.js', 'Spring']
  ), []);

  const data = useMemo(() => ({
    Plan: [
      { t: 'PM직무의 이해', d: 'PM직무의 역할과 필요 역량 이해' },
      { t: '프로젝트 아이디어 도출', d: '문제 정의와 아이디어 발상 방법론' },
      { t: '프로젝트 고객설계', d: '고객 페르소나 및 니즈 분석' },
      { t: '프로젝트 제품 설계', d: '제품 컨셉 및 핵심 기능 정의' },
      { t: '프로젝트 관리', d: '일정 관리, 리소스 배분, 팀 커뮤니케이션' },
      { t: 'LEAN 메뉴얼', d: '린 방법론을 활용한 프로젝트 관리' },
      { t: 'POC평가 및 비즈니스 로직 설계 문서 고도화', d: '개념 증명 및 비즈니스 로직 설계' },
      { t: 'PRD 작성 및 간트 차트 정리', d: '제품 요구사항 문서 및 일정 계획' },
      { t: '기획 산출물, 위크 스페이스 템플릿화', d: '기획 산출물 표준화 및 협업 도구 활용' },
      { t: 'PO / PM 셀프진단 및 성장전략', d: '자기 진단 및 성장 로드맵 수립' },
      { t: '프로젝트 회고', d: '프로젝트 완료 및 성과 분석, 회고' },
    ],
    Design: [
      { t: '피그마 기초 학습', d: 'Figma 기본 기능 및 인터페이스 학습' },
      { t: '클론디자인 pt.1', d: '기존 서비스 UI 분석 및 클론 작업 시작' },
      { t: '클론디자인 pt.2', d: '클론 디자인 완성 및 디테일 보완' },
      { t: '리디자인 pt.1', d: '리디자인 대상 선정 및 문제점 파악' },
      { t: '리디자인 pt.2', d: '심화 분석 및 개선 방향 설정' },
      { t: '와이어프레임 / 디자인 시스템', d: '정보 구조 설계 및 디자인 시스템 구축' },
      { t: 'UI디자인 / 포트폴리오 작성 pt.1', d: '실제 UI 화면 디자인 작업' },
      { t: 'UI디자인 / 프로토타입', d: '디자인 완성 및 인터랙션 프로토타입' },
      { t: 'UMC항공디자인 pt.1', d: '브랜드 아이덴티티 및 시스템 구축' },
      { t: 'UMC항공디자인 pt.2', d: '항공사 서비스 UI 디자인 프로젝트' },
      { t: '포트폴리오 작성 pt.2 / 굿즈디자인', d: '작품 정리 및 브랜드 굿즈 디자인' },
      { t: 'Appendix 협업가이드', d: '디자인 팀 협업 방법론 및 도구' },
      { t: '디자인 트렌드 및 AI활용', d: '최신 디자인 트렌드와 AI 도구 활용' },
    ],
    Web: [
      { t: 'HTML 기초 학습', d: 'HTML 핵심 개념과 문법' },
      { t: 'CSS 기초 학습', d: 'CSS 스타일링과 레이아웃' },
      { t: 'JavaScript 필수 지식', d: 'React 개발을 위한 JS 기초' },
      { t: 'TypeScript의 기본', d: 'TypeScript 문법 및 타입 시스템' },
      { t: 'React 맛보기', d: 'tsx, useState, contextAPI 기본 개념' },
      { t: 'Tailwind CSS, React Router, API 통신', d: '스타일링, 라우팅, API 통신 완전 정복' },
      { t: '커스텀 훅과 폼 구현', d: '로그인/회원가입 및 유효성 검사' },
      { t: '인증 및 권한 관리', d: 'Protected Route, JWT, OAuth 2.0' },
      { t: 'Tanstack Query 기초', d: 'useQuery와 useInfiniteQuery 활용' },
      { t: 'Tanstack Query 심화', d: 'useMutation과 Optimistic Update' },
      { t: '성능 최적화 기법', d: 'Debouncing & Throttling' },
      { t: '전역 상태 관리', d: 'Redux Toolkit / Zustand' },
      { t: 'React 성능 최적화', d: 'useMemo, memo, useCallback 활용' },
    ],
    Android: [
      { t: '선택 Android for Beginner', d: '안드로이드 개발 기초 개념' },
      { t: 'Platform & Layout', d: '안드로이드 플랫폼 이해 및 레이아웃 시스템' },
      { t: 'Activity와 Fragment', d: '화면 구성 요소 및 생명주기 이해' },
      { t: 'Essential Widget Compilation', d: '필수 UI 컴포넌트 활용법' },
      { t: 'Thread & Coroutine', d: '비동기 처리 및 코루틴 활용' },
      { t: 'LifeCycle', d: '안드로이드 컴포넌트 생명주기 관리' },
      { t: 'Recycle View & Adapter', d: '리스트 UI 구현 및 데이터 바인딩' },
      { t: 'Database', d: '로컬 데이터베이스 연동 및 관리' },
      { t: 'Token', d: '인증 토큰 관리 및 보안' },
      { t: 'Network & RESTful API', d: '서버 통신 및 REST API 연동' },
      { t: 'Social Login', d: '소셜 로그인 구현 및 사용자 인증' },
    ],
    iOS: [
      { t: 'Swift 기본 개념', d: 'Swift 언어 기초 및 개발 환경' },
      { t: 'SwiftUI 화면 구성 및 상태 관리', d: 'SwiftUI 프레임워크 기초 및 상태 관리' },
      { t: 'SwiftUI 데이터 바인딩 및 MVVM 패턴', d: 'State, Binding 및 MVVM 아키텍처' },
      { t: 'SwiftUI 리스트 & 네비게이션 설계 및 관리', d: '동적 UI 구성 및 화면 전환' },
      { t: 'Swift 비동기와 Combine 순간 반응하는 앱 만들기', d: '반응형 프로그래밍 및 데이터 스트림' },
      { t: '모델 설계와 JSON 파싱 API없이도 앱이 동작하게', d: '데이터 모델 설계 및 로컬 데이터 처리' },
      { t: 'API 연동 01 Alamofire로 서버랑 대화하기', d: 'HTTP 통신 및 API 연동 기초' },
      { t: 'API 연동 02 Moya로 깔끔하게 통신하기', d: '고급 네트워크 레이어 구축' },
      { t: '좋은 컴포넌트 설계와 단방향 흐름', d: '컴포넌트 설계 원칙 및 데이터 흐름' },
      { t: 'UIViewRepresentable UIKit을 SwiftUI에 녹이는 방법', d: 'UIKit과 SwiftUI 연동 기법' },
      { t: 'iOS 개발 협업 가이드라인 혼자 말고 함께', d: '팀 개발 및 협업 방법론' },
    ],
    'Node.js': [
      { t: '서버 처음 해보기', d: '백엔드 개발 기초 개념' },
      { t: 'Database 설계', d: '데이터베이스 모델링 및 스키마 설계' },
      { t: '실전 SQL 어떤 Query를 작성해야할까?', d: 'SQL 쿼리 작성 및 최적화 기법' },
      { t: 'API URL의 설계 & 프로젝트 설계', d: 'RESTful API 설계 원칙 및 환경 구축' },
      { t: 'ES6와 프로젝트 파일 구조의 이해', d: '모던 자바스크립트 및 프로젝트 구조' },
      { t: 'API 및 프로젝트 설정 기초', d: 'Express 기반 API 서버 구축' },
      { t: 'ORM 사용해보기', d: 'Prisma ORM 활용' },
      { t: 'Express 미들웨어 & API 응답 통일 & 에러핸들링', d: '미들웨어 활용 및 에러 처리' },
      { t: '프론트엔드 연동과 Swagger', d: 'API 문서화 및 클라이언트 연동' },
      { t: '로그인 및 회원가입 기능 구현', d: 'JWT 인증 및 사용자 관리' },
      { t: 'JWT인증 & 인가 Access / Refresh 흐름 파악하기', d: 'JWT 토큰 기반 인증 시스템' },
      { t: '중단 CI / CD (Github Actions + AWS EC2)', d: '자동 배포 파이프라인' },
      { t: 'AWS S3 파일 업로드', d: '클라우드 스토리지 연동' },
    ],
    Spring: [
      { t: '실전 SQL 어떤 Query를 작성해야할까?', d: 'SQL 쿼리 작성 및 최적화 기법' },
      { t: 'Database 설계', d: '데이터베이스 모델링 및 스키마 설계' },
      { t: 'SpringBoot의 코어개념', d: '스프링 부트 핵심 개념 이해' },
      { t: 'API URL의 설계 & 프로젝트 세팅', d: 'RESTful API 설계 원칙 및 환경 구축' },
      { t: 'JPA 기초 및 프로젝트 구조', d: 'JPA ORM 활용 데이터 접근' },
      { t: 'JPA 활용', d: 'JPA 고급 기능 및 최적화' },
      { t: 'QueryDsl 추가 학습', d: 'QueryDSL을 활용한 동적 쿼리 작성' },
      { t: 'API 응답 통일 & 에러 핸들러', d: '통합 예외 처리 및 응답 형식' },
      { t: 'API & Swagger & Annotation', d: '어노테이션 기반 API 개발' },
      { t: 'API & Paging', d: '페이징 처리 및 대용량 데이터 관리' },
      { t: '로그인 및 회원가입', d: 'JWT 인증 및 사용자 관리' },
      { t: 'CI/CD (Github Actions + AWS EC2)', d: '자동 배포 파이프라인' },
      { t: 'AWS S3 파일 업로드', d: '클라우드 스토리지 연동' },
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

  const key = tabs[active];
  const weeks = data[key];

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>파트별 커리큘럼</Title>
        <Sub>UMC 9기 실제 커리큘럼으로, 체계적인 학습을 통해 전문가로 성장합니다.</Sub>

        <Tabs>
          {tabs.map((t, i) => (
            <Tab 
              key={t} 
              $active={i === active} 
              onClick={() => setActive(i)}
            >
              {t}
            </Tab>
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
        </ContentWrap>
      </Container>
    </Section>
  );
}

export default CurriculumSection;


