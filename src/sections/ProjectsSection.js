import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Wrap = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: var(--bg-base);
  overflow: hidden;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0));
`;

const Track = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  gap: 40px;
  padding: 0 12vw;
`;

const Card = styled.div`
  width: 360px;
  height: 460px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  transform: rotate(-2deg);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0) rotate(-2deg);

  &:hover {
    transform: rotate(0deg) translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0,255,221,0.2);
  }
`;

const Thumb = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  background: #000; /* 실제 이미지가 들어오면 가려짐 */
  overflow: hidden;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 18px 20px;
  color: #e6fff9;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
  font-size: 1.25rem;
`;

const Desc = styled.p`
  margin: 0;
  color: #9fb3c8;
  font-size: 0.95rem;
`;

function ProjectsSection() {
  const wrapRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rowEl = rowRef.current;
      const wrapEl = wrapRef.current;
      if (!rowEl || !wrapEl) return;

      const totalWidth = rowEl.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + viewportWidth * 0.24; // padding 보정

      gsap.to(rowEl, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      const bar = document.getElementById('bar');
      if (bar) {
        ScrollTrigger.create({
          trigger: wrapEl,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          onUpdate: (self) => {
            bar.style.width = `${(self.progress * 100).toFixed(1)}%`;
          },
        });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const items = Array.from({ length: 8 }).map((_, i) => ({
    title: `UMC Project ${i + 1}`,
    desc: '실전 중심 앱/웹 프로젝트, 프로덕트 완성도에 집중',
  }));

  return (
    <Wrap ref={wrapRef}>
      <div style={{position:'absolute', top:16, left: '50%', transform:'translateX(-50%)', width:'min(1024px, 92vw)', color:'#8fb9b1', fontSize:14, letterSpacing:0.5}}>
        <div id="progress" style={{height:2, background:'rgba(255,255,255,0.08)'}}>
          <div id="bar" style={{height:'100%', width:'0%', background:'linear-gradient(90deg,#00ffdd,#00a2ff)'}} />
        </div>
      </div>
      <Track>
        <Row ref={rowRef}>
          {items.map((p, idx) => (
            <Card key={p.title}
            >
              <Thumb>
                <img alt="activity" src={`https://picsum.photos/seed/umc-act-${idx}/1200/800`} />
              </Thumb>
              <Info>
                <Title>{p.title}</Title>
                <Desc>{p.desc}</Desc>
              </Info>
            </Card>
          ))}
        </Row>
      </Track>
    </Wrap>
  );
}

export default ProjectsSection;


