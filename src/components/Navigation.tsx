import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  onNavigate: (targetId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'bottom 80px',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const navLinks = [
    { label: 'Home', target: '#hero-section' },
    { label: 'About', target: '#about-section' },
    { label: 'Experience', target: '#experience-section' },
    { label: 'Artists', target: '#artist-list-section' },
    { label: 'Achievements', target: '#achievements-section' },
    { label: 'Services', target: '#services-section' },
  ];

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isScrolled ? 'var(--bg-light)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--divider-light)' : '1px solid transparent',
        padding: isScrolled ? '14px 0' : '20px 0',
        transition: 'background-color 0.5s ease, border-color 0.5s ease, padding 0.4s ease',
        boxShadow: isScrolled ? '0 1px 8px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo / Name */}
        <a
          href="#hero-section"
          onClick={(e) => handleLinkClick(e, '#hero-section')}
          className="font-display font-bold text-lg tracking-tight"
          style={{
            color: 'var(--text-dark)',
            transition: 'color 0.5s ease',
          }}
        >
          BABUBHAI THIBA
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleLinkClick(e, item.target)}
              className="editorial-eyebrow"
              style={{
                color: 'rgba(33, 28, 24, 0.6)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(33, 28, 24, 0.6)';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Phone Badge */}
        <div className="hidden md:flex items-center">
          <a
            href="tel:+919867343123"
            className="inline-flex items-center gap-2 editorial-eyebrow px-4 py-2.5"
            style={{
              border: '1px solid rgba(33,28,24,0.15)',
              color: 'var(--text-dark)',
              transition: 'all 0.3s ease',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--accent)';
              el.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(33,28,24,0.15)';
              el.style.color = 'var(--text-dark)';
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            +91 98673 43123
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center"
          style={{
            color: isScrolled ? 'var(--text-dark)' : 'var(--text-light)',
            transition: 'color 0.5s ease',
            width: '44px',
            height: '44px',
          }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileMenuOpen ? 'calc(100vh - 72px)' : '0',
          opacity: mobileMenuOpen ? 1 : 0,
          overflowY: mobileMenuOpen ? 'auto' : 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div
          className="px-6 py-8 flex flex-col gap-5"
          style={{
            backgroundColor: 'var(--bg-light)',
            borderBottom: '1px solid var(--divider-light)',
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleLinkClick(e, item.target)}
              className="font-display text-2xl"
              style={{ color: 'var(--text-dark)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
            >
              {item.label}
            </a>
          ))}
          <div
            className="pt-5"
            style={{ borderTop: '1px solid var(--divider-light)' }}
          >
            <a
              href="tel:+919867343123"
              className="inline-flex items-center gap-2 editorial-eyebrow"
              style={{ color: 'var(--accent)', minHeight: '44px' }}
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
