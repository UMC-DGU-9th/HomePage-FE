import React, { Suspense } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Prism from './Prism';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;800&display=swap');

  :root { color-scheme: dark; }
  :root { --bg-base: #060708; }

  html, body, #root { height: 100%; }

  body {
    margin: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg-base);
  }
`;

const HeroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background:
    radial-gradient(1200px 800px at 50% 50%, rgba(0,255,221,0.1), transparent 70%),
    var(--bg-base);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: -20%;
    background-image: linear-gradient(transparent 0 1px, rgba(255,255,255,0.04) 1px), linear-gradient(90deg, transparent 0 1px, rgba(255,255,255,0.04) 1px);
    background-size: 40px 40px, 40px 40px;
    mask-image: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8), transparent 70%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.035"/></svg>');
    pointer-events: none;
  }
  /* 섹션 하단 페이드 아웃 그라데이션 */
  &::marker { display: none; }
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0.85) 92%, rgba(0,0,0,0) 100%);
`;

const TitleWrapper = styled.div`
  position: absolute;
  text-align: center;
  color: white;
  z-index: 10;
  pointer-events: none;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  margin: 0;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(90deg, #ffffff 0%, #a2fff2 50%, #00ffdd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 24px rgba(0,255,221,0.25));

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 1rem;
  font-weight: 300;
  color: #cbd5e1;
  letter-spacing: 0.5px;
  text-shadow: 0 0 20px rgba(0,255,221,0.15);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function HeroSection() {
  return (
    <HeroContainer>
      <GlobalStyle />
      <TitleWrapper>
        <MainTitle>DONGGUK UMC</MainTitle>
        <Subtitle>Code the Reality, Move the World.</Subtitle>
      </TitleWrapper>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 6, 6]} intensity={1.1} />
          <pointLight position={[-6, -6, -6]} intensity={1.5} color="#00ffdd" />

          <Prism />

          <EffectComposer multisampling={0}>
            <Bloom intensity={1.2} luminanceThreshold={0} luminanceSmoothing={0.6} mipmapBlur />
            <ChromaticAberration offset={[0.0015, 0.001]} blendFunction={BlendFunction.ADD} />
            <Noise premultiply opacity={0.05} />
            <Vignette eskil={false} offset={0.2} darkness={0.6} />
          </EffectComposer>
        </Suspense>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </HeroContainer>
  );
}

export default HeroSection;


