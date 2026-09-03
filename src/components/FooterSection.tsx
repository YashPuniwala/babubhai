import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowUp,
} from 'lucide-react';

interface FooterSectionProps {
  onNavigate: (targetId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigate,
}) => {
  const handleAnchorClick = (
    e: React.MouseEvent,
    target: string
  ) => {
    e.preventDefault();
    onNavigate(target);
  };

  const navItems = [
    {
      label: 'Home',
      target: '#hero-section',
    },
    {
      label: 'About Us',
      target: '#about-section',
    },
    {
      label: 'Contact Us',
      target: '#footer-section',
    },
  ];

  return (
    <footer
      id="footer-section"
      className="
        relative
        pt-16
        sm:pt-20
        md:pt-24
        pb-8
        md:pb-10
      "
      style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
        borderTop:
          '1px solid var(--divider-light)',
      }}
    >
      {/* =====================================
          MAIN FOOTER CONTENT
      ====================================== */}

      <div
        className="
          max-w-[1440px]
          mx-auto
          px-6
          sm:px-8
          md:px-12
        "
      >
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-12
            gap-y-12
            sm:gap-x-10
            lg:gap-x-12
            pb-12
            md:pb-16
          "
          style={{
            borderBottom:
              '1px solid var(--divider-light)',
          }}
        >
          {/* =================================
              IDENTITY
          ================================== */}

          <div
            className="
              sm:col-span-2
              lg:col-span-5
              flex
              flex-col
              items-start
            "
          >
            <p
              className="
                font-display
                font-bold
                tracking-tight
                mb-4
              "
              style={{
                fontSize:
                  'clamp(1.8rem, 3vw, 2.6rem)',
                color:
                  'var(--text-dark)',
                lineHeight: '1.05',
              }}
            >
              Babubhai Thiba
            </p>

            <p
              className="font-body"
              style={{
                color:
                  'rgba(33, 28, 24, 0.6)',
                maxWidth: '34ch',
                lineHeight: '1.65',
                fontSize:
                  'clamp(0.95rem, 1.2vw, 1.05rem)',
              }}
            >
              Veteran Mumbai Film Producer,
              Celebrity Manager &amp;
              Consultant.
            </p>
          </div>

          {/* =================================
              CONTACT
          ================================== */}

          <div
            className="
              sm:col-span-1
              lg:col-span-3
            "
          >
            <span
              className="
                editorial-eyebrow
                block
                mb-5
              "
              style={{
                color:
                  'var(--text-muted)',
              }}
            >
              CONTACT
            </span>

            <ul
              className="
                flex
                flex-col
                gap-2
                font-body
              "
              style={{
                color:
                  'rgba(33, 28, 24, 0.7)',
              }}
            >
              {/* PHONE */}

              <li>
                <a
                  href="tel:+919867343123"
                  className="
                    flex
                    items-center
                    gap-3
                    py-1
                  "
                  style={{
                    transition:
                      'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'rgba(33, 28, 24, 0.7)';
                  }}
                >
                  <Phone
                    className="
                      w-4
                      h-4
                      shrink-0
                    "
                    style={{
                      color:
                        'var(--accent)',
                    }}
                  />

                  <span>
                    +91 9867 343123
                  </span>
                </a>
              </li>

              {/* EMAIL */}

              <li>
                <a
                  href="mailto:bthiba@gmail.com"
                  className="
                    flex
                    items-center
                    gap-3
                    py-1
                  "
                  style={{
                    transition:
                      'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'rgba(33, 28, 24, 0.7)';
                  }}
                >
                  <Mail
                    className="
                      w-4
                      h-4
                      shrink-0
                    "
                    style={{
                      color:
                        'var(--accent)',
                    }}
                  />

                  <span>
                    bthiba@gmail.com
                  </span>
                </a>
              </li>

              {/* WEBSITE */}

              <li>
                <a
                  href="https://www.babubhaithiba.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    py-1
                  "
                  style={{
                    transition:
                      'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'rgba(33, 28, 24, 0.7)';
                  }}
                >
                  <Globe
                    className="
                      w-4
                      h-4
                      shrink-0
                    "
                    style={{
                      color:
                        'var(--accent)',
                    }}
                  />

                  <span>
                    www.babubhaithiba.in
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* =================================
              MUMBAI OFFICE
          ================================== */}

          <div
            className="
              sm:col-span-1
              lg:col-span-3
            "
          >
            <span
              className="
                editorial-eyebrow
                block
                mb-5
              "
              style={{
                color:
                  'var(--text-muted)',
              }}
            >
              MUMBAI OFFICE
            </span>

            <div
              className="
                flex
                items-start
                gap-3
                font-body
              "
              style={{
                color:
                  'rgba(33, 28, 24, 0.7)',
                lineHeight: '1.6',
              }}
            >
              <MapPin
                className="
                  w-4
                  h-4
                  shrink-0
                  mt-1
                "
                style={{
                  color:
                    'var(--accent)',
                }}
              />

              <div>
                <p>
                  City Mall, Office No. 38,
                  New Link Road, Andheri West,
                  Mumbai – 400053
                </p>

                <p
                  className="mt-2"
                  style={{
                    color:
                      'var(--text-muted)',
                    fontSize:
                      '0.85rem',
                  }}
                >
                  Tel. 022-66931294
                </p>
              </div>
            </div>
          </div>

          {/* =================================
              NAVIGATION
          ================================== */}

          <div
            className="
              sm:col-span-2
              lg:col-span-1
            "
          >
            <span
              className="
                editorial-eyebrow
                block
                mb-5
              "
              style={{
                color:
                  'var(--text-muted)',
              }}
            >
              NAV
            </span>

            <ul
              className="
                flex
                flex-row
                flex-wrap
                gap-x-6
                gap-y-2
                lg:flex-col
                lg:gap-2
              "
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.target}
                    onClick={(e) =>
                      handleAnchorClick(
                        e,
                        item.target
                      )
                    }
                    className="
                      font-body
                      inline-flex
                      items-center
                      py-1
                    "
                    style={{
                      color:
                        'var(--text-dark)',
                      fontSize:
                        '0.9rem',
                      fontWeight: 500,
                      transition:
                        'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--text-dark)';
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =====================================
            BOTTOM BAR
        ====================================== */}

        <div
          className="
            pt-6
            md:pt-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
          style={{
            color:
              'var(--text-muted)',
            fontSize:
              '0.8rem',
          }}
        >
          {/* COPYRIGHT */}

          <p
            className="
              font-body
              text-center
              sm:text-left
            "
          >
            © {new Date().getFullYear()}{' '}
            Babubhai Thiba. All rights
            reserved.
          </p>

          {/* BACK TO TOP */}

          <button
            onClick={() =>
              onNavigate(
                '#hero-section'
              )
            }
            className="
              editorial-eyebrow
              flex
              items-center
              gap-2
            "
            style={{
              color:
                'var(--text-muted)',
              transition:
                'color 0.3s ease',
              minHeight: '40px',
              background:
                'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color =
                'var(--text-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                'var(--text-muted)';
            }}
          >
            BACK TO TOP

            <ArrowUp
              className="w-3.5 h-3.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};