import { useState } from 'react';
import { STORY_ATELIER_IMAGE } from '../../data/fragrances';
import { BlurText } from '../reactbits/BlurText';
import { FadeContent } from '../reactbits/FadeContent';
import { ImageReveal } from '../reactbits/ImageReveal';

const CRAFT_CHAPTERS = [
  {
    index: '01.',
    title: 'Maceration in Shadow',
    detail:
      'Every batch rests for ninety days inside ultraviolet-blocking amber glass vessels so botanical aldehydes and resins marry without thermal shock.',
  },
  {
    index: '02.',
    title: 'Wild-Harvested Resins',
    detail:
      'We source single-origin Andalusian labdanum, kiln-charred Atlas cedar, and three-year aged Florentine iris butter directly from family cooperatives.',
  },
  {
    index: '03.',
    title: 'Small-Batch Architecture',
    detail:
      'Extraits are blended at 28% concentration; eaux de parfum at 20%. No synthetic dyes, with a skin-close sillage designed to evolve over twelve hours.',
  },
];

export function BrandStorySection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="story"
      className="relative border-t border-white/[0.12] bg-[#11110F] py-24 md:py-36 px-5 md:px-10"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Editorial Typography & Craft Chapters */}
          <div className="lg:col-span-7">
            <p className="mb-4 text-xs font-medium tracking-[0.22em] uppercase text-[#B58A55]">
              02 · Our Story
            </p>

            <FadeContent>
              <BlurText
                as="h2"
                text="We compose fragrances not to announce a room, but to archive a moment."
                className="font-serif text-[clamp(2.15rem,3.9vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#F4F0E8] text-balance"
              />
            </FadeContent>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/[0.12] pt-8">
              <FadeContent delay={0.1}>
                <p className="text-sm md:text-[15px] leading-relaxed text-[#A9A49A]">
                  Founded between Paris and Grasse, AUREL treats perfumery as
                  architectural memory. Each accord begins as a tactile study of
                  raw timber, smoked resin, and mineral stone—stripped of excess
                  ornament until only emotional resonance remains.
                </p>
              </FadeContent>
              <FadeContent delay={0.18}>
                <p className="text-sm md:text-[15px] leading-relaxed text-[#A9A49A]">
                  Our bottles are blown in thick apothecary amber glass and crowned
                  with lathe-turned brushed bronze, designed to shelter delicate
                  botanical absolutes from light while aging gracefully on stone.
                </p>
              </FadeContent>
            </div>

            {/* Three Editorial Craft Pillars */}
            <div className="mt-14 space-y-8 border-t border-white/[0.12] pt-10">
              {CRAFT_CHAPTERS.map((chapter, idx) => (
                <FadeContent
                  key={chapter.index}
                  delay={idx * 0.08}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <span className="sm:col-span-2 font-serif text-lg text-[#B58A55] tabular-nums">
                    {chapter.index}
                  </span>
                  <h3 className="sm:col-span-4 font-serif text-xl text-[#F4F0E8]">
                    {chapter.title}
                  </h3>
                  <p className="sm:col-span-6 text-sm leading-relaxed text-[#A9A49A]">
                    {chapter.detail}
                  </p>
                </FadeContent>
              ))}
            </div>
          </div>

          {/* Right Column: Asymmetrical Offset Atmospheric Atelier Imagery */}
          <div className="lg:col-span-5 lg:mt-16">
            <figure className="border border-white/[0.12] bg-[#161512] p-3 rounded-xl md:p-4">
              <ImageReveal className="aspect-[4/3] w-full bg-[#1A1814]">
                {!imgError ? (
                  <img
                    src={STORY_ATELIER_IMAGE}
                    alt="AUREL perfumery atelier workbench with amber glass vessels, dried vetiver roots, and raw labdanum resin"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#181714] p-8 text-center">
                    <span className="font-serif text-2xl text-[#B58A55]">
                      Atelier Grasse · Maceration Archive
                    </span>
                  </div>
                )}
              </ImageReveal>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs text-[#A9A49A]">
                <span>Atelier Grasse · Cold Maceration Table</span>
              </figcaption>
            </figure>

            {/* Offset editorial pull-quote */}
            <FadeContent delay={0.12} className="mt-8 border-t border-white/[0.12] pt-6">
              <blockquote className="font-serif italic text-xl md:text-2xl leading-snug text-[#F4F0E8]">
                “Time is the unseen fourth ingredient in every flacon we seal.”
              </blockquote>
              <p className="mt-2.5 text-xs tracking-[0.16em] uppercase text-[#A9A49A]">
                Henri Moreau · Master Perfumer, AUREL
              </p>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  );
}
