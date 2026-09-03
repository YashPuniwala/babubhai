import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { AboutSection } from './AboutSection';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);

    update();

    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const section = sectionRef.current;

    if (!section) return;

    if (prefersReducedMotion) {
      gsap.set([copyRef.current, portraitRef.current], {
        clearProps: 'all',
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(copyRef.current, {
        opacity: 0,
        y: 18,
      });

      gsap.set(portraitRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.985,
        filter:
          'grayscale(0.25) sepia(6%) brightness(0.96) contrast(1.02)',
      });

      const intro = gsap.timeline({
        delay: 0.22,
      });

      intro
        .to(
          copyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
          },
          0.1
        )
        .to(
          portraitRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter:
              'grayscale(0) sepia(0%) brightness(1) contrast(1)',
            duration: 1.1,
            ease: 'power3.out',
          },
          0.18
        );

      if (!isMobile) {
        gsap.to(portraitStageRef.current, {
          y: 34,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        });

        gsap.to(copyRef.current, {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // ---------------------------------------------------------
  // DESKTOP — unchanged, original grid layout
  // ---------------------------------------------------------
  if (!isMobile) {
    return (
      <section
        id="hero-section"
        ref={sectionRef}
        className="hero-shell relative w-full overflow-hidden"
      >
        <div
          className="hero-paper absolute inset-0"
          aria-hidden="true"
        />

        <div
          className="
            hero-content-grid
            relative
            z-[1]
            mx-auto
            w-full
            max-w-[1350px]
            px-6
            md:px-8
            lg:px-10
          "
          style={{
            gridTemplateColumns: '0.85fr 1.15fr',
            columnGap: '10px',
          }}
        >
          {/* LEFT CONTENT */}
          <div
            ref={copyRef}
            className="hero-copy relative z-[2]"
            style={{
            }}
          >
            <p className="editorial-eyebrow hero-eyebrow">
              SINCE 1977{' '}
              <span className="hero-eyebrow-sep" aria-hidden="true">
                ·
              </span>{' '}
              MUMBAI
            </p>

            <h1 className="hero-title font-display font-bold tracking-tight">
              <span className="block">Babubhai</span>
              <span className="block">Thiba</span>
            </h1>

            <div className="hero-roles">
              <span className="block">
                Producer{' '}
                <span className="hero-pipe" aria-hidden="true">
                  |
                </span>{' '}
                Celebrity Manager{' '}
                <span className="hero-pipe" aria-hidden="true">
                  |
                </span>
              </span>

              <span className="block">
                Consultant: Film, TV, OTT &amp; Ads
              </span>
            </div>

            <div className="hero-rule" aria-hidden="true" />

            <p className="hero-intro font-body">
              Over four decades of experience across film,
              television, OTT and entertainment management.
            </p>

            <div className="hero-action">
              <MagneticButton href="tel:+919867343123" variant="dark">
                Call Us Now
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT PORTRAIT */}
          <div
            ref={portraitStageRef}
            className="hero-portrait-stage relative z-[1]"
            style={{
              marginLeft: '-10px',
            }}
          >
            <img
              ref={portraitRef}
              src="/images/babubhai%20hero.png"
              alt="Babubhai Thiba seated in a black suit"
              className="hero-portrait"
              loading="eager"
              fetchPriority="high"
              draggable={false}
            />
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // MOBILE — rebuilt with plain flexbox, no relative/transform
  // ---------------------------------------------------------
  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="hero-shell w-full overflow-hidden"
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative', // needed only so hero-paper background can sit behind
        paddingTop: "60px"
      }}
    >
      <div
        className="hero-paper absolute inset-0"
        aria-hidden="true"
      />

      {/* Outer flex column — centers everything horizontally */}
      <div
        className="w-full"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 24px',
          boxSizing: 'border-box',
          zIndex: 1,
          gap: "28px"
        }}
      >
        {/* COPY BLOCK */}
        <div
          ref={copyRef}
          className="hero-copy"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            zIndex: 2,
          }}
        >
          <p className="editorial-eyebrow hero-eyebrow">
            SINCE 1977{' '}
            <span className="hero-eyebrow-sep" aria-hidden="true">
              ·
            </span>{' '}
            MUMBAI
          </p>

          <h1 className="hero-title font-display font-bold tracking-tight">
            <span className="block">Babubhai</span>
            <span className="block">Thiba</span>
          </h1>

          <div className="hero-roles">
            <span className="block">
              Producer{' '}
              <span className="hero-pipe" aria-hidden="true">
                |
              </span>{' '}
              Celebrity Manager{' '}
              <span className="hero-pipe" aria-hidden="true">
                |
              </span>
            </span>

            <span className="block">
              Consultant: Film, TV, OTT &amp; Ads
            </span>
          </div>

          <div className="hero-rule" aria-hidden="true" />

          <p className="hero-intro font-body">
            Over four decades of experience across film,
            television, OTT and entertainment management.
          </p>

          <div
            className="hero-action"
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <MagneticButton href="tel:+919867343123" variant="dark">
              Call Us Now
            </MagneticButton>
          </div>
        </div>

        {/* PORTRAIT BLOCK */}
        <div
          ref={portraitStageRef}
          className="hero-portrait-stage"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            zIndex: 1,
          }}
        >
          <img
            ref={portraitRef}
            src="/images/babubhai%20hero.png"
            alt="Babubhai Thiba seated in a black suit"
            className="hero-portrait"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};