import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  label: string;
  description: React.ReactNode;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    label: 'Films',
    description: (
      <>
        Produced the Hindi films <em>Dilwale Kabhi Na Hare</em> and{' '}
        <em>Dil Lagake Dekho</em>.
      </>
    ),
  },
  {
    label: 'TV Shows',
    description: (
      <>
        Produced TV serials <em>Mr. Dhansukh</em> (written by and starring Kadar
        Khan) on Doordarshan, <em>Haal Kaisa Hai Janab Ka</em> on Sony TV, and{' '}
        <em>Badalte Rishtey</em> on Zee TV, along with the Urdu serial{' '}
        <em>Bachelor</em> and a Gujarati reality show, both on ETV.
      </>
    ),
  },
  {
    label: 'Gujarati Films',
    description: (
      <>
        Produced three Gujarati films — <em>Paraki Thapan</em>,{' '}
        <em>Pankhi No Malo</em>, and <em>Pooja Na Phool</em> — all three
        box-office hits.
      </>
    ),
  },
  {
    label: 'Bhojpuri Films',
    description: (
      <>
        Produced the Bhojpuri film <em>Jiya Bekarar Ba</em>.
      </>
    ),
  },
  {
    label: 'Business Manager',
    description:
      'Worked as Business Manager to 50 leading film stars, and continues to manage more than 25 known artists.',
  },
  {
    label: 'Events',
    description:
      'Organized concerts, shows, and events for film stars and music celebrities across India and abroad; also organized exhibitions and conferences internationally.',
  },
  {
    label: 'Associate Producer',
    description:
      'Worked as Associate/Executive Producer and Casting Consultant on 200+ star-cast Hindi feature films over 40 years, and continues as a consultant to corporate production houses.',
  },
  {
    label: 'OTT',
    description: (
      <>
        Produced the web series <em>RET Mafia</em> (An Untold Story of Sand
        Mafias) on Amazon.
      </>
    ),
  },
  {
    label: 'Ad Films',
    description: '450+ Ads produced for various clients.',
  },
 {
  label: 'Journalism',
  description:
    'Worked as Assistant Editor at a leading daily newspaper and at All India Radio; also worked as a columnist for various magazines for 25 years and publishes the Show World film directory, ongoing for 25 years.',
},
  {
    label: 'Consultant',
    description:
      'Consultant for in-film advertising and branding, and for finance, distribution, and marketing across all forms of media.',
  },
  {
    label: 'Corporate',
    description:
      'Worked as CEO, COO, and President of various corporate entertainment production houses and a TV channel.',
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience-section"
      ref={containerRef}
      className="relative py-24 md:py-36"
      style={{
        backgroundColor: 'var(--bg-light-alt)',
        color: 'var(--text-dark)',
        borderBottom: '1px solid var(--divider-light)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Title Column — sticky on desktop */}
        <div className="md:col-span-5 lg:col-span-5">
          <div className="md:sticky" style={{ top: '120px' }}>
            <span
              className="editorial-eyebrow mb-4 block"
              style={{ color: 'var(--text-muted)' }}
            >
              CAREER SPREAD
            </span>
            <h2
              className="clamp-h2 font-display font-bold tracking-tight"
              style={{ color: 'var(--text-dark)' }}
            >
              Experience
            </h2>
          </div>
        </div>

        {/* Scrollable List Column */}
        <div className="md:col-span-7 lg:col-span-7 flex flex-col gap-0">
          {EXPERIENCES.map((item, idx) => (
            <div
              key={item.label}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              className="group flex flex-col gap-2 py-7 md:py-8"
              style={{
                borderTop: '1px solid var(--divider-light)',
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="editorial-eyebrow shrink-0 exp-number-mobile-hide"
                  style={{ color: 'var(--accent)' }}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <h3
                  className="font-display font-bold tracking-tight"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    color: 'var(--text-dark)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--text-dark)';
                  }}
                >
                  {item.label}
                </h3>
              </div>
              <p
                className="font-body leading-relaxed md:pl-10"
                style={{
                  color: 'rgba(33, 28, 24, 0.7)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  lineHeight: '1.7',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
