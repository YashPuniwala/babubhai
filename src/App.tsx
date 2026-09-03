import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ArtistListSection } from './components/ArtistListSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ServicesSection } from './components/ServicesSection';
import { FooterSection } from './components/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Skip loading screen if reduced motion is preferred
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLoading(false);
    }
  }, []);

  // Initialize Lenis + GSAP after loading completes
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after layout settles
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading]);

  const handleNavigate = (targetSelector: string) => {
    const targetElement = document.querySelector(targetSelector) as HTMLElement | null;
    if (targetElement) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, {
          offset: 0,
          duration: 1.1,
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Loading Screen Overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Site Content — clip-path reveal from center */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{
          clipPath: isLoading
            ? 'circle(0% at 50% 50%)'
            : 'circle(150% at 50% 50%)',
        }}
        transition={{
          duration: isLoading ? 0 : 0.9,
          ease: [0.76, 0, 0.24, 1],
          delay: isLoading ? 0 : 0.05,
        }}
        className="min-h-screen"
        style={{ backgroundColor: 'var(--bg-dark)' }}
      >
        <Navigation onNavigate={handleNavigate} />

        <main>
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <ExperienceSection />
          <ArtistListSection />
          <AchievementsSection />
          <ServicesSection />
        </main>

        <FooterSection onNavigate={handleNavigate} />
      </motion.div>
    </>
  );
}

export default App;
