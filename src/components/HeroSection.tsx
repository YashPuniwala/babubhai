import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { AboutSection } from './AboutSection';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC<{ ready?: boolean }> = ({ ready = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  // Individual hero element refs for stagger animation
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);

    update();

    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  /* ---------------------------------------------------------
   * STEP 1: Pre-hide all elements on mount so they are
   * invisible while the loading screen is on top.
   * This runs once, immediately, before any animation.
   * --------------------------------------------------------- */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const staggerTargets = [
      eyebrowRef.current,
      titleLine1Ref.current,
      titleLine2Ref.current,
      rolesRef.current,
      ruleRef.current,
      introRef.current,
      actionRef.current,
    ].filter(Boolean);

    gsap.set(staggerTargets, { opacity: 0, y: 24 });
    gsap.set(portraitRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.985,
      filter: 'grayscale(0.25) sepia(6%) brightness(0.96) contrast(1.02)',
    });
  }, []); // ← once only, on mount

  /* ---------------------------------------------------------
   * STEP 2: Fire entrance animation ONLY after loading screen
   * has fully exited (ready === true). Re-runs if isMobile
   * changes so parallax stays correct after resize.
   * --------------------------------------------------------- */
  useEffect(() => {
    // Do nothing until the loading screen has fully left
    if (!ready) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      // Immediately show everything for reduced-motion users
      gsap.set(
        [
          copyRef.current,
          portraitRef.current,
          eyebrowRef.current,
          titleLine1Ref.current,
          titleLine2Ref.current,
          rolesRef.current,
          ruleRef.current,
          introRef.current,
          actionRef.current,
        ],
        { clearProps: 'all' }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 0.08 });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const heroEls: { ref: React.RefObject<any>; pos: number }[] = [
        { ref: eyebrowRef,    pos: 0    },
        { ref: titleLine1Ref, pos: 0.10 },
        { ref: titleLine2Ref, pos: 0.18 },
        { ref: rolesRef,      pos: 0.27 },
        { ref: ruleRef,       pos: 0.35 },
        { ref: introRef,      pos: 0.42 },
        { ref: actionRef,     pos: 0.52 },
      ];

      heroEls.forEach(({ ref, pos }) => {
        if (!ref.current) return;
        intro.to(
          ref.current,
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          pos
        );
      });

      // Portrait fades + rises in parallel with text
      intro.to(
        portraitRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'grayscale(0) sepia(0%) brightness(1) contrast(1)',
          duration: 1.1,
          ease: 'power3.out',
        },
        0.15
      );

      // Desktop-only scroll parallax
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
  }, [isMobile, ready]); // ← re-runs if mobile breakpoint changes

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
            style={{}}
          >
            <p ref={eyebrowRef} className="editorial-eyebrow hero-eyebrow">
              SINCE 1977{' '}
              <span className="hero-eyebrow-sep" aria-hidden="true">
                ·
              </span>{' '}
              MUMBAI
            </p>

            <h1 className="hero-title font-display font-bold tracking-tight">
              <span className="block" ref={titleLine1Ref}>Babubhai</span>
              <span className="block" ref={titleLine2Ref}>Thiba</span>
            </h1>

            <div className="hero-roles" ref={rolesRef}>
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

            <div className="hero-rule" aria-hidden="true" ref={ruleRef} />

            <p className="hero-intro font-body" ref={introRef}>
              Over four decades of experience across film,
              television, OTT and entertainment management.
            </p>

            <div className="hero-action" ref={actionRef}>
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
          <p ref={eyebrowRef} className="editorial-eyebrow hero-eyebrow">
            SINCE 1977{' '}
            <span className="hero-eyebrow-sep" aria-hidden="true">
              ·
            </span>{' '}
            MUMBAI
          </p>

          <h1 className="hero-title font-display font-bold tracking-tight">
            <span className="block" ref={titleLine1Ref}>Babubhai</span>
            <span className="block" ref={titleLine2Ref}>Thiba</span>
          </h1>

          <div className="hero-roles" ref={rolesRef}>
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

          <div className="hero-rule" aria-hidden="true" ref={ruleRef} />

          <p className="hero-intro font-body" ref={introRef}>
            Over four decades of experience across film,
            television, OTT and entertainment management.
          </p>

          <div
            className="hero-action"
            ref={actionRef}
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