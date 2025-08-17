import React, { useEffect, useState, useCallback } from 'react';
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

const Frame = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(1200px, 95vw);
  height: min(800px, 85vh);
  border-radius: 24px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 80px rgba(0,0,0,0.35);
  overflow: hidden;
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
`;

const ImageArea = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
`;

const SlideTrack = styled.div`
  display: flex;
  width: ${props => props.count * 100}%;
  height: 100%;
  transform: translateX(-${props => (props.activeIndex * 100) / props.count}%);
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
`;

const Slide = styled.div`
  width: ${props => 100 / props.count}%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
`;

const Visual = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transform: scale(1.02); 
    transition: transform 800ms ease; 
    will-change: transform; 
  }
`;

const InfoArea = styled.div`
  padding: 16px 24px;
  background: rgba(0,0,0,0.25);
  border-top: 1px solid rgba(255,255,255,0.08);
  min-height: 80px;
`;

const TitleBar = styled.div`
  font-size: clamp(18px, 2.4vw, 24px);
  color: #e6fff9;
  font-weight: 800;
  margin: 0 0 4px 0;
`;

const Desc = styled.p`
  margin: 0;
  color: #9fb3c8;
  font-size: clamp(13px, 1.4vw, 15px);
  line-height: 1.5;
  white-space: pre-line;
  word-break: keep-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;



const Arrow = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15);
  width: 42px; height: 42px; border-radius: 50%; color: #e6fff9; cursor: pointer;
  display: grid; place-items: center;
  transition: transform 200ms ease, background 200ms ease;
  &:hover{ transform: translateY(-50%) scale(1.05); background: rgba(0,0,0,0.55); }
  z-index: 10;
  font-size: 18px;
`;

const Prev = styled(Arrow)`left: 18px;`;
const Next = styled(Arrow)`right: 18px;`;

function ProjectsSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = [
    {
      title: '너디너리 해커톤',
      desc: 'UMC와 CMC가 함께하는 대규모 해커톤으로, 26개 대학 부원들이 모여 기획부터 개발까지 전 과정을 경험하며 실력을 겨루는 자리입니다. 다양한 학교와 파트의 참가자들이 협력하여 창의적인 아이디어를 현실로 만들어가는 소중한 경험을 할 수 있습니다.',
      img: '/hackathon.jpg',
    },
    {
      title: '컨퍼런스',
      desc: 'IT 전 분야를 아우르는 컨퍼런스로, 현직 전문가의 깊이 있는 강연과 Q&A를 통해 실무 경험과 인사이트를 얻을 수 있습니다. 업계 트렌드와 최신 기술을 학습하며, 다양한 참가자들과 네트워킹할 수 있는 귀중한 기회입니다.',
      img: '/conference.png',
    },
    {
      title: '데모데이',
      desc: '한 기수의 마무리를 장식하는 데모데이로, 완성도 있는 프로젝트 결과물을 발표하며 그동안의 성장을 확인하는 뜻깊은 시간입니다. 단순한 발표를 넘어 실제 사용자를 고려한 완성도 높은 결과물을 선보이는 무대입니다.',
      img: '/demoday.jpeg',
    },
    {
      title: '네트워킹 세션',
      desc: '동기, 선후배들과의 만남을 통해 경험을 공유하고, 현업에서 활동하는 졸업 선배들의 생생한 이야기를 들을 수 있는 시간입니다. 개발자로서의 진로 고민, 취업 준비 등 다양한 주제로 깊이 있는 대화를 나누며 성장할 수 있습니다.',
      img: '/networking.jpeg',
    },
    {
      title: 'PM DAY',
      desc: 'PM, 디자이너, 개발자들이 모여 프로젝트 중간 점검과 상호 피드백을 통해 퀄리티를 높이는 시간입니다. 다양한 관점에서 프로젝트를 바라보며 팀워크를 강화하고, 데모데이를 대비한 완성도를 끌어올리는 중요한 활동입니다.',
      img: '/PMDAY.png',
    },
  ];

  const go = useCallback((n) => setIdx((p) => (n + slides.length) % slides.length), [slides.length]);

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(idx + 1), 4000);
    return () => clearInterval(t);
  }, [idx, paused, go]);

  return (
    <Wrap>
      <Frame onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <ImageArea>
          <Prev onClick={() => go(idx - 1)} aria-label="이전">‹</Prev>
          <Next onClick={() => go(idx + 1)} aria-label="다음">›</Next>
          <SlideContainer>
            <SlideTrack count={slides.length} activeIndex={idx}>
              {slides.map((slide, i) => (
                <Slide key={i} count={slides.length}>
                  <Visual>
                    <img alt="activity" src={slide.img} />
                  </Visual>
                </Slide>
              ))}
            </SlideTrack>
          </SlideContainer>

        </ImageArea>
        <InfoArea>
          <TitleBar>{slides[idx].title}</TitleBar>
          <Desc>{slides[idx].desc}</Desc>
        </InfoArea>
      </Frame>
    </Wrap>
  );
}

export default ProjectsSection;


