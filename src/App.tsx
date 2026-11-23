import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { ProjectItem } from './data/portfolioData';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { TechStackSection } from './components/TechStackSection';

function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get('autostart') === '1') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return false;
}

export default function App() {
  const [showLoader, setShowLoader] = useState<boolean>(() => !shouldSkipIntro());
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#08090D] text-[#F4F5F8]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#7C5CFF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <LoadingScreen visible={showLoader} onComplete={handleLoaderComplete} />
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <TechStackSection onSelectProject={setSelectedProject} />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <ExperienceSection />
          <CapabilitiesSection />
          <ContactSection />
        </main>

        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </MotionConfig>
  );
}
