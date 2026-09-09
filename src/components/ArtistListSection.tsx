import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { ARTIST_CATEGORIES, logMissingImages } from '../data/artists';
import type { Artist, ArtistCategory } from '../data/artists';

/* ─────────────────────────────────────────────────────────────
   ARTIST CARD
   — memoised so a row re-render doesn't re-paint every card.
   — hover state is LOCAL to this card; no parent re-render.
───────────────────────────────────────────────────────────── */
const ArtistCard: React.FC<{
  artist: Artist;
  onTap: () => void;
}> = memo(({ artist, onTap }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasImage    = !!artist.image;
  const hasInstagram = !!artist.instagram;

  const cardContent = (
    <div
      className="flex flex-col items-center gap-3 px-2 md:px-3 shrink-0 select-none"
      style={{
        width: 'clamp(110px, 14vw, 160px)',
        cursor: hasInstagram ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTap}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: '14px',
          /*
           * PERF: use CSS transition only — no GSAP, no React state-driven
           * style object on every frame. GPU composites only transform/opacity.
           */
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
          boxShadow: isHovered
            ? '0 0 0 2px var(--accent), 0 12px 32px rgba(0,0,0,0.18)'
            : '0 0 0 0px transparent',
          /*
           * PERF: content-visibility skips rendering off-screen cards entirely.
           * Intrinsic size hint prevents layout reflow when they enter view.
           */
          contentVisibility: 'auto',
          containIntrinsicSize: 'auto 147px',   /* 110px wide × 4/3 ≈ 147px tall */
        }}
      >
        {hasImage ? (
          <img
            src={artist.image!}
            alt={artist.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          /* Missing-image fallback */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              border: '1.5px dashed rgba(119, 113, 104, 0.35)',
              borderRadius: '14px',
              backgroundColor: 'var(--bg-light-alt)',
            }}
          >
            {isHovered && hasInstagram && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(90, 32, 40, 0.08)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="var(--accent)" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: 0.7 }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="var(--accent)" stroke="none" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Instagram overlay hint */}
        {hasImage && isHovered && hasInstagram && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.28)', borderRadius: '14px' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
            </svg>
          </div>
        )}
      </div>

      {/* Name */}
      <span
        className="editorial-eyebrow text-center"
        style={{
          color: isHovered ? 'var(--text-dark)' : 'var(--text-muted)',
          transition: 'color 0.3s ease',
          fontSize: '10px',
          letterSpacing: '0.12em',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {artist.name}
      </span>
    </div>
  );

  if (hasInstagram) {
    return (
      <a
        href={artist.instagram!}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        aria-label={`View ${artist.name} on Instagram`}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
});
ArtistCard.displayName = 'ArtistCard';

/* ─────────────────────────────────────────────────────────────
   MARQUEE ROW
   Performance notes:
   - willChange is applied ONLY while the section is visible.
   - The animation is a pure CSS keyframe on the track element;
     no JS drives it frame-to-frame.
   - We render only 2 copies (not 3) for a tighter loop.
     marquee-left/-right already shift by -33.33% so 3 copies
     were used for a 3-copy loop; 2 copies + -50% shift is
     equally seamless and ~33% fewer DOM nodes/images.
     We keep 3 copies to match the original keyframe definition.
   - Pausing via animationPlayState = 'paused' (no JS RAF loop).
───────────────────────────────────────────────────────────── */
const MarqueeRow: React.FC<{
  category: ArtistCategory;
  isVisible: boolean;
}> = ({ category, isVisible }) => {
  const [isRowHovered, setIsRowHovered] = useState(false);
  const tapTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const handleTap = useCallback((_name: string) => {
    if (window.matchMedia('(pointer: fine)').matches) return;
    /* Pause on tap for 2 s — handled inside ArtistCard now via local state,
       but we still need to pause the row scroll. */
    setIsRowHovered(true);
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = window.setTimeout(() => {
      setIsRowHovered(false);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    };
  }, []);

  const isPaused      = !isVisible || isRowHovered;
  const animationName = category.direction === 'left' ? 'marquee-left' : 'marquee-right';

  /* Reduced motion: static wrapped grid */
  if (prefersReducedMotion.current) {
    return (
      <div className="w-full">
        <div className="px-6 md:px-12 mb-3">
          <span
            className="editorial-eyebrow inline-flex items-center gap-2"
            style={{ color: 'var(--accent)', fontSize: '10px' }}
          >
            <span style={{ width: '16px', height: '1px', backgroundColor: 'var(--accent)', display: 'inline-block' }} />
            {category.shortLabel}
          </span>
        </div>
        <div className="px-6 md:px-12 flex flex-wrap gap-4">
          {category.artists.map((artist) => (
            <ArtistCard
              key={artist.name}
              artist={artist}
              onTap={() => handleTap(artist.name)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col gap-2 md:gap-0"
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      {/* Mobile label */}
      <div className="px-6 md:px-12 mb-2 md:hidden">
        <span
          className="editorial-eyebrow inline-flex items-center gap-2"
          style={{ color: 'var(--accent)', fontSize: '10px' }}
        >
          <span style={{ width: '16px', height: '1px', backgroundColor: 'var(--accent)', display: 'inline-block' }} />
          {category.shortLabel}
        </span>
      </div>

      {/* Full-bleed marquee */}
      <div className="w-screen relative overflow-hidden">
        {/* Desktop floating label */}
        <span
          className="editorial-eyebrow hidden md:inline-flex items-center gap-2 absolute top-3 left-6 z-10 pointer-events-none"
          style={{
            color: 'var(--accent)',
            fontSize: '10px',
            backgroundColor: 'var(--bg-roster)',
            padding: '4px 10px 4px 0',
          }}
        >
          <span style={{ width: '16px', height: '1px', backgroundColor: 'var(--accent)', display: 'inline-block' }} />
          {category.shortLabel}
        </span>

        <div
          className="flex"
          style={{
            width: 'max-content',
            /*
             * PERF: willChange only while visible — avoid promoting a huge
             * compositor layer while this section is far offscreen.
             */
            willChange: isVisible ? 'transform' : 'auto',
            animation: `${animationName} ${category.duration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* 3 copies for seamless loop (matches marquee-left/right keyframes) */}
          {[0, 1, 2].map((copyIdx) => (
            <div
              key={copyIdx}
              className="flex items-center py-4 md:py-5"
              aria-hidden={copyIdx > 0 ? 'true' : undefined}
            >
              {category.artists.map((artist) => (
                <ArtistCard
                  key={`${copyIdx}-${artist.name}`}
                  artist={artist}
                  onTap={() => handleTap(artist.name)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Artist List Section ─── */
export const ArtistListSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    logMissingImages();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }   /* slightly smaller threshold for earlier pause */
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="artist-list-section"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-roster)',
        color: 'var(--text-dark)',
        borderBottom: '1px solid var(--divider-light)',
      }}
    >
      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <span
          className="editorial-eyebrow mb-4 block"
          style={{ color: 'var(--text-muted)' }}
        >
          ROSTER
        </span>
        <h2
          className="clamp-h2 font-display font-bold tracking-tight"
          style={{ color: 'var(--text-dark)' }}
        >
          Artist List
        </h2>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-6 md:gap-8">
        {ARTIST_CATEGORIES.map((category) => (
          <MarqueeRow
            key={category.id}
            category={category}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
};
