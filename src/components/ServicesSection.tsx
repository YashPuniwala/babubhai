import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, TrendingUp, Film } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
}

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: idx * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services: ServiceCard[] = [
    {
      icon: (
        <Users
          className="w-5 h-5"
          strokeWidth={1.5}
        />
      ),
      title: 'Celebrity Manager',
      bullets: [
        'Providing artists for Film, TV, OTT & Events',
        'Managing the business of celebrities exclusively',
      ],
    },
    {
      icon: (
        <TrendingUp
          className="w-5 h-5"
          strokeWidth={1.5}
        />
      ),
      title: 'Marketing',
      bullets: [
        'Setting up Film and OTT projects from script to screen',
        'Distribution and pitching to OTT platforms and corporates',
        'Sales of films and web series',
        'Finance tie-ups',
      ],
    },
    {
      icon: (
        <Film
          className="w-5 h-5"
          strokeWidth={1.5}
        />
      ),
      title: 'Production & Publicity',
      bullets: [
        'Production',
        'PR and branding',
        'In-film advertising tie-ups',
      ],
    },
  ];

  /*
   * Force the service button to remain visible
   * when the card changes to the burgundy background.
   */
  const setButtonHoverStyle = (
    card: HTMLDivElement,
    active: boolean
  ) => {
    const buttons = card.querySelectorAll(
      'a, button'
    ) as NodeListOf<HTMLElement>;

    buttons.forEach((button) => {
      if (active) {
        // Strong light button on burgundy background
        button.style.setProperty(
          'color',
          'var(--text-light)',
          'important'
        );

        button.style.setProperty(
          'border-color',
          'rgba(255, 255, 255, 0.45)',
          'important'
        );

        button.style.setProperty(
          'background-color',
          'transparent',
          'important'
        );

        button.style.setProperty(
          'opacity',
          '1',
          'important'
        );

        button.style.setProperty(
          'visibility',
          'visible',
          'important'
        );

        button.style.setProperty(
          'z-index',
          '50',
          'important'
        );
      } else {
        // Restore original outline button
        button.style.removeProperty('color');
        button.style.removeProperty('border-color');
        button.style.removeProperty(
          'background-color'
        );
        button.style.removeProperty('opacity');
        button.style.removeProperty('visibility');
        button.style.removeProperty('z-index');
      }
    });
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;

    card.style.backgroundColor =
      'var(--burgundy-bg)';

    card.style.zIndex = '5';

    const title = card.querySelector(
      '[data-role="title"]'
    ) as HTMLElement;

    const icon = card.querySelector(
      '[data-role="icon"]'
    ) as HTMLElement;

    const line = card.querySelector(
      '[data-role="line"]'
    ) as HTMLElement;

    const bullets = card.querySelectorAll(
      '[data-role="bullet"]'
    ) as NodeListOf<HTMLElement>;

    const dots = card.querySelectorAll(
      '[data-role="dot"]'
    ) as NodeListOf<HTMLElement>;

    if (title) {
      title.style.color =
        'var(--text-light)';
    }

    if (icon) {
      icon.style.color =
        'var(--accent-soft)';
    }

    if (line) {
      line.style.backgroundColor =
        'var(--accent-soft)';
    }

    bullets.forEach((bullet) => {
      bullet.style.color =
        'var(--burgundy-secondary)';
    });

    dots.forEach((dot) => {
      dot.style.backgroundColor =
        'var(--accent-soft)';
    });

    // FIX BUTTON
    setButtonHoverStyle(card, true);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;

    card.style.backgroundColor =
      'var(--bg-light-alt)';

    card.style.zIndex = '1';

    const title = card.querySelector(
      '[data-role="title"]'
    ) as HTMLElement;

    const icon = card.querySelector(
      '[data-role="icon"]'
    ) as HTMLElement;

    const line = card.querySelector(
      '[data-role="line"]'
    ) as HTMLElement;

    const bullets = card.querySelectorAll(
      '[data-role="bullet"]'
    ) as NodeListOf<HTMLElement>;

    const dots = card.querySelectorAll(
      '[data-role="dot"]'
    ) as NodeListOf<HTMLElement>;

    if (title) {
      title.style.color =
        'var(--text-dark)';
    }

    if (icon) {
      icon.style.color =
        'var(--text-muted)';
    }

    if (line) {
      line.style.backgroundColor =
        'rgba(33, 28, 24, 0.15)';
    }

    bullets.forEach((bullet) => {
      bullet.style.color =
        'rgba(33, 28, 24, 0.7)';
    });

    dots.forEach((dot) => {
      dot.style.backgroundColor =
        'var(--text-muted)';
    });

    // RESTORE BUTTON
    setButtonHoverStyle(card, false);
  };

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="
        relative
        isolate
        z-[10]
        overflow-hidden
        py-14
        md:py-36
      "
      style={{
        backgroundColor:
          'var(--bg-light)',
        color: 'var(--text-dark)',
        borderBottom:
          '1px solid var(--divider-light)',
      }}
    >
      {/* =========================
          SECTION HEADER
      ========================== */}

      <div
        className="
          relative
          z-[10]
          max-w-[1440px]
          mx-auto
          px-6
          md:px-12
           mb-8
          md:mb-16
        "
      >
        <span
          className="editorial-eyebrow mb-4 block"
          style={{
            color:
              'var(--text-muted)',
          }}
        >
          WHAT WE DO
        </span>

        <h2
          className="
            clamp-h2
            font-display
            font-bold
            tracking-tight
            mb-3
          "
          style={{
            color:
              'var(--text-dark)',
          }}
        >
          Our Services.
        </h2>

        <p
          className="font-body"
          style={{
            color:
              'rgba(33, 28, 24, 0.6)',
            fontSize: '1.05rem',
          }}
        >
          Contact us on{' '}
          <a
            href="tel:+919867343123"
            style={{
              color:
                'var(--accent)',
              textDecoration:
                'underline',
              textUnderlineOffset:
                '4px',
              transition:
                'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color =
                'var(--accent-soft)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                'var(--accent)';
            }}
          >
            +91 98673 43123
          </a>
        </p>
      </div>

      {/* =========================
          SERVICE CARDS
      ========================== */}

      <div
        className="
          relative
          z-[10]
          max-w-[1440px]
          mx-auto
           px-4
          md:px-12
          grid
          grid-cols-1
          md:grid-cols-3
           gap-4
          md:gap-8
        "
      >
        {services.map((item, idx) => (
          <div
            key={item.title}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="
              group
              relative
              z-[1]
              flex
              flex-col
              justify-start
              md:justify-between
              overflow-hidden
              p-5
              md:p-[clamp(28px,3vw,40px)]
              min-h-0
              md:min-h-[320px]
            "
            style={{
              backgroundColor:
                'var(--bg-light-alt)',

              transition:
                'background-color 0.5s ease, color 0.5s ease',

              isolation: 'isolate',

              transform:
                'translateZ(0)',

              willChange:
                'background-color',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* CARD CONTENT */}

            <div
              className="
                relative
                z-[2]
              "
            >
              {/* ICON */}

              <div
                data-role="icon"
                className="mb-4 md:mb-6"
                style={{
                  color:
                    'var(--text-muted)',
                  transition:
                    'color 0.5s ease',
                  position:
                    'relative',
                  zIndex: 2,
                }}
              >
                {item.icon}
              </div>

              {/* LINE */}

              <div
                data-role="line"
                className="mb-4 md:mb-6"
                aria-hidden="true"
                style={{
                  width: '32px',
                  height: '1px',
                  backgroundColor:
                    'rgba(33, 28, 24, 0.15)',
                  transition:
                    'background-color 0.5s ease',
                  position:
                    'relative',
                  zIndex: 2,
                }}
              />

              {/* TITLE */}

              <h3
                data-role="title"
                className="
                  font-display
                  font-bold
                  tracking-tight
                  mb-4
                  md:mb-5
                "
                style={{
                  fontSize:
                    'clamp(1.25rem, 2vw, 1.75rem)',
                  color:
                    'var(--text-dark)',
                  transition:
                    'color 0.5s ease',
                  position:
                    'relative',
                  zIndex: 2,
                }}
              >
                {item.title}
              </h3>

              {/* BULLETS */}

              <ul
                className="
                  flex
                  flex-col
                  gap-2.5
                   mb-4
                   md:mb-8
                "
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  position:
                    'relative',
                  zIndex: 2,
                }}
              >
                {item.bullets.map(
                  (bullet) => (
                    <li
                      key={bullet}
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >
                      {/* DOT */}

                      <span
                        data-role="dot"
                        className="
                          shrink-0
                          mt-[6px]
                        "
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius:
                            '50%',
                          backgroundColor:
                            'var(--text-muted)',
                          transition:
                            'background-color 0.5s ease',
                          display:
                            'inline-block',
                        }}
                      />

                      {/* BULLET TEXT */}

                      <span
                        data-role="bullet"
                        className="
                          font-body
                          leading-relaxed
                        "
                        style={{
                          color:
                            'rgba(33, 28, 24, 0.7)',
                          fontSize:
                            'clamp(0.88rem, 1vw, 0.98rem)',
                          lineHeight:
                            '1.6',
                          transition:
                            'color 0.5s ease',
                        }}
                      >
                        {bullet}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* =========================
                CALL US BUTTON
            ========================== */}

            <div
              className="
                relative
                z-[50]
                mt-4
                md:mt-auto
              "
              style={{
                isolation:
                  'isolate',
              }}
            >
              <MagneticButton
                href="tel:+919867343123"
                variant="outline"
                className="
                  service-call-button
                  relative
                  z-[50]
                  w-full
                "
              >
                Call Us
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};