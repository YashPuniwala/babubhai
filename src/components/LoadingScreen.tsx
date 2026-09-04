import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  /* ---------------------------------------------------------
     FORCE PAGE TO TOP WHILE LOADING
  --------------------------------------------------------- */
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: false,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* ---------------------------------------------------------
     COMPLETE LOADING
  --------------------------------------------------------- */
  const completeLoading = useCallback(() => {
    if (isExiting) return;

    setProgress(100);
    setIsExiting(true);
  }, [isExiting]);

  /* ---------------------------------------------------------
     PROGRESS
  --------------------------------------------------------- */
  useEffect(() => {
    if (isExiting) return;

    const duration = 1800;
    const interval = 25;
    const steps = duration / interval;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      const t = Math.min(currentStep / steps, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - t, 3);

      const value = Math.min(
        Math.round(eased * 100),
        100
      );

      setProgress(value);

      if (value >= 100) {
        clearInterval(timer);

        // Small pause at 100%
        setTimeout(() => {
          completeLoading();
        }, 120);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isExiting, completeLoading]);

  /* ---------------------------------------------------------
     SKIP ON CLICK / WHEEL / TOUCH
  --------------------------------------------------------- */
  useEffect(() => {
    if (isExiting) return;

    const handleSkip = () => {
      completeLoading();
    };

    window.addEventListener('click', handleSkip, {
      once: true,
    });

    window.addEventListener('wheel', handleSkip, {
      once: true,
      passive: true,
    });

    window.addEventListener('touchstart', handleSkip, {
      once: true,
      passive: true,
    });

    return () => {
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, [completeLoading, isExiting]);

  /* ---------------------------------------------------------
     NOTIFY APP AFTER EXIT ANIMATION
  --------------------------------------------------------- */
  const handleExitComplete = () => {
    // Absolutely ensure page starts at top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    onComplete();
  };

  /* ---------------------------------------------------------
     APERTURE
  --------------------------------------------------------- */
  const bladeCount = 8;

  const blades = Array.from(
    { length: bladeCount },
    (_, i) => {
      const angle = (i * 360) / bladeCount;

      return {
        angle,
        key: i,
      };
    }
  );

  /* ---------------------------------------------------------
     PROGRESS RING
  --------------------------------------------------------- */
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (progress / 100) * circumference;

  const bladeSpread =
    isExiting
      ? 25
      : (progress / 100) * 12;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={handleExitComplete}
    >
      {!isExiting && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{
            zIndex: 200,
            backgroundColor: 'var(--bg-dark)',
          }}
          initial={{
            y: 0,
          }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* -------------------------------------------------
              APERTURE + PROGRESS
          ------------------------------------------------- */}
          <div
            className="
              relative
              w-28 h-28
              md:w-40 md:h-40
              lg:w-48 lg:h-48
              flex items-center justify-center
              mb-6
            "
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              style={{
                transform: 'rotate(-90deg)',
              }}
            >
              {/* Outer ring */}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(242, 238, 231, 0.06)"
                strokeWidth="0.5"
              />

              {/* Aperture blades */}
              <g
                style={{
                  transform: 'rotate(90deg)',
                  transformOrigin: '50px 50px',
                }}
              >
                {blades.map((blade) => (
                  <g
                    key={blade.key}
                    style={{
                      transform: `rotate(${
                        blade.angle + bladeSpread
                      }deg)`,
                      transformOrigin: '50px 50px',
                      transition:
                        'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <path
                      d="M 47,8 L 53,8 L 54,22 L 46,22 Z"
                      fill="none"
                      stroke="var(--accent-soft)"
                      strokeWidth="0.4"
                      opacity={
                        0.35 +
                        (progress / 100) * 0.35
                      }
                      style={{
                        transition:
                          'opacity 0.3s ease',
                      }}
                    />

                    <line
                      x1="50"
                      y1="4"
                      x2="50"
                      y2="10"
                      stroke="rgba(242, 238, 231, 0.15)"
                      strokeWidth="0.6"
                    />
                  </g>
                ))}
              </g>

              {/* Background progress track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgba(242, 238, 231, 0.08)"
                strokeWidth="1"
              />

              {/* Progress */}
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="var(--accent-soft)"
                strokeWidth="1.2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition:
                    'stroke-dashoffset 0.1s linear',
                }}
              />

              {/* Inner ring */}
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="rgba(242, 238, 231, 0.04)"
                strokeWidth="0.4"
              />
            </svg>

            {/* Counter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                key={progress}
                initial={{
                  opacity: 0.5,
                  y: 2,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  font-display
                  text-2xl
                  md:text-4xl
                  lg:text-5xl
                  tracking-tight
                  tabular-nums
                "
                style={{
                  color: 'var(--text-light)',
                }}
              >
                {progress}
              </motion.span>
            </div>
          </div>

          {/* -------------------------------------------------
              LABEL
          ------------------------------------------------- */}
          <motion.div
            className="flex flex-col items-center gap-1.5"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <span
              className="editorial-eyebrow tracking-[0.2em]"
              style={{
                color: 'var(--burgundy-secondary)',
              }}
            >
              LOADING
            </span>

            <span
              className="editorial-eyebrow tracking-[0.18em]"
              style={{
                color: 'var(--text-light)',
                fontSize: '12px',
              }}
            >
              BABUBHAI THIBA
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};