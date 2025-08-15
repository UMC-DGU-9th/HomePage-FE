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

const Timeline = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, rgba(0,255,221,0.8), rgba(0,153,255,0.6), rgba(0,255,221,0.8));
    transform: translateX(-50%);
    box-shadow: 0 0 20px rgba(0,255,221,0.4);
  }
`;

const Activity = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 80px;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    .content {
      text-align: right;
    }
  }
`;

const Content = styled.div`
  width: calc(50% - 40px);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 24px 28px;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,255,221,0.15);
  }
`;

const ActivityTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #e6fff9;
  font-size: 1.3rem;
`;

const ActivityDesc = styled.p`
  margin: 0 0 12px 0;
  color: #b7c7d9;
  line-height: 1.6;
`;

const ActivityMeta = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  
  ${Activity}:nth-child(even) & {
    justify-content: flex-end;
  }
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: ${props => props.color || 'rgba(0,255,221,0.15)'};
  color: ${props => props.textColor || '#dffff8'};
  font-size: 0.85rem;
  font-weight: 600;
`;

const Icon = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffdd, #00a2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 0 30px rgba(0,255,221,0.5);
  z-index: 2;
`;

const Week = styled.div`
  position: absolute;
  left: 50%;
  top: -15px;
  transform: translateX(-50%);
  background: #060708;
  color: #00ffdd;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  border: 2px solid rgba(0,255,221,0.3);
`;

function ActivitiesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.activity-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // 타임라인 선 애니메이션
      gsap.fromTo(
        '.timeline::before',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
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

  const activities = [
    {
      week: '1주차',
      title: 'OT & 아이스브레이킹',
      desc: '동기들과의 첫 만남, UMC 소개 및 기수별 목표 설정',
      icon: '🎯',
      tags: [
        { text: '오리엔테이션', color: 'rgba(255,107,107,0.2)', textColor: '#ffcdd2' },
        { text: '네트워킹', color: 'rgba(0,255,221,0.2)', textColor: '#dffff8' },
      ],
    },
    {
      week: '2-3주차',
      title: '파트별 스터디',
      desc: '각 파트별 기초 학습 및 멘토와의 1:1 코칭 세션',
      icon: '📚',
      tags: [
        { text: '학습', color: 'rgba(76,175,80,0.2)', textColor: '#c8e6c9' },
        { text: '멘토링', color: 'rgba(156,39,176,0.2)', textColor: '#e1bee7' },
      ],
    },
    {
      week: '4주차',
      title: '중간 세미나',
      desc: '파트별 진행상황 공유 및 크로스 파트 협업 워크샵',
      icon: '💡',
      tags: [
        { text: '세미나', color: 'rgba(255,193,7,0.2)', textColor: '#fff3c4' },
        { text: '협업', color: 'rgba(0,153,255,0.2)', textColor: '#bbdefb' },
      ],
    },
    {
      week: '5-6주차',
      title: '팀 프로젝트',
      desc: '실전 프로젝트 개발, 기획부터 배포까지 전 과정 경험',
      icon: '🚀',
      tags: [
        { text: '프로젝트', color: 'rgba(233,30,99,0.2)', textColor: '#f8bbd9' },
        { text: '실전', color: 'rgba(0,255,221,0.2)', textColor: '#dffff8' },
      ],
    },
    {
      week: '7주차',
      title: '해커톤',
      desc: '24시간 집중 개발, 아이디어를 빠르게 구현하는 경험',
      icon: '⚡',
      tags: [
        { text: '해커톤', color: 'rgba(255,87,34,0.2)', textColor: '#ffccbc' },
        { text: '24시간', color: 'rgba(158,158,158,0.2)', textColor: '#e0e0e0' },
      ],
    },
    {
      week: '8주차',
      title: '데모데이 & 수료식',
      desc: '최종 프로젝트 발표 및 기수 활동 마무리, 네트워킹 파티',
      icon: '🏆',
      tags: [
        { text: '발표', color: 'rgba(103,58,183,0.2)', textColor: '#d1c4e9' },
        { text: '수료', color: 'rgba(0,255,221,0.2)', textColor: '#dffff8' },
      ],
    },
  ];

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title>기수 활동</Title>
        <Sub>8주간 진행되는 다양한 활동을 통해 성장하고 네트워킹하세요</Sub>

        <Timeline className="timeline">
          {activities.map((activity, index) => (
            <Activity key={activity.week} className="activity-item">
              <Content className="content">
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityDesc>{activity.desc}</ActivityDesc>
                <ActivityMeta>
                  {activity.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} color={tag.color} textColor={tag.textColor}>
                      {tag.text}
                    </Tag>
                  ))}
                </ActivityMeta>
              </Content>
              <Icon>{activity.icon}</Icon>
              <Week>{activity.week}</Week>
            </Activity>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
}

export default ActivitiesSection;
