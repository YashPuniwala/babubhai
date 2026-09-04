import { useEffect, useRef, useState } from 'react';
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
  const [heroReady, setHeroReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  /* ---------------------------------------------------------
     FORCE PAGE TO START FROM TOP
  --------------------------------------------------------- */
  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediately force top position
    window.scrollTo(0, 0);

    // Also reset after the browser has finished restoring layout
    const resetScroll = () => {
      window.scrollTo(0, 0);
    };

    requestAnimationFrame(resetScroll);

    return () => {
      window.removeEventListener('load', resetScroll);
    };
  }, []);

  /* ---------------------------------------------------------
     KEEP PAGE AT TOP WHILE LOADING
  --------------------------------------------------------- */
  useEffect(() => {
    if (!isLoading) return;

    // Force scroll to top while loading screen is visible
    window.scrollTo(0, 0);

    // Prevent user/browser scrolling during loading
    const preventScroll = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', preventScroll, {
      passive: false,
    });

    // Lock body
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('scroll', preventScroll);
    };
  }, [isLoading]);

  /* ---------------------------------------------------------
     WHEN LOADING FINISHES
     ALWAYS START HERO FROM TOP
  --------------------------------------------------------- */
  useEffect(() => {
    if (isLoading) return;

    // Make absolutely sure the site starts at the hero
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Reset Lenis position if it already exists
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        immediate: true,
      });
    }

    // Refresh ScrollTrigger after page is visible
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        // Re-refresh after the slide-up reveal animation fully settles
        setTimeout(() => ScrollTrigger.refresh(), 900);
      });
    });
  }, [isLoading]);

  /* ---------------------------------------------------------
     INITIALIZE LENIS + GSAP
  --------------------------------------------------------- */
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

    // Refresh after everything has settled
    const refreshTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, {
        immediate: true,
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);

      gsap.ticker.remove(update);

      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading]);

  /* ---------------------------------------------------------
     NAVIGATION
  --------------------------------------------------------- */
  const handleNavigate = (targetSelector: string) => {
    const targetElement = document.querySelector(
      targetSelector
    ) as HTMLElement | null;

    if (!targetElement) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset: 0,
        duration: 1.1,
      });
    } else {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* -----------------------------------------------------
          LOADING SCREEN
      ----------------------------------------------------- */}
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            // Called after the slide-up exit animation fully completes
            window.scrollTo(0, 0);
            setIsLoading(false);
            // Signal Hero to begin its entrance animation
            setHeroReady(true);
          }}
        />
      )}

      {/* -----------------------------------------------------
          MAIN WEBSITE — stationary, loading screen slides away
      ----------------------------------------------------- */}
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--bg-dark)' }}
      >
        <Navigation onNavigate={handleNavigate} />

        <main>
          <HeroSection ready={heroReady} />
          <AboutSection />
          <StatsSection />
          <ExperienceSection />
          <ArtistListSection />
          <AchievementsSection />
          <ServicesSection />
        </main>

        <FooterSection onNavigate={handleNavigate} />
      </div>
    </>
  );
}

export default App;