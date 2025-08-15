import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  position: relative;
  width: 100vw;
  min-height: 120vh;
  padding: 18vh 0 24vh;
  background: linear-gradient(180deg, #060707, #090b0c);
`;

const Container = styled.div`
  width: min(1024px, 92vw);
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  color: #e6fff9;
  font-size: 2.6rem;
  text-align: center;
`;

const Sub = styled.p`
  margin: 0 0 28px 0;
  color: #9fb3c8;
  text-align: center;
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0,255,221, 0.45); }
  70% { box-shadow: 0 0 0 18px rgba(0,255,221, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0,255,221, 0); }
`;

const CtaWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 28px 0 48px;
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0 28px;
  border-radius: 999px;
  background: linear-gradient(90deg, #00ffdd, #00a2ff);
  color: #001314;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: 0.6px;
  animation: ${pulse} 2.2s infinite;
  transition: transform 0.25s ease;

  &:hover { transform: translateY(-3px); }
`;

const Timeline = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-top: 36px;
`;

const Step = styled.div`
  position: relative;
  padding: 20px 20px 20px 56px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  color: #cfe9e4;
`;

const Bullet = styled.div`
  position: absolute;
  left: 20px;
  top: 22px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00ffdd;
  box-shadow: 0 0 20px rgba(0,255,221,0.8);
`;

function RecruitSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.recruit-step').forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
            delay: i * 0.1,
          }
        );
      });

      // 자석 효과 제거 (의도적으로 비워둠)
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>Recruit</Title>
        <Sub>모집 기간에만 보이는 맥박 버튼을 통해 지금 바로 합류하세요</Sub>
        <CtaWrap>
          <Cta href="#apply">JOIN&nbsp;US</Cta>
        </CtaWrap>

        <Timeline>
          {[
            '지원서 작성',
            '과제 전형',
            '기술/팀 면접',
            '최종 합격 발표',
          ].map((label) => (
            <Step key={label} className="recruit-step">
              <Bullet />
              {label}
            </Step>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
}

export default RecruitSection;


