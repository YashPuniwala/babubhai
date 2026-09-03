import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_FACTS = [
  { value: "1977", label: "Started in Mumbai" },
  { value: "45+ YEARS", label: "Experience in Cinema" },
  { value: "FILM · TELEVISION · OTT", label: "Areas of Work" },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * INITIAL STATES
       * ==========================================
       */

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 45,
      });

      gsap.set(bioRef.current, {
        opacity: 0,
        y: 35,
      });

      gsap.set(factsRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(portraitRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      /*
       * ==========================================
       * IMAGE REVEAL INITIAL STATE
       * ==========================================
       */

      if (portraitParallaxRef.current) {
        gsap.set(portraitParallaxRef.current, {
          clipPath: "inset(0 0 100% 0)",
        });
      }

      /*
       * ==========================================
       * TEXT SCROLL ANIMATION
       * ==========================================
       */

      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      textTimeline
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(
          bioRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .to(
          factsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45",
        );

      /*
       * ==========================================
       * IMAGE ENTRANCE ANIMATION
       * ==========================================
       */

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: portraitRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      imageTimeline
        .to(portraitRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        })
        .to(
          portraitParallaxRef.current,
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.9",
        );

      /*
       * ==========================================
       * IMAGE PARALLAX
       *
       * DESKTOP ONLY
       * ==========================================
       */

      if (
        !isTouchDevice &&
        portraitParallaxRef.current &&
        portraitRef.current
      ) {
        gsap.fromTo(
          portraitParallaxRef.current,
          {
            y: -20,
          },
          {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          },
        );
      }

      /*
       * ==========================================
       * REFRESH SCROLLTRIGGER
       * ==========================================
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#E8E3DA",
        color: "#211C18",
        borderBottom: "1px solid #C8BFB2",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-24 lg:py-28">

        {/* =====================================
            SECTION HEADER
        ====================================== */}

        <div className="flex items-baseline justify-between gap-6">
          <span
            className="editorial-eyebrow"
            style={{
              color: "#6F6860",
            }}
          >
            ABOUT
          </span>

          <span
            className="editorial-eyebrow"
            style={{
              color: "#6F6860",
            }}
          >
            1977 — NOW
          </span>
        </div>

        <div
          className="mt-5 mb-10 md:mb-14"
          style={{
            height: "1px",
            backgroundColor: "#C8BFB2",
          }}
        />

        {/* =====================================
            MAIN ABOUT GRID
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-10
            md:gap-12
            lg:gap-16
            xl:gap-20
            items-stretch
          "
        >

          {/* ===================================
              PORTRAIT
          =================================== */}

          <div className="md:col-span-5">
            <div
              ref={portraitRef}
              className="
                group
                relative
                overflow-hidden
                border
              "
              style={{
                borderColor: "#C8BFB2",
                backgroundColor: "#D8D1C6",
              }}
            >
              <div
                ref={portraitParallaxRef}
                className="will-change-transform"
                style={{
                  clipPath:
                    "inset(0 0 100% 0)",
                }}
              >
                <img
                  src="/images/babubhai_about.png"
                  alt="Babubhai Thiba"
                  className="
                    block
                    h-auto
                    w-full
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.03]
                  "
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ===================================
              RIGHT CONTENT
          =================================== */}

          <div
            className="
              md:col-span-7
              flex
              flex-col
              justify-between
            "
          >

            {/* HEADING */}

            <h2
              ref={headingRef}
              className="
                font-display
                font-bold
                tracking-tight
                leading-[0.95]
              "
              style={{
                fontSize:
                  "clamp(2.8rem, 6vw, 5.4rem)",
                color: "#211C18",
              }}
            >
              Babubhai
              <br />

              <span
                style={{
                  color: "#5A2028",
                }}
              >
                Thiba
              </span>
            </h2>

            {/* BIO */}

            <div
              ref={bioRef}
              className="
                mt-6
                md:mt-0
                flex
                flex-col
                gap-4
              "
              style={{
                maxWidth: "40rem",
              }}
            >
              <p
                className="
                  font-body
                  leading-[1.75]
                "
                style={{
                  fontSize:
                    "clamp(1rem, 1.2vw, 1.125rem)",
                  color: "#211C18",
                }}
              >
                Babubhai Thiba is a veteran film
                producer, celebrity manager and
                industry consultant with more than
                four decades of experience in
                India&apos;s entertainment industry.
              </p>

              <p
                className="
                  font-body
                  leading-[1.75]
                "
                style={{
                  fontSize:
                    "clamp(1rem, 1.2vw, 1.125rem)",
                  color: "#6F6860",
                }}
              >
                Since beginning his career in Mumbai
                in 1977, he has worked across film,
                television and OTT, building
                long-standing professional
                relationships with artists, producers
                and businesses.
              </p>

              <p
                className="
                  font-body
                  leading-[1.75]
                "
                style={{
                  fontSize:
                    "clamp(1rem, 1.2vw, 1.125rem)",
                  color: "#6F6860",
                }}
              >
                His work spans production, celebrity
                management and industry consultation,
                with a focus on professional
                relationships, experience and
                discretion.
              </p>
            </div>

            {/* =================================
                FACTS
            ================================== */}

            <div
              ref={factsRef}
              className="
                mt-8
                md:mt-0
                grid
                grid-cols-1
                sm:grid-cols-3
              "
              style={{
                borderTop:
                  "1px solid #C8BFB2",
                borderBottom:
                  "1px solid #C8BFB2",
              }}
            >
              {ABOUT_FACTS.map(
                (fact, index) => (
                  <div
                    key={fact.label}
                    className="
                      py-4
                      sm:px-5
                      first:pl-0
                      last:pr-0
                      sm:border-l
                    "
                    style={{
                      borderColor:
                        index > 0
                          ? "#C8BFB2"
                          : "transparent",
                    }}
                  >
                    <p
                      className="
                        font-display
                        font-bold
                        tracking-tight
                        leading-none
                      "
                      style={{
                        fontSize:
                          fact.value.length > 10
                            ? "clamp(1rem, 1.8vw, 1.4rem)"
                            : "clamp(2rem, 3.2vw, 3rem)",
                        color: "#5A2028",
                      }}
                    >
                      {fact.value}
                    </p>

                    <p
                      className="
                        editorial-eyebrow
                        mt-3
                      "
                      style={{
                        color: "#6F6860",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {fact.label}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};