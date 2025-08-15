import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  background: #020303;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: opacity 0.6s ease, visibility 0.6s ease;
  opacity: ${props => (props.$leaving ? 0 : 1)};
  visibility: ${props => (props.$leaving ? 'hidden' : 'visible')};
`;

const Line = styled.div`
  color: #e6fff9;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: clamp(28px, 5vw, 64px);
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.6ch;
  height: 1.1em;
  background: #00ffdd;
  margin-left: 2px;
  transform: translateY(3px);
  animation: ${blink} 1.1s step-end infinite;
`;

function typeString(target, setter, onComplete, speed = 60) {
  let i = 0;
  const timer = setInterval(() => {
    setter(target.slice(0, i + 1));
    i += 1;
    if (i >= target.length) {
      clearInterval(timer);
      if (onComplete) onComplete();
    }
  }, speed);
  return () => clearInterval(timer);
}

function IntroOverlay() {
  const [text, setText] = useState('');
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cleanup = typeString('DONGGUK UMC', setText, () => {
      setTimeout(() => {
        setLeaving(true);
        setTimeout(() => setVisible(false), 650);
      }, 500);
    }, 50);
    return cleanup;
  }, []);

  if (!visible) return null;

  return (
    <Wrap $leaving={leaving}>
      <Line>
        {text}
        <Cursor />
      </Line>
    </Wrap>
  );
}

export default IntroOverlay;


