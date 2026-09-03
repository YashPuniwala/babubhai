import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  onNavigate: (targetId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const handleAnchorClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <footer
      id="footer-section"
      className="relative pt-20 md:pt-24 pb-10 md:pb-12"
      style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
        borderTop: '1px solid var(--divider-light)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-14 md:pb-16"
          style={{ borderBottom: '1px solid var(--divider-light)' }}
        >
          {/* Identity */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start">
            <p
              className="font-display font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--text-dark)' }}
            >
              Babubhai Thiba
            </p>
            <p
              className="font-body"
              style={{
                color: 'rgba(33, 28, 24, 0.6)',
                maxWidth: '32ch',
                lineHeight: '1.6',
              }}
            >
              Veteran Mumbai Film Producer, Celebrity Manager &amp; Consultant.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 lg:col-span-3">
            <span
              className="editorial-eyebrow block mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              CONTACT
            </span>
            <ul className="space-y-3.5 font-body" style={{ color: 'rgba(33, 28, 24, 0.7)' }}>
              <li>
                <a
                  href="tel:+919867343123"
                  className="flex items-center gap-3"
                  style={{ transition: 'color 0.3s ease', minHeight: '44px' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(33, 28, 24, 0.7)'; }}
                >
                  <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                  +91 9867 343123
                </a>
              </li>
              <li>
                <a
                  href="mailto:bthiba@gmail.com"
                  className="flex items-center gap-3"
                  style={{ transition: 'color 0.3s ease', minHeight: '44px' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(33, 28, 24, 0.7)'; }}
                >
                  <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                  bthiba@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.babubhaithiba.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                  style={{ transition: 'color 0.3s ease', minHeight: '44px' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(33, 28, 24, 0.7)'; }}
                >
                  <Globe className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                  www.babubhaithiba.in
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="md:col-span-5 lg:col-span-3">
            <span
              className="editorial-eyebrow block mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              MUMBAI OFFICE
            </span>
            <div
              className="flex items-start gap-3 font-body"
              style={{ color: 'rgba(33, 28, 24, 0.7)', lineHeight: '1.6' }}
            >
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
              <div>
                <p>City Mall, Office No. 38, New Link Road, Andheri West, Mumbai – 400053</p>
                <p className="mt-1.5" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Tel. 022-66931294
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-1">
            <span
              className="editorial-eyebrow block mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              NAV
            </span>
            <ul className="space-y-3 font-body" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              <li>
                <a
                  href="#hero-section"
                  onClick={(e) => handleAnchorClick(e, '#hero-section')}
                  style={{ transition: 'color 0.3s ease', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'inherit'; }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about-section"
                  onClick={(e) => handleAnchorClick(e, '#about-section')}
                  style={{ transition: 'color 0.3s ease', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'inherit'; }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#footer-section"
                  onClick={(e) => handleAnchorClick(e, '#footer-section')}
                  style={{ transition: 'color 0.3s ease', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'inherit'; }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}
        >
          <p className="font-body">
            © {new Date().getFullYear()} Babubhai Thiba. All rights reserved.
          </p>
          <button
            onClick={() => onNavigate('#hero-section')}
            className="editorial-eyebrow flex items-center gap-2"
            style={{
              color: 'var(--text-muted)',
              transition: 'color 0.3s ease',
              minHeight: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-dark)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
          >
            BACK TO TOP <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
