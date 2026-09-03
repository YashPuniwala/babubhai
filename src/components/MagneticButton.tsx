import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'copper' | 'outline' | 'dark';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  href,
  children,
  variant = 'copper',
  className = '',
  onClick,
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const variantStyles = {
    'copper':
      'bg-transparent text-[#F2EEE7] hover:text-[#B08A4A] border border-transparent',
    'outline':
      'bg-transparent text-[#211C18] border border-[#211C18]/30 hover:border-[#5A2028] hover:text-[#5A2028] hover:bg-[#5A2028]/5',
    'dark':
      'bg-[#211C18] text-[#F2EEE7] hover:bg-[#5A2028] border border-transparent shadow-sm hover:shadow-md'
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.03 : 1})`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)'
          : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`inline-flex items-center justify-center gap-3 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 relative group select-none ${variantStyles[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {/* Subtle bottom line for 'copper' variant */}
      {variant === 'copper' && (
        <span
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[#B08A4A] scale-x-50 group-hover:scale-x-100 transition-transform duration-300"
        />
      )}
    </a>
  );
};
