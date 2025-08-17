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
  gap: 16px;
  
  &:hover {
    background: rgba(255,255,255,0.02);
  }
  
  span {
    flex: 1;
    min-width: 0;
    line-height: 1.4;
  }
  
  @media (max-width: 768px) {
    padding: 20px 24px;
    font-size: 1rem;
    gap: 12px;
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
  flex-shrink: 0;
  
  ${Item}.active & {
    transform: rotate(45deg);
  }
  
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 13px;
  }
`;

const Answer = styled.div`
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  max-height: 0;
  padding: 0 28px 0;
  opacity: 0;
  transform: translateY(-8px);
  
  ${Item}.active & {
    max-height: 600px;
    padding: 0 28px 24px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnswerText = styled.p`
  margin: 0;
  color: #b7c7d9;
  line-height: 1.7;
  padding-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.06);
  white-space: pre-line; /* 줄바꿈 문자 지원 */
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
      q: '스터디는 비대면으로 이루어지나요? 데모데이와 관련해서 픽스된 일자를 알 수 있을까요?',
      a: '스터디의 경우, 비대면으로 진행할 시 집중력이 흐트러질 가능성이 있기 때문에 대면이 필수이지만, 부득이한 상황에서는 비대면으로 진행할 수 있습니다.\n\n다음으로, 방학에 진행되는 데모데이의 경우 아직 정확한 날짜는 말씀드릴 수 없지만 대략 2월 중순에서 말 사이에 진행된다고 알고 계시면 될 것 같습니다.',
    },
    {
      q: '학기 중 스터디의 경우, 어떤 방식으로 진행되며 보통 시간대는 어떻게 되는지 궁금합니다',
      a: '학기 중 스터디의 경우, 미리 제공되는 워크북으로 각자 미리 학습을 진행하고, 스터디 팀에 따라 다르지만 대부분 스터디 팀원들과 해당 내용을 공유하고 서로 질의응답 하는 형식으로 진행합니다.\n\n이와 관련해 스터디는 대면이 필수적이지만, 부득이한 상황일 경우에만 비대면으로 진행하는 것도 가능합니다.\n\n시간대의 경우, 본격적인 스터디 전 스터디 팀원들과 함께 조정하여 스터디 정기 요일 및 시간을 정하고 매주 그 시간에 진행합니다. 그러나, 다른 일정이 있을 경우 미리 스터디 팀원들과 조정하여 변경 가능합니다.',
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
