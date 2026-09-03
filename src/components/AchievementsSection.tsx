import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Achievement {
  number: string;
  title: string;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    number: 'I',
    title: 'Dadasaheb Phalke Award, 2008',
    description:
      'Received the prestigious Dadasaheb Phalke Award in 2008 for outstanding contribution to Indian Cinema.',
  },
  {
    number: 'II',
    title: 'Treasurer, IMPAA',
    description:
      'Treasurer of the Indian Motion Picture Producers Association (IMPAA) for 15+ years.',
  },
  {
    number: 'III',
    title: 'Senior Vice President',
    description: 'Senior Vice President, Dadasaheb Phalke Film Foundation.',
  },
  {
    number: 'IV',
    title: 'General Secretary, BJFTA',
    description:
      'General Secretary, BJP-Supported BJ Film & Television Industry Association (BJFTA).',
  },
  {
    number: 'V',
    title: 'Vice President',
    description: 'Vice President, International Human Rights Council.',
  },
  {
    number: 'VI',
    title: 'President, Samvet Trust',
    description: 'President of Samvet Trust (Yoga and Ayurveda).',
  },
  {
    number: 'VII',
    title: 'National Joint Secretary',
    description: 'National Joint Secretary of Peace India International, an NGO.',
  },
  {
    number: 'VIII',
    title: 'Publisher',
    description: 'Publisher of the Show World Film & TV Directory for 25 years.',
  },
];

/* ─── Entry Component ─── */
const LedgerEntry: React.FC<{
  item: Achievement;
  index: number;
  isHero: boolean;
  side: 'left' | 'right';
  isMobile: boolean;
  isTablet: boolean;
  nodeRef: (el: HTMLDivElement | null, index: number) => void;
  textRef: (el: HTMLDivElement | null, index: number) => void;
  tickRef: (el: HTMLDivElement | null, index: number) => void;
  onHover: (index: number | null) => void;
  hoveredIndex: number | null;
  onTap: (index: number) => void;
}> = ({ item, index, isHero, side, isMobile, isTablet, nodeRef, textRef, tickRef, onHover, hoveredIndex, onTap }) => {
  const isHovered = hoveredIndex === index;

  // Mobile: spine on left, everything on right side
  const effectiveSide = isMobile ? 'right' : side;

  // Tick line length
  const tickLength = isMobile ? '24px' : isTablet ? '40px' : '64px';

  // Node size
  const nodeSize = isHero ? 16 : 10;
  const nodeGlow = isHero;

  // Text block max width
  const textMaxWidth = isMobile ? 'calc(100% - 44px)' : '380px';

  return (
    <div
      className="relative w-full"
      style={{
        minHeight: isMobile ? 'auto' : isHero ? '120px' : '100px',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onTap(index)}
    >
      {/* Node — positioned on spine via wrapper; inner div animated by GSAP */}
      <div
        className="absolute top-1/2"
        style={{
          left: isMobile ? '8px' : '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
        }}
      >
        <div
          ref={(el) => nodeRef(el, index)}
          style={{
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
            borderRadius: '50%',
            backgroundColor: isHovered ? 'var(--burgundy-accent)' : 'var(--burgundy-divider)',
            border: isHero ? '2px solid var(--burgundy-accent)' : '1px solid var(--burgundy-divider)',
            boxShadow: nodeGlow
              ? '0 0 24px rgba(176, 138, 74, 0.35), 0 0 48px rgba(176, 138, 74, 0.14)'
              : isHovered
                ? '0 0 16px rgba(176, 138, 74, 0.28)'
                : 'none',
            transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Tick line — positioned via wrapper; inner div animated by GSAP */}
      <div
        className="absolute top-1/2"
        style={{
          left: isMobile ? '8px' : '50%',
          transform: 'translateY(-50%)',
          width: tickLength,
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={(el) => tickRef(el, index)}
          style={{
            width: '100%',
            height: isHovered ? '2px' : '1px',
            backgroundColor: isHovered ? 'var(--burgundy-accent)' : 'var(--burgundy-divider)',
            transformOrigin: effectiveSide === 'right' ? 'left center' : 'right center',
            transition: 'background-color 0.4s ease, height 0.3s ease',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Text block — positioned via wrapper; inner div animated by GSAP */}
      <div
        className={isMobile ? 'relative' : 'absolute top-1/2'}
        style={{
          left: isMobile ? undefined : effectiveSide === 'right' ? `calc(50% + ${tickLength} + 16px)` : undefined,
          right: isMobile ? undefined : effectiveSide === 'left' ? `calc(50% + ${tickLength} + 16px)` : undefined,
          marginLeft: isMobile ? '44px' : undefined,
          transform: isMobile ? 'none' : 'translateY(-50%)',
          maxWidth: textMaxWidth,
          width: isMobile ? textMaxWidth : undefined,
          padding: isMobile ? '18px 0 18px' : undefined,
          zIndex: 4,
        }}
      >
        <div ref={(el) => textRef(el, index)} style={{ willChange: 'transform, opacity' }}>
          {/* Numeral label */}
          <span
            className="editorial-eyebrow block mb-1.5"
            style={{
              color: 'var(--burgundy-accent)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              transition: 'color 0.4s ease',
            }}
          >
            {item.number}
          </span>
          {/* Title */}
          <h3
            className="font-display font-bold tracking-tight leading-tight mb-1"
            style={{
              color: isHovered ? 'var(--burgundy-primary)' : 'rgba(242, 238, 231, 0.88)',
              fontSize: isHero
                ? 'clamp(1.25rem, 2.5vw, 1.85rem)'
                : 'clamp(1.05rem, 1.8vw, 1.4rem)',
              transition: 'color 0.4s ease',
              overflowWrap: 'break-word',
            }}
          >
            {item.title}
          </h3>
          {/* Description */}
          <p
            className="font-body leading-relaxed"
            style={{
              color: 'var(--burgundy-secondary)',
              fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
              lineHeight: '1.6',
              transition: 'color 0.4s ease',
              overflowWrap: 'break-word',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Achievements Section ─── */
export const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const setNodeRef = useCallback((el: HTMLDivElement | null, index: number) => {
    nodeRefs.current[index] = el;
  }, []);
  const setTextRef = useCallback((el: HTMLDivElement | null, index: number) => {
    textRefs.current[index] = el;
  }, []);
  const setTickRef = useCallback((el: HTMLDivElement | null, index: number) => {
    tickRefs.current[index] = el;
  }, []);

  // Track viewport size
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // IntersectionObserver for will-change cleanup on mobile
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Remove will-change when off-screen on mobile
  useEffect(() => {
    if (!isMobile) return;
    if (!isInView) {
      [nodeRefs.current, textRefs.current, tickRefs.current].forEach((refs) => {
        refs.forEach((el) => {
          if (el) el.style.willChange = 'auto';
        });
      });
    }
  }, [isMobile, isInView]);

  // Spine draw-in + node/tick/text reveal — all driven by same scroll progress
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reduced motion: spine fully drawn, entries fade in with opacity only
      if (spineRef.current) {
        gsap.set(spineRef.current, { scaleY: 1, opacity: 0.5 });
      }
      nodeRefs.current.forEach((node) => {
        if (node) gsap.set(node, { opacity: 1, scale: 1 });
      });
      tickRefs.current.forEach((tick) => {
        if (tick) gsap.set(tick, { scaleX: 1, opacity: 0.5 });
      });
      textRefs.current.forEach((text) => {
        if (text) gsap.set(text, { opacity: 0 });
      });
      // Fade in text on scroll
      const ctx = gsap.context(() => {
        textRefs.current.forEach((text) => {
          if (!text) return;
          gsap.to(text, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 90%',
            },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(spineRef.current, { scaleY: 0, transformOrigin: 'top center', opacity: 0.5 });
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        gsap.set(node, { opacity: 0.3, scale: 0.6 });
      });
      tickRefs.current.forEach((tick) => {
        if (!tick) return;
        gsap.set(tick, { scaleX: 0, opacity: 0 });
      });
      textRefs.current.forEach((text) => {
        if (!text) return;
        gsap.set(text, { opacity: 0, x: 0 });
      });

      // Master timeline driven by scroll scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.8,
        },
      });

      // Phase 1: Spine draws from top to bottom
      tl.to(spineRef.current, {
        scaleY: 1,
        opacity: 0.5,
        ease: 'none',
        duration: 8,
      });

      // Phase 2: For each entry, light up node → draw tick → slide in text
      ACHIEVEMENTS.forEach((_, i) => {
        const node = nodeRefs.current[i];
        const tick = tickRefs.current[i];
        const text = textRefs.current[i];
        if (!node || !tick || !text) return;

        const isMobileNow = window.matchMedia('(max-width: 767px)').matches;
        const side = isMobileNow ? 'right' : (i % 2 === 0 ? 'right' : 'left');
        const textX = side === 'right' ? 16 : -16;

        // Node lights up
        tl.to(node, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, i * 0.8 + 0.3)
          // Tick draws in slightly after node
          .to(tick, {
            scaleX: 1,
            opacity: 0.5,
            duration: 0.4,
            ease: 'power2.out',
          }, i * 0.8 + 0.4)
          // Text slides in from its side with tiny stagger
          .fromTo(text, {
            opacity: 0,
            x: textX,
          }, {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, i * 0.8 + 0.5);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const handleTap = useCallback((index: number) => {
    if (window.matchMedia('(pointer: fine)').matches) return;
    setHoveredIndex(index);
    setTimeout(() => setHoveredIndex(null), 2000);
  }, []);

  return (
    <section
      id="achievements-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--burgundy-bg)',
        color: 'var(--burgundy-primary)',
        minHeight: '100vh',
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="max-w-[1440px] mx-auto px-6 md:px-12 relative"
        style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '120px' }}
      >
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <span
            className="editorial-eyebrow mb-4 block"
            style={{ color: 'var(--burgundy-accent)' }}
          >
            CREDENTIALS
          </span>
          <h2
            className="clamp-h2 font-display font-bold tracking-tight mb-3"
            style={{ color: 'var(--burgundy-primary)' }}
          >
            Achievements
          </h2>
          <p
            className="font-body"
            style={{
              color: 'var(--burgundy-secondary)',
              maxWidth: '40ch',
              lineHeight: '1.6',
              fontSize: '0.95rem',
            }}
          >
            Forty-five years of leadership acknowledged by national film honors and
            producers associations.
          </p>
        </div>

        {/* Vertical Ledger / Spine */}
        <div
          ref={listRef}
          className="relative mx-auto"
          style={{
            maxWidth: '900px',
          }}
        >
          {/* The Spine — vertical line */}
          <div
            ref={spineRef}
            className="absolute top-0 bottom-0"
            style={{
              left: isMobile ? '8px' : '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              backgroundColor: 'var(--burgundy-divider)',
              willChange: 'transform, opacity',
            }}
          />

          {/* Entries */}
          <div className="relative flex flex-col" style={{ gap: 'clamp(20px, 4vh, 48px)' }}>
            {ACHIEVEMENTS.map((item, index) => (
              <LedgerEntry
                key={item.number}
                item={item}
                index={index}
                isHero={index === 0}
                side={index % 2 === 0 ? 'right' : 'left'}
                isMobile={isMobile}
                isTablet={isTablet}
                nodeRef={setNodeRef}
                textRef={setTextRef}
                tickRef={setTickRef}
                onHover={setHoveredIndex}
                hoveredIndex={hoveredIndex}
                onTap={handleTap}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
