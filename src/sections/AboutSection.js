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

const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: min(1024px, 92vw);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 28px;
  backdrop-filter: blur(8px);
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  cursor: default;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(0,255,221,0.5);
    box-shadow: 0 10px 30px rgba(0,255,221,0.15), inset 0 0 40px rgba(0,255,221,0.08);
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #e6fff9;
  font-size: 1.4rem;
`;

const CardDesc = styled.p`
  margin: 0;
  color: #b7c7d9;
  line-height: 1.6;
`;

function AboutSection() {
  const sectionRef = useRef(null);
  const beamRef = useRef(null);
  const cardsRef = useRef([]);
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

      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      // 숫자 카운터 애니메이션
      const targets = [999, 432, 765];
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
            el.textContent = i === 0 ? `${value}+` : value;
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
      <Stats>
        {[
          { label: '활동멤버', key: 'members' },
          { label: '프로젝트', key: 'projects' },
          { label: '스터디', key: 'studies' },
        ].map((s, i) => (
          <Stat key={s.key}>
            <StatLabel>{s.label}</StatLabel>
            <StatNumber ref={(el) => (statRefs.current[i] = el)}>0</StatNumber>
          </Stat>
        ))}
      </Stats>
      <Beam ref={beamRef} />
      <Values>
        {[
          { icon: '⚡️', title: '열정', desc: '끝까지 파고드는 문제해결 집착과 에너지' },
          { icon: '🤝', title: '협업', desc: '코드 리뷰와 페어 프로그래밍으로 함께 성장' },
          { icon: '📈', title: '성장', desc: '프로덕트 중심, 실전 프로젝트로 실력 증명' },
        ].map((item, idx) => (
          <Card key={item.title} ref={(el) => (cardsRef.current[idx] = el)}>
            <Icon>{item.icon}</Icon>
            <CardTitle>{item.title}</CardTitle>
            <CardDesc>{item.desc}</CardDesc>
          </Card>
        ))}
      </Values>
    </Section>
  );
}

export default AboutSection;


