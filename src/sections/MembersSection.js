import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(1000px 700px at 70% 30%, rgba(0,255,221,0.06), transparent 60%), var(--bg-base);
  padding: 12vh 0;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 92%, rgba(0,0,0,0));
`;

const Container = styled.div`
  width: min(1100px, 92vw);
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 28px 0;
  color: #e6fff9;
  font-size: 2.4rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 720px) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  filter: grayscale(100%);
  transition: filter 0.35s ease, transform 0.35s ease;
  ${Card}:hover & { filter: grayscale(0%); transform: scale(1.05); }
`;

const Badge = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0,255,221,0.2);
  color: #dffff8;
  font-size: 12px;
  backdrop-filter: blur(8px);
  transform: translateY(12px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  ${Card}:hover & { transform: translateY(0); opacity: 1; }
`;

function MembersSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.member-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const members = Array.from({ length: 12 }).map((_, i) => ({
    name: `Member ${i + 1}`,
    role: i % 3 === 0 ? 'iOS' : i % 3 === 1 ? 'Web' : 'Android',
    photo: `https://picsum.photos/seed/umc-m-${i}/600/600`,
  }));

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>Members</Title>
        <Grid>
          {members.map((m) => (
            <Card className="member-card" key={m.name}>
              <Photo src={m.photo} alt={m.name} />
              <Badge>{m.role}</Badge>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default MembersSection;


