import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: '\u{1F3AC}', target: 150, suffix: '+', label: 'Ads' },
  { icon: '\u{1F3A5}', target: 200, suffix: '+', label: 'Films' },
  { icon: '\u{1F4F0}', target: 15, suffix: '', label: 'Years Journalism' },
  { icon: '\u{1F4DA}', target: 25, suffix: '', label: 'Years Publisher' },
];

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, target, duration]);

  return count;
}

const StatItem: React.FC<{
  stat: Stat;
  triggered: boolean;
  index: number;
  showDivider: boolean;
}> = ({ stat, triggered, index, showDivider }) => {
  const [localTriggered, setLocalTriggered] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    const timeout = setTimeout(() => setLocalTriggered(true), index * 120);
    return () => clearTimeout(timeout);
  }, [triggered, index]);

  const count = useCountUp(stat.target, 1200, localTriggered);

  return (
    <div
      className={`flex flex-col items-center text-center px-4 md:px-6 ${showDivider ? 'md:border-r' : ''}`}
      style={{
        flex: 1,
        minWidth: 0,
        borderColor: 'var(--burgundy-divider)',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          lineHeight: 1,
          marginBottom: '12px',
          filter: 'drop-shadow(0 2px 8px rgba(176, 138, 74, 0.18))',
        }}
        aria-hidden="true"
      >
        {stat.icon}
      </div>

      <div
        className="font-display font-bold"
        style={{
          fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
          lineHeight: 1,
          color: 'var(--burgundy-primary)',
          letterSpacing: '0',
          fontVariantNumeric: 'tabular-nums',
          minWidth: '2.5ch',
        }}
      >
        {count}
        <span style={{ fontSize: '0.55em', verticalAlign: 'super', marginLeft: '2px' }}>
          {stat.suffix}
        </span>
      </div>

      <div
        className="editorial-eyebrow mt-3"
        style={{
          color: 'var(--burgundy-secondary)',
          fontSize: '11px',
          letterSpacing: '0.16em',
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="relative py-16 md:py-20"
      style={{
        backgroundColor: 'var(--burgundy-bg)',
        color: 'var(--burgundy-primary)',
        borderBottom: '1px solid var(--burgundy-divider)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', backgroundColor: 'rgba(176, 138, 74, 0.28)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-12 text-center">
          <span
            className="editorial-eyebrow"
            style={{ color: 'var(--burgundy-accent)', fontSize: '11px' }}
          >
            BY THE NUMBERS
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
          {STATS.map((stat, idx) => (
            <StatItem
              key={stat.label}
              stat={stat}
              triggered={triggered}
              index={idx}
              showDivider={idx < STATS.length - 1}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', backgroundColor: 'rgba(176, 138, 74, 0.28)' }}
      />
    </section>
  );
};
