import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({
  children,
  className = '',
  delay = 0,
}: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={
        prefersReducedMotion
          ? false
          : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }
      }
      whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.9,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="h-full w-full"
        initial={prefersReducedMotion ? false : { scale: 1.08 }}
        whileInView={{ scale: 1.04 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.1,
          delay: prefersReducedMotion ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ y: prefersReducedMotion ? 0 : y }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
