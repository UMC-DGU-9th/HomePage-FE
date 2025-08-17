import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import IntroOverlay from './components/IntroOverlay';
import CurriculumSection from './sections/CurriculumSection';
import ActivitiesSection from './sections/ActivitiesSection';
import FAQSection from './sections/FAQSection';
import MembersPage from './pages/MembersPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <IntroOverlay />
      <Navbar />
      <Routes>
        <Route index element={
          <>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <CurriculumSection />
            <ActivitiesSection />
            <FAQSection />
          </>
        } />
        <Route path="/members" element={<MembersPage />} />
      </Routes>
    </>
  );
}

export default App;
