import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  position: relative;
  width: 100vw;
  min-height: 120vh;
  padding: 16vh 0 20vh;
  background: radial-gradient(1200px 800px at 80% 20%, rgba(0,153,255,0.08), transparent 60%),
              radial-gradient(800px 600px at 20% 80%, rgba(0,255,221,0.05), transparent 60%),
              var(--bg-base);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 94%, rgba(0,0,0,0));
`;

const Container = styled.div`
  width: min(1100px, 92vw);
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  color: #e6fff9;
  font-size: 2.8rem;
  text-align: center;
`;

const Sub = styled.p`
  margin: 0 0 48px 0;
  color: #9fb3c8;
  text-align: center;
  font-size: 1.1rem;
`;



const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: linear-gradient(135deg, rgba(0,255,221,0.1), rgba(0,153,255,0.1));
  border: 2px solid rgba(0,255,221,0.3);
  border-radius: 16px;
  color: #e6fff9;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0,255,221,0.1);
  
  &:hover {
    transform: translateY(-4px);
    background: linear-gradient(135deg, rgba(0,255,221,0.2), rgba(0,153,255,0.2));
    border-color: rgba(0,255,221,0.5);
    box-shadow: 0 16px 48px rgba(0,255,221,0.2);
  }
  
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 1.1rem;
  }
`;



function ActivitiesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.link-button',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>기수 활동</Title>
        <Sub>기수별로 진행되는 다양한 활동을 통해 성장하고 네트워킹하세요</Sub>

        <LinkContainer>
          <LinkButton 
            className="link-button"
            href="https://www.notion.so/32ddbcde1075427ab516333993806785?pvs=21" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            👉 UMC OB 프로젝트 보기
          </LinkButton>
        </LinkContainer>
      </Container>
    </Section>
  );
}

export default ActivitiesSection;
