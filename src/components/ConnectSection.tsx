import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  ArrowRight,
  Film,
  Handshake,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA
========================================================= */

const CATEGORIES = [
  {
    icon: <Film className="w-[18px] h-[18px]" strokeWidth={1.35} />,
    label: 'PROJECTS',
  },
  {
    icon: <Handshake className="w-[18px] h-[18px]" strokeWidth={1.35} />,
    label: 'COLLABORATIONS',
  },
  {
    icon: <Lightbulb className="w-[18px] h-[18px]" strokeWidth={1.35} />,
    label: 'OPPORTUNITIES',
  },
  {
    icon: <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.35} />,
    label: 'CONVERSATIONS',
  },
];

/* =========================================================
   GMAIL COMPOSE URL
========================================================= */

const GMAIL_HREF =
  'https://mail.google.com/mail/?view=cm&fs=1' +
  '&to=' +
  encodeURIComponent('btthiba@gmail.com') +
  '&su=' +
  encodeURIComponent('Enquiry – Babubhai Thiba') +
  '&body=' +
  encodeURIComponent(
    `Hello Babubhai Thiba,

I would like to get in touch regarding a project / collaboration / opportunity.

Please let me know a convenient time to connect.

Regards,
[Name]`
  );

/* =========================================================
   CONNECT SECTION
========================================================= */

export const ConnectSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /* Main text */
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingWordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bodyLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* CTA */
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);
  const ctaIconRef = useRef<SVGSVGElement>(null);
  const helperRef = useRef<HTMLParagraphElement>(null);

  /* Bottom section */
  const lineRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const categoryIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const categoryTextRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* Decorative */
  const decorativeRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     SCROLL ANIMATION
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      if (prefersReducedMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            headingRef.current,
            bodyRef.current,
            ctaRef.current,
            helperRef.current,
            lineRef.current,
            decorativeRef.current,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
            rotateX: 0,
          }
        );

        headingWordRefs.current.forEach((el) => {
          if (el) {
            gsap.set(el, {
              opacity: 1,
              y: 0,
              rotateX: 0,
            });
          }
        });

        bodyLineRefs.current.forEach((el) => {
          if (el) {
            gsap.set(el, {
              opacity: 1,
              y: 0,
            });
          }
        });

        categoryIconRefs.current.forEach((el) => {
          if (el) {
            gsap.set(el, {
              opacity: 1,
              y: 0,
              scale: 1,
            });
          }
        });

        categoryTextRefs.current.forEach((el) => {
          if (el) {
            gsap.set(el, {
              opacity: 1,
              y: 0,
            });
          }
        });

        return;
      }

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 25,
      });

      headingWordRefs.current.forEach((el) => {
        if (!el) return;

        gsap.set(el, {
          opacity: 0,
          y: 80,
          rotateX: 18,
          transformOrigin: 'center bottom',
        });
      });

      bodyLineRefs.current.forEach((el) => {
        if (!el) return;

        gsap.set(el, {
          opacity: 0,
          y: 30,
        });
      });

      gsap.set(ctaRef.current, {
        opacity: 0,
        y: 35,
        scale: 0.94,
      });

      if (ctaTextRef.current) {
        gsap.set(ctaTextRef.current, {
          opacity: 0,
          y: 12,
        });
      }

      if (ctaIconRef.current) {
        gsap.set(ctaIconRef.current, {
          opacity: 0,
          x: -10,
        });
      }

      gsap.set(helperRef.current, {
        opacity: 0,
        y: 15,
      });

      gsap.set(lineRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
      });

      categoryIconRefs.current.forEach((el) => {
        if (!el) return;

        gsap.set(el, {
          opacity: 0,
          y: 25,
          scale: 0.75,
        });
      });

      categoryTextRefs.current.forEach((el) => {
        if (!el) return;

        gsap.set(el, {
          opacity: 0,
          y: 22,
        });
      });

      gsap.set(decorativeRef.current, {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'top center',
      });

      /* =====================================================
         MAIN TIMELINE

         Same animation timing as current version.
         No background CONNECT animation.
      ===================================================== */

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power3.out',
        },
      });

      /* =====================================================
         01 — DECORATIVE LINE
      ===================================================== */

      tl.to(
        decorativeRef.current,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0
      );

      /* =====================================================
         02 — EYEBROW
      ===================================================== */

      tl.to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        0.05
      );

      /* =====================================================
         03 — HEADING WORD 1
      ===================================================== */

      tl.to(
        headingWordRefs.current[0],
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          ease: 'power4.out',
        },
        0.22
      );

      /* =====================================================
         04 — HEADING WORD 2
      ===================================================== */

      tl.to(
        headingWordRefs.current[1],
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          ease: 'power4.out',
        },
        0.34
      );

      /* =====================================================
         05 — BODY LINE 1
      ===================================================== */

      tl.to(
        bodyLineRefs.current[0],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        0.5
      );

      /* =====================================================
         06 — BODY LINE 2
      ===================================================== */

      tl.to(
        bodyLineRefs.current[1],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        0.6
      );

      /* =====================================================
         07 — BODY LINE 3
      ===================================================== */

      tl.to(
        bodyLineRefs.current[2],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        0.7
      );

      /* =====================================================
         08 — CTA CONTAINER
      ===================================================== */

      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.3)',
        },
        0.88
      );

      /* =====================================================
         09 — CTA ICON
      ===================================================== */

      tl.to(
        ctaIconRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
        },
        0.98
      );

      /* =====================================================
         10 — CTA TEXT
      ===================================================== */

      tl.to(
        ctaTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        1.02
      );

      /* =====================================================
         11 — HELPER TEXT
      ===================================================== */

      tl.to(
        helperRef.current,
        {
          opacity: 0.65,
          y: 0,
          duration: 0.35,
        },
        1.12
      );

      /* =====================================================
         12 — DIVIDER
      ===================================================== */

      tl.to(
        lineRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        1.25
      );

      /* =====================================================
         13 — CATEGORY ICONS
      ===================================================== */

      categoryIconRefs.current.forEach((el, index) => {
        if (!el) return;

        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'back.out(1.5)',
          },
          1.38 + index * 0.09
        );
      });

      /* =====================================================
         14 — CATEGORY TEXT
      ===================================================== */

      categoryTextRefs.current.forEach((el, index) => {
        if (!el) return;

        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.out',
          },
          1.47 + index * 0.09
        );
      });

      /* =====================================================
         TRIGGER
      ===================================================== */

      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          tl.play();
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     CTA HOVER
  ========================================================= */

  const handleCtaEnter = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const button = e.currentTarget;

    button.style.borderColor =
      'var(--burgundy-accent)';

    button.style.color =
      'var(--burgundy-accent)';

    if (ctaIconRef.current) {
      gsap.to(ctaIconRef.current, {
        x: 4,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handleCtaLeave = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const button = e.currentTarget;

    button.style.borderColor =
      'rgba(242, 238, 231, 0.42)';

    button.style.color =
      'var(--burgundy-primary)';

    if (ctaIconRef.current) {
      gsap.to(ctaIconRef.current, {
        x: 0,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="connect-section"
      ref={sectionRef}
      aria-labelledby="connect-heading"
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--burgundy-bg)',
        color: 'var(--burgundy-primary)',
        borderTop:
          '1px solid var(--burgundy-divider)',
      }}
    >

      {/* =====================================================
          EXISTING-STYLE TEXTURE
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.025]
        "
        aria-hidden="true"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =====================================================
          GOLD VERTICAL ACCENT
          
          Desktop only.
          Completely hidden on mobile.
      ===================================================== */}

      <div
        ref={decorativeRef}
        className="
          absolute
          pointer-events-none
          hidden
          lg:block
        "
        aria-hidden="true"
        style={{
          left:
            'clamp(28px, 6vw, 90px)',
          top: '18%',
          bottom: '18%',
          width: '1px',
          backgroundColor:
            'var(--burgundy-accent)',
          opacity: 0,
          transform:
            'scaleY(0)',
        }}
      />

      {/* =====================================================
          MAIN WRAPPER
      ===================================================== */}

      <div
        className="
          relative
          max-w-[1440px]
          mx-auto
          px-6
          sm:px-8
          md:px-12
          lg:px-20
        "
        style={{
          zIndex: 2,
        }}
      >

        {/* ===================================================
            MAIN HORIZONTAL CONTENT
        =================================================== */}

        <div
          className="
            grid
            lg:grid-cols-[1.1fr_0.9fr]
            items-center
            gap-10
            lg:gap-20
          "
          style={{
            paddingTop:
              'clamp(64px, 8vw, 105px)',
            paddingBottom:
              'clamp(58px, 6vw, 82px)',
          }}
        >

          {/* =================================================
              LEFT — TITLE
          ================================================= */}

          <div className="text-left">

            {/* EYEBROW */}

            <span
              ref={eyebrowRef}
              className="
                editorial-eyebrow
                block
              "
              style={{
                color:
                  'var(--burgundy-accent)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                marginBottom:
                  'clamp(18px, 2vw, 25px)',
                opacity: 0,
              }}
            >
              LET&rsquo;S STAY IN TOUCH
            </span>

            {/* HEADING */}

            <h2
              ref={headingRef}
              id="connect-heading"
              className="
                clamp-h2
                font-display
                font-bold
                tracking-tight
                overflow-hidden
              "
              style={{
                color:
                  'var(--burgundy-primary)',
                lineHeight: '0.9',
                letterSpacing: '-0.045em',
                margin: 0,
                maxWidth: '700px',
                perspective: '800px',
              }}
            >

              <span
                ref={(el) => {
                  headingWordRefs.current[0] = el;
                }}
                className="
                  inline-block
                  mr-[0.18em]
                "
                style={{
                  opacity: 0,
                }}
              >
                Let&rsquo;s
              </span>

              <span
                ref={(el) => {
                  headingWordRefs.current[1] = el;
                }}
                className="inline-block"
                style={{
                  opacity: 0,
                }}
              >
                Connect.
              </span>

            </h2>
          </div>

          {/* =================================================
              RIGHT — MESSAGE + CTA
          ================================================= */}

          <div
            className="
              lg:pt-8
              lg:max-w-[470px]
            "
          >

            {/* BODY */}

            <p
              ref={bodyRef}
              className="
                font-body
                overflow-hidden
              "
              style={{
                color:
                  'var(--burgundy-secondary)',
                lineHeight: '1.65',
                fontSize:
                  'clamp(0.94rem, 1.1vw, 1.05rem)',
                margin: 0,
                marginBottom:
                  'clamp(24px, 2.5vw, 34px)',
                maxWidth: '45ch',
              }}
            >

              <span
                ref={(el) => {
                  bodyLineRefs.current[0] = el;
                }}
                className="block"
                style={{
                  opacity: 0,
                }}
              >
                Whether it&rsquo;s a project, an
              </span>

              <span
                ref={(el) => {
                  bodyLineRefs.current[1] = el;
                }}
                className="block"
                style={{
                  opacity: 0,
                }}
              >
                opportunity, or just a conversation
              </span>

              <span
                ref={(el) => {
                  bodyLineRefs.current[2] = el;
                }}
                className="block"
                style={{
                  opacity: 0,
                }}
              >
                about cinema &mdash; I&rsquo;m always
                open to new stories.
              </span>

            </p>

            {/* =================================================
                CTA
            ================================================= */}

            <div
              ref={ctaRef}
              className="
                flex
                flex-col
                items-start
              "
              style={{
                opacity: 0,
              }}
            >

              <a
                href={GMAIL_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="
                  Contact Babubhai Thiba via Gmail
                "
                onMouseEnter={handleCtaEnter}
                onMouseLeave={handleCtaLeave}
                className="
                  inline-flex
                  items-center
                  gap-3
                  font-body
                  font-semibold
                  uppercase
                "
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.17em',
                  border:
                    '1px solid rgba(242, 238, 231, 0.42)',
                  color:
                    'var(--burgundy-primary)',
                  padding:
                    'clamp(14px, 1.4vw, 17px) clamp(24px, 2.8vw, 34px)',
                  transition:
                    'border-color 0.35s ease, color 0.35s ease',
                }}
              >

                <Mail
                  ref={ctaIconRef}
                  className="
                    w-4
                    h-4
                    shrink-0
                  "
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span
                  ref={ctaTextRef}
                  style={{
                    display: 'inline-block',
                  }}
                >
                  LET&rsquo;S CONNECT
                </span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    shrink-0
                  "
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

              </a>

              {/* HELPER TEXT */}

              <p
                ref={helperRef}
                className="font-body"
                style={{
                  color:
                    'var(--burgundy-secondary)',
                  fontSize: '0.72rem',
                  marginTop: '11px',
                  marginBottom: 0,
                  opacity: 0,
                }}
              >
                Opens Gmail with a pre-filled message
              </p>

            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div
          ref={lineRef}
          aria-hidden="true"
          style={{
            height: '1px',
            width: '100%',
            backgroundColor:
              'var(--burgundy-divider)',
            transform: 'scaleX(0)',
            transformOrigin:
              'left center',
            opacity: 0,
          }}
        />

        {/* =====================================================
            FOUR CATEGORIES

            DESKTOP:
            4 equal columns — unchanged.

            MOBILE:
            Clean 2 × 2 grid.
            Proper vertical + horizontal borders.
        ===================================================== */}

        <div
          ref={categoriesRef}
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
          "
        >

          {CATEGORIES.map(
            (category, index) => {

              const isDesktopLast =
                index ===
                CATEGORIES.length - 1;

              const isMobileRight =
                index === 1 ||
                index === 3;

              const isMobileSecondRow =
                index === 2 ||
                index === 3;

              return (
                <div
                  key={category.label}
                  className={`
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-3
                    py-7
                    md:py-8

                    ${!isMobileRight
                      ? 'border-r'
                      : 'border-r-0'
                    }

                    ${isMobileSecondRow
                      ? 'border-t'
                      : 'border-t-0'
                    }

                    lg:border-t-0

                    ${!isDesktopLast
                      ? 'lg:border-r'
                      : 'lg:border-r-0'
                    }

                    border-[var(--burgundy-divider)]
                  `}
                >

                  {/* CATEGORY ICON */}

                  <span
                    ref={(el) => {
                      categoryIconRefs.current[
                        index
                      ] = el;
                    }}
                    style={{
                      color:
                        'var(--burgundy-accent)',
                      display:
                        'inline-flex',
                      opacity: 0,
                    }}
                    aria-hidden="true"
                  >
                    {category.icon}
                  </span>

                  {/* CATEGORY TEXT */}

                  <span
                    ref={(el) => {
                      categoryTextRefs.current[
                        index
                      ] = el;
                    }}
                    className="
                      editorial-eyebrow
                    "
                    style={{
                      color:
                        'var(--burgundy-secondary)',
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      textAlign: 'center',
                      opacity: 0,
                    }}
                  >
                    {category.label}
                  </span>

                </div>
              );
            }
          )}

        </div>
      </div>
    </section>
  );
};