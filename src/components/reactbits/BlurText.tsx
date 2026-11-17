import { motion, useReducedMotion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function BlurText({
  text,
  className = '',
  delay = 0,
  as = 'p',
}: BlurTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');
  const Component = motion[as];

  if (prefersReducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-[0.24em] last:mr-0 will-change-[transform,opacity,filter]"
          variants={{
            hidden: { opacity: 0, filter: 'blur(8px)', y: 12 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: {
                duration: 0.65,
                delay: delay + index * 0.032,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
