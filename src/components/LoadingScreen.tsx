import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading');

  const skip = useCallback(() => {
    if (phase === 'loading') {
      setProgress(100);
      setPhase('revealing');
    }
  }, [phase]);

  // Progress counter
  useEffect(() => {
    if (phase !== 'loading') return;

    const duration = 1800;
    const interval = 25;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.min(Math.round(eased * 100), 100);
      setProgress(value);

      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => setPhase('revealing'), 150);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  // Revealing → done after clip-path animation
  useEffect(() => {
    if (phase !== 'revealing') return;
    const timeout = setTimeout(() => setPhase('done'), 900);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Skip on scroll/click/tap
  useEffect(() => {
    const handleSkip = () => skip();
    window.addEventListener('click', handleSkip, { once: true });
    window.addEventListener('wheel', handleSkip, { once: true, passive: true });
    window.addEventListener('touchstart', handleSkip, { once: true, passive: true });
    return () => {
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [skip]);

  // Iris blade paths — 8 angled blade shapes forming an aperture ring
  const bladeCount = 8;
  const blades = Array.from({ length: bladeCount }, (_, i) => {
    const angle = (i * 360) / bladeCount;
    return { angle, key: i };
  });

  // Progress ring calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Blade spread: blades rotate outward as progress increases
  const bladeSpread = phase === 'revealing' ? 25 : (progress / 100) * 12;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          style={{
            zIndex: 200,
            backgroundColor: 'var(--bg-dark)',
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 },
          }}
        >
          {/* Aperture + Progress Ring */}
          <div className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center mb-6">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Outer decorative ring */}
              <circle
                cx="50" cy="50" r="48"
                fill="none"
                stroke="rgba(242, 238, 231, 0.06)"
                strokeWidth="0.5"
              />

              {/* Aperture blade marks — thin radial lines suggesting iris blades */}
              <g style={{ transform: 'rotate(90deg)', transformOrigin: '50px 50px' }}>
                {blades.map((blade) => (
                  <g
                    key={blade.key}
                    style={{
                      transform: `rotate(${blade.angle + bladeSpread}deg)`,
                      transformOrigin: '50px 50px',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Blade shape — elongated trapezoid */}
                    <path
                      d={`M 47,8 L 53,8 L 54,22 L 46,22 Z`}
                      fill="none"
                      stroke="var(--accent-soft)"
                      strokeWidth="0.4"
                      opacity={0.35 + (progress / 100) * 0.35}
                      style={{
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    {/* Thin tick mark */}
                    <line
                      x1="50" y1="4" x2="50" y2="10"
                      stroke="rgba(242, 238, 231, 0.15)"
                      strokeWidth="0.6"
                    />
                  </g>
                ))}
              </g>

              {/* Background circle track */}
              <circle
                cx="50" cy="50" r={radius}
                fill="none"
                stroke="rgba(242, 238, 231, 0.08)"
                strokeWidth="1"
              />

              {/* Progress ring */}
              <motion.circle
                cx="50" cy="50" r={radius}
                fill="none"
                stroke="var(--accent-soft)"
                strokeWidth="1.2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />

              {/* Inner decorative ring */}
              <circle
                cx="50" cy="50" r="30"
                fill="none"
                stroke="rgba(242, 238, 231, 0.04)"
                strokeWidth="0.4"
              />
            </svg>

            {/* Counter in center */}
            <div className="absolute inset-0 flex items-center justify-center flex-col" style={{ transform: 'rotate(0deg)' }}>
              <span
                className="font-display text-2xl md:text-4xl lg:text-5xl tracking-tight tabular-nums"
                style={{ color: 'var(--text-light)' }}
              >
                {progress}
              </span>
            </div>
          </div>

          {/* Label below */}
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="editorial-eyebrow tracking-[0.2em]"
              style={{ color: 'var(--burgundy-secondary)' }}
            >
              LOADING
            </span>
            <span
              className="editorial-eyebrow tracking-[0.18em]"
              style={{ color: 'var(--text-light)', fontSize: '12px' }}
            >
              BABUBHAI THIBA
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
