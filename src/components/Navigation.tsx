import React, { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (targetId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /*
   * Screen size
   */
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  /*
   * Scroll behavior
   *
   * DESKTOP:
   * - Always visible
   * - Transparent at top
   * - Background appears after scrolling
   *
   * MOBILE:
   * - Hidden at very top
   * - Appears after scrolling
   */
  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;

      const scrollY = window.scrollY;
      const atTop = scrollY <= 8;

      // Background state for desktop
      setIsScrolled(!atTop);

      // Mobile visibility
      if (window.innerWidth < 768) {
        setNavVisible(!atTop);

        if (atTop) {
          setMobileMenuOpen(false);
        }
      } else {
        // Desktop is ALWAYS visible
        setNavVisible(true);
      }
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(
          updateNavigation
        );
      }
    };

    const handleResize = () => {
      updateNavigation();
    };

    updateNavigation();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const navLinks = [
    {
      label: 'Home',
      target: '#hero-section',
    },
    {
      label: 'About',
      target: '#about-section',
    },
    {
      label: 'Experience',
      target: '#experience-section',
    },
    {
      label: 'Artists',
      target: '#artist-list-section',
    },
    {
      label: 'Achievements',
      target: '#achievements-section',
    },
    {
      label: 'Services',
      target: '#services-section',
    },
  ];

  const handleLinkClick = (
    e: React.MouseEvent,
    target: string
  ) => {
    e.preventDefault();

    setMobileMenuOpen(false);

    onNavigate(target);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        /*
         * ==============================
         * DESKTOP BACKGROUND
         * ==============================
         *
         * At top:
         * transparent
         *
         * After scroll:
         * proper background
         */
        backgroundColor:
          isScrolled
            ? 'var(--bg-light)'
            : 'transparent',

        /*
         * Border only appears after scrolling
         */
        borderBottom:
          isScrolled
            ? '1px solid var(--divider-light)'
            : '1px solid transparent',

        padding: '14px 0',

        /*
         * MOBILE:
         * Hide/show navbar.
         *
         * DESKTOP:
         * Always visible.
         */
        transform:
          isMobile
            ? navVisible
              ? 'translateY(0)'
              : 'translateY(-100%)'
            : 'translateY(0)',

        pointerEvents:
          isMobile
            ? navVisible
              ? 'auto'
              : 'none'
            : 'auto',

        /*
         * Smooth background transition
         */
        transition:
          'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',

        /*
         * No shadow when transparent.
         * Shadow appears after scrolling.
         */
        boxShadow:
          isScrolled
            ? '0 1px 8px rgba(0,0,0,0.04)'
            : 'none',
      }}
    >
      {/* =========================
          NAVBAR CONTENT
      ========================== */}

      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto
          px-6
          md:px-12
          flex
          items-center
          justify-between
        "
      >
        {/* =========================
            LOGO
        ========================== */}

        <a
          href="#hero-section"
          onClick={(e) =>
            handleLinkClick(
              e,
              '#hero-section'
            )
          }
          className="
            font-display
            font-bold
            text-lg
            tracking-tight
          "
          style={{
            color: 'var(--text-dark)',
          }}
        >
          BABUBHAI THIBA
        </a>

        {/* =========================
            DESKTOP NAV
        ========================== */}

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) =>
                handleLinkClick(
                  e,
                  item.target
                )
              }
              className="editorial-eyebrow"
              style={{
                color:
                  'rgba(33, 28, 24, 0.6)',
                transition:
                  'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  'rgba(33, 28, 24, 0.6)';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* =========================
            DESKTOP PHONE
        ========================== */}

        <div className="hidden md:flex items-center">
          <a
            href="tel:+919867343123"
            className="
              inline-flex
              items-center
              gap-2
              editorial-eyebrow
              px-4
              py-2.5
            "
            style={{
              border:
                '1px solid rgba(33,28,24,0.15)',

              color:
                'var(--text-dark)',

              transition:
                'all 0.3s ease',

              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              const el =
                e.currentTarget;

              el.style.borderColor =
                'var(--accent)';

              el.style.color =
                'var(--accent)';
            }}
            onMouseLeave={(e) => {
              const el =
                e.currentTarget;

              el.style.borderColor =
                'rgba(33,28,24,0.15)';

              el.style.color =
                'var(--text-dark)';
            }}
          >
            <Phone className="w-3.5 h-3.5" />

            +91 98673 43123
          </a>
        </div>

        {/* =========================
            MOBILE HAMBURGER
        ========================== */}

        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          type="button"
          className="
            lg:hidden
            flex
            shrink-0
            items-center
            justify-center
            relative
            z-[60]
          "
          style={{
            color:
              'var(--text-dark)',

            width: '44px',
            height: '44px',
          }}
          aria-label="Toggle menu"
          aria-expanded={
            mobileMenuOpen
          }
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}

      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight:
            mobileMenuOpen
              ? 'calc(100vh - 72px)'
              : '0',

          opacity:
            mobileMenuOpen
              ? 1
              : 0,

          overflowY:
            mobileMenuOpen
              ? 'auto'
              : 'hidden',

          transition:
            'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div
          className="
            px-6
            py-8
            flex
            flex-col
            gap-5
          "
          style={{
            /*
             * Mobile menu always gets
             * a solid background.
             */
            backgroundColor:
              'var(--bg-light)',

            borderBottom:
              '1px solid var(--divider-light)',
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) =>
                handleLinkClick(
                  e,
                  item.target
                )
              }
              className="
                font-display
                text-2xl
              "
              style={{
                color:
                  'var(--text-dark)',

                minHeight: '44px',

                display: 'flex',

                alignItems:
                  'center',
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Phone */}

          <div
            className="pt-5"
            style={{
              borderTop:
                '1px solid var(--divider-light)',
            }}
          >
            <a
              href="tel:+919867343123"
              className="
                inline-flex
                items-center
                gap-2
                editorial-eyebrow
              "
              style={{
                color:
                  'var(--accent)',

                minHeight: '44px',
              }}
            >
              <Phone className="w-4 h-4" />

              CALL US: +91 98673 43123
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};