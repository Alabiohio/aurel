import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { FRAGRANCES } from '../../data/fragrances';
import { Fragrance } from '../../types/fragrance';
import { BlurText } from '../reactbits/BlurText';
import { FadeContent } from '../reactbits/FadeContent';
import { Magnet } from '../reactbits/Magnet';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { TiltedCard } from '../reactbits/TiltedCard';

interface CollectionSectionProps {
  onAddToCart: (fragrance: Fragrance) => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export function CollectionSection({
  onAddToCart,
  onSelectFragrance,
}: CollectionSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleQuickAdd = (
    e: React.MouseEvent<HTMLButtonElement>,
    fragrance: Fragrance
  ) => {
    e.stopPropagation();
    onAddToCart(fragrance);
    setRecentlyAddedId(fragrance.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === fragrance.id ? null : curr));
    }, 1200);
  };

  return (
    <section
      id="collection"
      className="relative border-t border-white/[0.12] bg-[#11110F] py-24 md:py-32 px-5 md:px-10"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Editorial Header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.12] pb-8">
          <FadeContent>
            <p className="mb-3 text-xs font-medium tracking-[0.22em] uppercase text-[#B58A55]">
              01 · The Signature Trilogy
            </p>
            <BlurText
              as="h2"
              text="Three Compositions in Amber"
              delay={0.04}
              className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#F4F0E8] text-balance"
            />
          </FadeContent>

          <FadeContent delay={0.12} className="max-w-md">
            <p className="text-sm md:text-[15px] leading-relaxed text-[#A9A49A]">
              Each flacon is filled in numbered batches in Grasse, resting twelve
              ninety days in darkness before release to preserve volatile top-note clarity.
            </p>
          </FadeContent>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FRAGRANCES.map((fragrance, index) => {
            const isAdded = recentlyAddedId === fragrance.id;
            const imageFailed = failedImages[fragrance.id];

            return (
              <FadeContent
                key={fragrance.id}
                delay={index * 0.08}
                className="flex h-full flex-col"
              >
                <TiltedCard className="flex h-full flex-col">
                  <SpotlightCard
                    onClick={() => onSelectFragrance(fragrance)}
                    ariaLabel={`View ${fragrance.name} fragrance details`}
                    className="group flex-1 flex flex-col rounded-3xl border border-white/[0.12] bg-[#161512] transition-transform duration-300 ease-out hover:-translate-y-0.5 cursor-pointer"
                  >
                  {/* Product Portrait (3:4) */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1A1814] border-b border-white/[0.08]">
                    {!imageFailed ? (
                      <img
                        src={fragrance.imageUrl}
                        alt={fragrance.imageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [fragrance.id]: true,
                          }))
                        }
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(181,138,85,0.22),#161512)] p-8 text-center">
                        <span className="font-serif text-3xl text-[#B58A55]">
                          {fragrance.number}
                        </span>
                        <span className="mt-2 font-serif text-2xl text-[#F4F0E8]">
                          {fragrance.name}
                        </span>
                      </div>
                    )}

                    {/* Subtle editorial scrim & inspect cue */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#11110F]/85 via-[#11110F]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    <div className="absolute inset-x-5 bottom-4 flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#F4F0E8]">
                      <span className="text-[#A9A49A] group-hover:text-[#F4F0E8] transition-colors">
                        {fragrance.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[#B58A55] opacity-85 group-hover:opacity-100 transition-opacity">
                        Inspect Notes
                        <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Product Editorial Metadata & Actions */}
                  <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                    <div>
                      {/* Clean unboxed metadata (zero-pill discipline) */}
                      <div className="mb-2.5 flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-[#A9A49A]">
                        <span>{fragrance.concentration}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{fragrance.volumeMl} ml</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="min-w-0 break-words font-serif text-[clamp(1.25rem,6vw,1.625rem)] font-normal tracking-wide text-[#F4F0E8]">
                          {fragrance.name}
                        </h3>
                        <span className="font-sans text-[15px] font-medium tabular-nums text-[#F4F0E8] shrink-0">
                          ${fragrance.price}
                        </span>
                      </div>

                      <p className="mt-1 text-xs italic font-serif text-[#B58A55]">
                        {fragrance.subtitle}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-[#A9A49A]">
                        {fragrance.description}
                      </p>
                    </div>

                    {/* Key Olfactory Triad & Purchase Action */}
                    <div className="mt-6 pt-5 border-t border-white/[0.08]">
                      <p className="mb-4 text-xs text-[#A9A49A] truncate">
                        {fragrance.notes.heart.join(' · ')}
                      </p>

                      <Magnet className="w-full" strength={0.12}>
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, fragrance)}
                          className={`w-full inline-flex items-center rounded-xl justify-center gap-2 min-h-[44px] px-5 py-2.5 text-xs font-medium tracking-[0.18em] uppercase border transition-colors duration-200 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A55] ${
                            isAdded
                              ? 'bg-[#B58A55] border-[#B58A55] text-[#11110F]'
                              : 'border-white/[0.16] bg-transparent text-[#F4F0E8] hover:border-[#B58A55] hover:text-[#B58A55]'
                          }`}
                        >
                          <Plus className="h-3.5 w-3.5 stroke-[1.75]" />
                          <span>{isAdded ? 'Added to Bag' : 'Add to Bag'}</span>
                        </button>
                      </Magnet>
                    </div>
                  </div>
                  </SpotlightCard>
                </TiltedCard>
              </FadeContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
