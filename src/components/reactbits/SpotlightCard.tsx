import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(181, 138, 85, 0.16)',
  onClick,
  ariaLabel,
}: SpotlightCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={(event) => {
        if (
          !onClick ||
          event.target !== event.currentTarget ||
          (event.key !== 'Enter' && event.key !== ' ')
        ) {
          return;
        }
        event.preventDefault();
        onClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? ariaLabel : undefined}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: prefersReducedMotion ? 0 : opacity,
          background: `radial-gradient(480px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
