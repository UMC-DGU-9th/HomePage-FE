import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Bar = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px);
  background: linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0));
  z-index: 1000;
`;

const Container = styled.div`
  width: min(1200px, 92vw);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled(Link)`
  color: #e6fff9;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex; gap: 16px; align-items: center;
`;

const NavLink = styled(Link)`
  color: ${p => (p.$active ? '#00ffdd' : '#b7c7d9')};
  text-decoration: none;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 10px;
  &:hover { color: #e6fff9; }
`;

function Navbar() {
  const { pathname } = useLocation();
  return (
    <Bar>
      <Container>
        <Brand to="/">DONGGUK UMC</Brand>
        <Actions>
          <NavLink to="/" $active={pathname === '/'}>Home</NavLink>
          <NavLink to="/members" $active={pathname === '/members'}>Members</NavLink>
        </Actions>
      </Container>
    </Bar>
  );
}

export default Navbar;


