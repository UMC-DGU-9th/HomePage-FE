import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding: 16vh 0 20vh;
  background: radial-gradient(1000px 700px at 30% 70%, rgba(0,255,221,0.06), transparent 60%),
              radial-gradient(800px 600px at 70% 30%, rgba(0,153,255,0.04), transparent 60%),
              var(--bg-base);
`;

const Container = styled.div`
  width: min(900px, 92vw);
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  color: #e6fff9;
  font-size: 2.6rem;
  text-align: center;
`;

const Sub = styled.p`
  margin: 0 0 48px 0;
  color: #9fb3c8;
  text-align: center;
  font-size: 1.1rem;
`;

const Accordion = styled.div`
  display: grid;
  gap: 16px;
`;

const Item = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.3s ease;
  
  &.active {
    border-color: rgba(0,255,221,0.3);
  }
`;

const Question = styled.button`
  width: 100%;
  padding: 24px 28px;
  background: transparent;
  border: 0;
  text-align: left;
  color: #e6fff9;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.02);
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffdd, #00a2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  color: #001314;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  
  ${Item}.active & {
    transform: rotate(45deg);
  }
`;

const Answer = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), padding 0.4s ease;
  
  ${Item}.active & {
    max-height: 300px;
    padding: 0 28px 24px;
  }
`;

const AnswerText = styled.p`
  margin: 0;
  color: #b7c7d9;
  line-height: 1.7;
  padding-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

function FAQSection() {
  const sectionRef = useRef(null);
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: 'UMC 지원 자격이 있나요?',
      a: '동국대학교 재학생이면 누구나 지원 가능합니다. 전공이나 학년에 관계없이 IT에 관심이 있고 열정이 있다면 환영합니다. 프로그래밍 경험이 없어도 괜찮습니다.',
    },
    {
      q: '활동 시간과 참여도는 어떻게 되나요?',
      a: '주 1회 정기 세미나(2-3시간)와 개인 학습 시간(주 5-8시간)이 필요합니다. 팀 프로젝트 기간에는 추가 시간이 소요될 수 있습니다. 80% 이상 출석이 필수입니다.',
    },
    {
      q: '어떤 파트를 선택해야 할까요?',
      a: '본인의 관심사와 진로를 고려해 선택하세요. iOS/Android는 앱 개발, Web은 웹사이트 개발, Server는 백엔드 개발, PM은 기획, Design은 UI/UX 디자인을 다룹니다. 지원서에서 희망 파트를 작성해주세요.',
    },
    {
      q: '활동비나 참가비가 있나요?',
      a: 'UMC 활동 자체는 무료입니다. 다만 세미나 장소 대관비, 해커톤 식비, 네트워킹 이벤트 등에 소액의 회비가 있을 수 있습니다. 대략 기수당 3-5만원 수준입니다.',
    },
    {
      q: '수료 후 혜택이나 지원이 있나요?',
      a: '수료증 발급, UMC 동문 네트워크 참여, 인턴십/채용 연계 기회, 포트폴리오 피드백 등의 혜택이 있습니다. 우수 프로젝트는 대외 경진대회 참가 지원도 받을 수 있습니다.',
    },
    {
      q: '중도 포기하면 어떻게 되나요?',
      a: '개인 사정으로 중도 포기하는 경우, 미리 운영진에게 알려주시면 됩니다. 다만 팀 프로젝트 진행 중에는 팀원들에게 피해가 가지 않도록 신중히 결정해주세요.',
    },
  ];

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>FAQ</Title>
        <Sub>자주 묻는 질문들을 확인해보세요</Sub>

        <Accordion>
          {faqs.map((faq, index) => (
            <Item
              key={index}
              className={`faq-item ${openItems.has(index) ? 'active' : ''}`}
            >
              <Question onClick={() => toggleItem(index)}>
                <span>{faq.q}</span>
                <Icon>+</Icon>
              </Question>
              <Answer>
                <AnswerText>{faq.a}</AnswerText>
              </Answer>
            </Item>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}

export default FAQSection;
