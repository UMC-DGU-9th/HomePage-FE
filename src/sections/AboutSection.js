import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background:
    radial-gradient(900px 600px at 20% 20%, rgba(0,255,221,0.08), transparent 60%),
    radial-gradient(900px 600px at 80% 80%, rgba(0,153,255,0.07), transparent 60%),
    var(--bg-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0));
`;

const Title = styled.h2`
  color: #e6fff9;
  font-size: 3rem;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #9fb3c8;
  font-size: 1.1rem;
  margin: 0 0 40px 0;
  text-align: center;
  max-width: 720px;
  line-height: 1.6;
`;

const Intro = styled.h3`
  margin: 0 0 24px 0;
  text-align: center;
  font-weight: 800;
  letter-spacing: -0.2px;
  font-size: clamp(18px, 3.2vw, 32px);
  background: linear-gradient(90deg, #bbf7d0, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Beam = styled.div`
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, rgba(0,255,221,0), rgba(0,255,221,1), rgba(0,153,255,0));
  box-shadow: 0 0 24px rgba(0,255,221,0.55);
  margin: 0 auto 40px auto;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: min(1024px, 92vw);
  margin: 0 auto 32px auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
`;

const StatLabel = styled.div`
  color: #a8b3be;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const StatNumber = styled.div`
  color: #22c55e;
  font-weight: 900;
  font-size: clamp(28px, 6vw, 52px);
`;

/* removed legacy card styles */

// Big keywords row (simple, bold, typographic)
const KeywordRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(1100px, 92vw);
  margin: 18px auto 8px;
`;

const Keyword = styled.div`
  flex: 1 1 0;
  text-align: center;
  font-weight: 900;
  font-size: clamp(42px, 9vw, 120px);
  letter-spacing: -1.5px;
  line-height: 1;
  color: rgba(255,255,255,0.08);
  -webkit-text-stroke: 1px rgba(255,255,255,0.35);
  text-shadow: 0 12px 50px rgba(0,255,221,0.08);
`;

function AboutSection() {
  const sectionRef = useRef(null);
  const beamRef = useRef(null);
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // removed legacy card reveal animation

      // 숫자 카운터 애니메이션
      const targets = [213, 49, 187];
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targets[i],
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            const value = Math.floor(obj.val).toLocaleString();
            el.textContent = i === 0 ? `${value}` : value;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Title>핵심 가치</Title>
      <Subtitle>프리즘에서 흩어지는 빛처럼, 열정과 협업, 성장의 가치가 하나로 모여 동국대학교 UMC만의 결과를 만듭니다.</Subtitle>
      <Intro>UMC는 기존의 틀을 깨부수며 성장합니다.</Intro>
      <Beam ref={beamRef} />
      <KeywordRow>
        {['도전', '평등', '자신감'].map((word) => (
          <Keyword key={word}>{word}</Keyword>
        ))}
      </KeywordRow>
      <Stats style={{ marginTop: 32 }}>
        {[
          { label: '역대 DGU-UMC 멤버수', key: 'members' },
          { label: '프로젝트', key: 'projects' },
          { label: '스터디', key: 'studies' },
        ].map((s, i) => (
          <Stat key={s.key}>
            <StatLabel>{s.label}</StatLabel>
            <StatNumber ref={(el) => (statRefs.current[i] = el)}>0</StatNumber>
          </Stat>
        ))}
      </Stats>
    </Section>
  );
}

export default AboutSection;


