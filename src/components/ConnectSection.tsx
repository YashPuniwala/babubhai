import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  ArrowRight,
  Film,
  Handshake,
  Lightbulb,
  MessageCircle,
  Phone,
  X,
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
   CONTACT DETAILS
========================================================= */

const EMAIL = 'btthiba@gmail.com';
const PHONE = '+919867343123';

const EMAIL_SUBJECT = 'Enquiry – Babubhai Thiba';

const EMAIL_BODY = `Hello Babubhai Thiba,

I would like to get in touch regarding a project / collaboration / opportunity.

Please let me know a convenient time to connect.

Regards,
[Name]`;

/* =========================================================
   DESKTOP GMAIL
   Opens Gmail compose in browser.
========================================================= */

const GMAIL_WEB_HREF =
  'https://mail.google.com/mail/?view=cm&fs=1' +
  '&to=' +
  encodeURIComponent(EMAIL) +
  '&su=' +
  encodeURIComponent(EMAIL_SUBJECT) +
  '&body=' +
  encodeURIComponent(EMAIL_BODY);

/* =========================================================
   MOBILE EMAIL
   Lets the mobile operating system open the email app.
========================================================= */

const MAILTO_HREF =
  'mailto:' +
  EMAIL +
  '?subject=' +
  encodeURIComponent(EMAIL_SUBJECT) +
  '&body=' +
  encodeURIComponent(EMAIL_BODY);

/* =========================================================
   WHATSAPP
========================================================= */

const WHATSAPP_HREF =
  'https://wa.me/919867343123?text=' +
  encodeURIComponent(
    'Hello Babubhai Thiba, I would like to get in touch regarding a project / collaboration / opportunity.'
  );

/* =========================================================
   PHONE
========================================================= */

const PHONE_HREF = `tel:${PHONE}`;

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

  /* Contact chooser */
  const [showContactOptions, setShowContactOptions] =
    useState(false);

  const contactOverlayRef =
    useRef<HTMLDivElement>(null);

  const contactPanelRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     SCROLL ANIMATION
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

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
          if (!el) return;

          gsap.set(el, {
            opacity: 1,
            y: 0,
            rotateX: 0,
          });
        });

        bodyLineRefs.current.forEach((el) => {
          if (!el) return;

          gsap.set(el, {
            opacity: 1,
            y: 0,
          });
        });

        categoryIconRefs.current.forEach((el) => {
          if (!el) return;

          gsap.set(el, {
            opacity: 1,
            y: 0,
            scale: 1,
          });
        });

        categoryTextRefs.current.forEach((el) => {
          if (!el) return;

          gsap.set(el, {
            opacity: 1,
            y: 0,
          });
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
      ===================================================== */

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power3.out',
        },
      });

      /* Decorative line */

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

      /* Eyebrow */

      tl.to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        0.05
      );

      /* Heading */

      headingWordRefs.current.forEach(
        (el, index) => {
          if (!el) return;

          tl.to(
            el,
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.55,
              ease: 'power4.out',
            },
            0.22 + index * 0.12
          );
        }
      );

      /* Body */

      bodyLineRefs.current.forEach(
        (el, index) => {
          if (!el) return;

          tl.to(
            el,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power3.out',
            },
            0.5 + index * 0.1
          );
        }
      );

      /* CTA */

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

      /* CTA icon */

      tl.to(
        ctaIconRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
        },
        0.98
      );

      /* CTA text */

      tl.to(
        ctaTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
        },
        1.02
      );

      /* Helper */

      tl.to(
        helperRef.current,
        {
          opacity: 0.65,
          y: 0,
          duration: 0.35,
        },
        1.12
      );

      /* Divider */

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

      /* Category icons */

      categoryIconRefs.current.forEach(
        (el, index) => {
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
        }
      );

      /* Category text */

      categoryTextRefs.current.forEach(
        (el, index) => {
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
        }
      );

      /* =====================================================
         SCROLL TRIGGER
      ===================================================== */

      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,

        onEnter: () => {
          tl.play();
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     CONTACT OPTIONS ANIMATION
  ========================================================= */

  useEffect(() => {
    if (!showContactOptions) return;

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contactOverlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        contactPanelRef.current,
        {
          opacity: 0,
          y: 25,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
        }
      );
    });

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [showContactOptions]);

  /* =========================================================
     CLOSE CONTACT OPTIONS
  ========================================================= */

  const closeContactOptions = () => {
    const panel = contactPanelRef.current;
    const overlay = contactOverlayRef.current;

    if (!panel || !overlay) {
      setShowContactOptions(false);
      return;
    }

    gsap.to(panel, {
      opacity: 0,
      y: 15,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.in',
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      delay: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        setShowContactOptions(false);
      },
    });
  };

  /* =========================================================
     GMAIL CLICK
     
     DESKTOP:
     Gmail browser.

     MOBILE:
     mailto → operating system email handler.
     
     IMPORTANT:
     No googlegmail:// or intent:// is used.
     Those are unreliable from mobile browsers.
  ========================================================= */

  const handleGmailClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const userAgent = navigator.userAgent || '';

    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(
        userAgent
      );

    if (isMobile) {
      e.preventDefault();

      /*
        Give the mobile operating system the
        standard mailto link.

        If Gmail is registered as the email
        handler, Gmail opens with the details.
      */

      window.location.href = MAILTO_HREF;
    }

    /*
      Desktop:
      Do nothing.

      The anchor's href opens Gmail Web.
    */
  };

  /* =========================================================
     CTA HOVER
  ========================================================= */

  const handleCtaEnter = () => {
    if (ctaIconRef.current) {
      gsap.to(ctaIconRef.current, {
        x: 4,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handleCtaLeave = () => {
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
    <>
      <section
        id="connect-section"
        ref={sectionRef}
        aria-labelledby="connect-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor:
            'var(--burgundy-bg)',
          color:
            'var(--burgundy-primary)',
          borderTop:
            '1px solid var(--burgundy-divider)',
        }}
      >

        {/* ===================================================
            TEXTURE
        =================================================== */}

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

        {/* ===================================================
            GOLD VERTICAL ACCENT
        =================================================== */}

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

        {/* ===================================================
            MAIN WRAPPER
        =================================================== */}

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

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

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
                LEFT
            ================================================= */}

            <div className="text-left">

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
                  letterSpacing:
                    '0.2em',
                  marginBottom:
                    'clamp(18px, 2vw, 25px)',
                  opacity: 0,
                }}
              >
                LET&rsquo;S STAY IN TOUCH
              </span>

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
                  letterSpacing:
                    '-0.045em',
                  margin: 0,
                  maxWidth: '700px',
                  perspective: '800px',
                }}
              >

                <span
                  ref={(el) => {
                    headingWordRefs.current[0] =
                      el;
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
                    headingWordRefs.current[1] =
                      el;
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
                RIGHT
            ================================================= */}

            <div
              className="
                lg:pt-8
                lg:max-w-[470px]
              "
            >

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
                    bodyLineRefs.current[0] =
                      el;
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
                    bodyLineRefs.current[1] =
                      el;
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
                    bodyLineRefs.current[2] =
                      el;
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

                <button
                  type="button"
                  aria-label="Choose how to connect"
                  onClick={() =>
                    setShowContactOptions(
                      true
                    )
                  }
                  onMouseEnter={
                    handleCtaEnter
                  }
                  onMouseLeave={
                    handleCtaLeave
                  }
                  className="
                    inline-flex
                    items-center
                    gap-3
                    font-body
                    font-semibold
                    uppercase
                    cursor-pointer
                  "
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing:
                      '0.17em',
                    border:
                      '1px solid rgba(242, 238, 231, 0.42)',
                    color:
                      'var(--burgundy-primary)',
                    background:
                      'transparent',
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
                      display:
                        'inline-block',
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

                </button>

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
                  Choose your preferred way
                  to connect
                </p>

              </div>
            </div>
          </div>

          {/* ===================================================
              DIVIDER
          =================================================== */}

          <div
            ref={lineRef}
            aria-hidden="true"
            style={{
              height: '1px',
              width: '100%',
              backgroundColor:
                'var(--burgundy-divider)',
              transform:
                'scaleX(0)',
              transformOrigin:
                'left center',
              opacity: 0,
            }}
          />

          {/* ===================================================
              CATEGORIES
          =================================================== */}

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
                        letterSpacing:
                          '0.18em',
                        textAlign:
                          'center',
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

      {/* =====================================================
          CONTACT OPTIONS OVERLAY
      ===================================================== */}

      {showContactOptions && (
        <div
          ref={contactOverlayRef}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            px-5
          "
          style={{
            background:
              'rgba(18, 8, 10, 0.72)',
            backdropFilter:
              'blur(8px)',
            WebkitBackdropFilter:
              'blur(8px)',
          }}
          onClick={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              closeContactOptions();
            }
          }}
        >

          {/* =================================================
              CONTACT PANEL
          ================================================= */}

          <div
            ref={contactPanelRef}
            className="
              relative
              w-full
              max-w-[470px]
            "
            style={{
              backgroundColor:
                'var(--burgundy-bg)',
              border:
                '1px solid var(--burgundy-divider)',
              boxShadow:
                '0 25px 80px rgba(0,0,0,0.35)',
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* TOP ACCENT */}

            <div
              style={{
                height: '2px',
                width: '70px',
                backgroundColor:
                  'var(--burgundy-accent)',
              }}
            />

            {/* HEADER */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-5
                px-6
                sm:px-8
                pt-7
                pb-5
              "
            >

              <div>

                <span
                  className="
                    editorial-eyebrow
                  "
                  style={{
                    display:
                      'block',
                    color:
                      'var(--burgundy-accent)',
                    fontSize: '10px',
                    letterSpacing:
                      '0.2em',
                    marginBottom:
                      '12px',
                  }}
                >
                  LET&rsquo;S CONNECT
                </span>

                <h3
                  className="
                    font-display
                    font-bold
                  "
                  style={{
                    margin: 0,
                    color:
                      'var(--burgundy-primary)',
                    fontSize:
                      'clamp(1.7rem, 4vw, 2.2rem)',
                    lineHeight: 1,
                    letterSpacing:
                      '-0.035em',
                  }}
                >
                  Choose how to reach out.
                </h3>

              </div>

              {/* CLOSE */}

              <button
                type="button"
                aria-label="Close contact options"
                onClick={
                  closeContactOptions
                }
                className="
                  shrink-0
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                "
                style={{
                  width: '36px',
                  height: '36px',
                  border:
                    '1px solid var(--burgundy-divider)',
                  background:
                    'transparent',
                  color:
                    'var(--burgundy-primary)',
                }}
              >
                <X
                  className="w-4 h-4"
                  strokeWidth={1.4}
                />
              </button>

            </div>

            {/* DESCRIPTION */}

            <p
              className="
                font-body
                px-6
                sm:px-8
              "
              style={{
                color:
                  'var(--burgundy-secondary)',
                fontSize:
                  '0.9rem',
                lineHeight: 1.6,
                margin:
                  '0 0 24px 0',
              }}
            >
              Whether it&rsquo;s a project,
              collaboration or simply a
              conversation, choose your
              preferred way to connect.
            </p>

            {/* =================================================
                OPTIONS
            ================================================= */}

            <div
              className="
                px-6
                sm:px-8
                pb-7
                sm:pb-8
              "
            >

              {/* =================================================
                  GMAIL
              ================================================= */}

              <a
                href={GMAIL_WEB_HREF}
                onClick={handleGmailClick}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  w-full
                  no-underline
                "
                style={{
                  borderTop:
                    '1px solid var(--burgundy-divider)',
                  borderBottom:
                    '1px solid var(--burgundy-divider)',
                  padding:
                    '18px 0',
                  color:
                    'var(--burgundy-primary)',
                }}
              >

                <span
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: '38px',
                      height: '38px',
                      border:
                        '1px solid var(--burgundy-divider)',
                      color:
                        'var(--burgundy-accent)',
                    }}
                  >
                    <Mail
                      className="w-4 h-4"
                      strokeWidth={1.4}
                    />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        font-body
                        font-semibold
                      "
                      style={{
                        fontSize:
                          '0.78rem',
                        letterSpacing:
                          '0.14em',
                      }}
                    >
                      GMAIL
                    </span>

                    <span
                      className="
                        block
                        font-body
                      "
                      style={{
                        color:
                          'var(--burgundy-secondary)',
                        fontSize:
                          '0.72rem',
                        marginTop:
                          '4px',
                      }}
                    >
                      Send an enquiry
                    </span>

                  </span>

                </span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.4}
                />

              </a>

              {/* =================================================
                  WHATSAPP
              ================================================= */}

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  w-full
                  no-underline
                "
                style={{
                  borderBottom:
                    '1px solid var(--burgundy-divider)',
                  padding:
                    '18px 0',
                  color:
                    'var(--burgundy-primary)',
                }}
              >

                <span
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: '38px',
                      height: '38px',
                      border:
                        '1px solid var(--burgundy-divider)',
                      color:
                        'var(--burgundy-accent)',
                    }}
                  >
                    <MessageCircle
                      className="w-4 h-4"
                      strokeWidth={1.4}
                    />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        font-body
                        font-semibold
                      "
                      style={{
                        fontSize:
                          '0.78rem',
                        letterSpacing:
                          '0.14em',
                      }}
                    >
                      WHATSAPP
                    </span>

                    <span
                      className="
                        block
                        font-body
                      "
                      style={{
                        color:
                          'var(--burgundy-secondary)',
                        fontSize:
                          '0.72rem',
                        marginTop:
                          '4px',
                      }}
                    >
                      Start a conversation
                    </span>

                  </span>

                </span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.4}
                />

              </a>

              {/* =================================================
                  PHONE — MOBILE ONLY
              ================================================= */}

              <a
                href={PHONE_HREF}
                className="
                  group
                  flex
                  lg:hidden
                  items-center
                  justify-between
                  w-full
                  no-underline
                "
                style={{
                  borderBottom:
                    '1px solid var(--burgundy-divider)',
                  padding:
                    '18px 0',
                  color:
                    'var(--burgundy-primary)',
                }}
              >

                <span
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: '38px',
                      height: '38px',
                      border:
                        '1px solid var(--burgundy-divider)',
                      color:
                        'var(--burgundy-accent)',
                    }}
                  >
                    <Phone
                      className="w-4 h-4"
                      strokeWidth={1.4}
                    />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        font-body
                        font-semibold
                      "
                      style={{
                        fontSize:
                          '0.78rem',
                        letterSpacing:
                          '0.14em',
                      }}
                    >
                      CALL
                    </span>

                    <span
                      className="
                        block
                        font-body
                      "
                      style={{
                        color:
                          'var(--burgundy-secondary)',
                        fontSize:
                          '0.72rem',
                        marginTop:
                          '4px',
                      }}
                    >
                      +91 98673 43123
                    </span>

                  </span>

                </span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.4}
                />

              </a>

            </div>
          </div>
        </div>
      )}
    </>
  );
};