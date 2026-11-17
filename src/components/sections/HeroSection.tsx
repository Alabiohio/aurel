import { ArrowDownRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Magnet } from '../reactbits/Magnet';
import { BlurText } from '../reactbits/BlurText';

const HeroScene3D = lazy(() =>
  import('../three/HeroScene3D').then((module) => ({
    default: module.HeroScene3D,
  }))
);

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#11110F] flex flex-col justify-between pt-20 pb-8 md:pt-24 md:pb-10"
    >
      {/* Subtle warm radial atmosphere behind the bottle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(181,138,85,0.11)_0%,rgba(17,17,15,0.2)_45%,#11110F_85%)]"
      />

      {/* Interactive 3D Amber Glass Perfume Bottle Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="h-full w-full bg-[radial-gradient(circle_at_50%_48%,rgba(181,138,85,0.16)_0%,#11110F_68%)]"
            />
          }
        >
          <HeroScene3D enableMouseTracking autoRotateSpeed={0.18} />
        </Suspense>
      </div>

      {/* Subtle bottom gradient blend into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-[1] bg-gradient-to-t from-[#11110F] to-transparent"
      />

      {/* Editorial DOM Typography Layer framing the unobstructed center bottle */}
      <div className="relative z-10 pointer-events-none mx-auto w-full max-w-[1440px] flex-1 flex flex-col justify-between px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 flex-1 py-4 md:py-8">
          {/* Left Flank: Primary Editorial Headline */}
          <div className="lg:col-span-5 self-start lg:self-center">
            <p className="mb-3 md:mb-4 text-xs font-medium tracking-[0.22em] uppercase text-[#B58A55]">
              Haute Parfumerie · Paris &amp; Grasse
            </p>
            <BlurText
              as="h1"
              text="SCENT IS A FORM OF MEMORY."
              className="font-serif font-normal text-[#F4F0E8] leading-[0.98] tracking-[-0.015em] text-balance text-[clamp(2.5rem,4.5vw,4.6rem)] drop-shadow-[0_4px_24px_rgba(17,17,15,0.9)]"
              delay={0.08}
            />
          </div>

          {/* Center Gap: Unobstructed Space for the 3D Amber Perfume Bottle */}
          <div className="hidden lg:block lg:col-span-2" aria-hidden="true" />

          {/* Right Flank: Supporting Copy & Explore Collection CTA */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 self-end lg:self-end lg:pb-12 flex flex-col items-start lg:items-end lg:text-right mt-[clamp(7rem,34vh,14rem)] sm:mt-[clamp(8rem,35vh,16rem)] lg:mt-0"
          >
            <p className="max-w-sm text-sm md:text-[15px] leading-relaxed text-[#A9A49A] bg-[#11110F]/45 lg:bg-transparent p-2 lg:p-0">
              Hand-blended botanical extracts macerated in dark amber glass.
              Sculptural olfactory architecture distilled for quiet permanence.
            </p>

            <div className="mt-6 pointer-events-auto">
              <Magnet strength={0.2}>
                <button
                  type="button"
                  onClick={scrollToCollection}
                  className="group inline-flex items-center gap-3 rounded-xl border border-[#B58A55]/70 bg-[#11110F]/90 px-6 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-[#F4F0E8] hover:bg-[#B58A55] hover:text-[#11110F] hover:border-[#B58A55] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A55]"
                >
                  <span>Explore Collection</span>
                  <ArrowDownRight className="h-4 w-4 stroke-[1.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              </Magnet>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
