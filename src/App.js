import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import IntroOverlay from './components/IntroOverlay';
import MembersSection from './sections/MembersSection';
import CurriculumSection from './sections/CurriculumSection';
import ActivitiesSection from './sections/ActivitiesSection';
import FAQSection from './sections/FAQSection';

function App() {
  return (
    <>
      <IntroOverlay />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <MembersSection />
      <CurriculumSection />
      <ActivitiesSection />
      <FAQSection />
    </>
  );
}

export default App;
