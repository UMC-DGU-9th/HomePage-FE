import React, { useMemo } from 'react';
import styled from 'styled-components';

const Page = styled.main`
  min-height: 100vh;
  background: 
    radial-gradient(1200px 800px at 80% 20%, rgba(0,153,255,0.08), transparent 60%),
    radial-gradient(800px 600px at 20% 80%, rgba(0,255,221,0.05), transparent 60%),
    linear-gradient(135deg, #0a0f1c 0%, #0d1421 50%, #0a0f1c 100%);
  padding: 12vh 0 8vh;
  overflow-x: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(0,255,221,0.03) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(0,153,255,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  width: min(1200px, 95vw);
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  background: linear-gradient(90deg, #ffffff 0%, #a2fff2 50%, #00ffdd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 24px rgba(0,255,221,0.25));
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  margin: 0 0 40px 0;
  color: #9fb3c8;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 300;
  letter-spacing: 0.5px;
`;



const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) { 
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,255,221,0.02), rgba(0,153,255,0.02));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0,255,221,0.2);
    box-shadow: 0 20px 40px rgba(0,255,221,0.1);
    
    &::before {
      opacity: 1;
    }
  }
`;

const AvatarContainer = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #1a2332, #0f1419);
  border: 3px solid rgba(0,255,221,0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  ${Card}:hover & {
    border-color: rgba(0,255,221,0.4);
    box-shadow: 0 0 30px rgba(0,255,221,0.2);
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background: transparent;
`;

const Name = styled.div`
  color: #e6fff9;
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
`;



const RoleBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  color: #e6fff9;
  font-size: 13px;
  font-weight: 600;
  margin-top: 12px;
  position: relative;
  z-index: 2;
`;

function MembersPage() {
  // Core Member 데이터
  const members = useMemo(() => [
    {
      name: '박지현',
      role: '회장',
      avatar: '/man1.png',
    },
    {
      name: '김도훈', 
      role: '부회장',
      avatar: '/man2.png',
    },
    {
      name: '양희진',
      role: 'Spring 파트장',
      avatar: '/girl2.png',
    },
    {
      name: '김민범',
      role: 'Node.js 파트장', 
      avatar: '/man3.png',
    },
    {
      name: '하승연',
      role: '웹 파트장',
      avatar: '/girl1.png',
    },
    {
      name: '김가영',
      role: 'PM 파트장',
      avatar: '/girl4.png',
    },
    {
      name: '오정현',
      role: '디자인 파트장',
      avatar: '/girl3.png',
    },
    {
      name: '김도연',
      role: 'iOS 파트장',
      avatar: '/man4.png',
    },
  ], []);

  return (
    <Page>
      <Container>
        <HeaderSection>
          <Title>Core Members</Title>
          <Subtitle>동국대 UMC를 이끌어가는 핵심 멤버들을 소개합니다</Subtitle>
        </HeaderSection>
        
        <Grid>
          {members.map((m, index) => (
            <Card key={m.name}>
              <AvatarContainer>
                <Avatar src={m.avatar} alt={m.name} />
              </AvatarContainer>
              <Name>{m.name}</Name>
              <RoleBadge>{m.role}</RoleBadge>
            </Card>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

export default MembersPage;


