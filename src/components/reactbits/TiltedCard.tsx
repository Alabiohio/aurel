import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltedCard({
  children,
  className = '',
  maxTilt = 4,
}: TiltedCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 24, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 24, mass: 0.5 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(-y * maxTilt);
    rotateY.set(x * maxTilt);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
