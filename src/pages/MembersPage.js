import React, { useMemo } from 'react';
import styled from 'styled-components';

const Page = styled.main`
  min-height: 100vh;
  background: 
    radial-gradient(900px 600px at 20% 20%, rgba(0,255,221,0.08), transparent 60%),
    radial-gradient(900px 600px at 80% 80%, rgba(0,153,255,0.07), transparent 60%),
    var(--bg-base); /* 홈 화면과 동일한 배경 */
  padding: 14vh 0 10vh;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: min(1100px, 92vw);
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0 0 18px 0;
  font-size: clamp(28px, 5vw, 48px);
  color: #e6fff9;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: #dfe9e6;
  padding: 10px 12px;
  border-radius: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

const Name = styled.div`
  color: #e6fff9;
  font-weight: 800;
`;

const Meta = styled.div`
  color: #98a4b0;
  font-size: 14px;
`;

function MembersPage() {
  // Core Member 데이터
  const members = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    name: `Core Member ${i + 1}`,
    role: i % 4 === 0 ? '회장' : i % 4 === 1 ? '부회장' : i % 4 === 2 ? 'WEB 파트장' : i % 4 === 3 ? 'iOS 파트장' : 'ANDROID 파트장',
    part: ['WEB', 'iOS', 'ANDROID', 'DESIGN'][i % 4],
    avatar: `https://i.pravatar.cc/150?img=${i + 20}`,
  })), []);

  return (
    <Page>
      <Container>
        <Title>Core Member</Title>
        <Grid>
          {members.map((m) => (
            <Card key={m.name}>
              <Avatar src={m.avatar} alt={m.name} />
              <Name>{m.name}</Name>
              <Meta>{m.role}</Meta>
            </Card>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

export default MembersPage;


