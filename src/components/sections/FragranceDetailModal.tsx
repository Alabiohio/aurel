import { useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Fragrance } from '../../types/fragrance';

interface FragranceDetailModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance) => void;
}

export function FragranceDetailModal({
  fragrance,
  onClose,
  onAddToCart,
}: FragranceDetailModalProps) {
  useEffect(() => {
    if (!fragrance) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fragrance, onClose]);

  return (
    <AnimatePresence>
      {fragrance && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fragrance-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80"
          />

          {/* Modal Surface */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90dvh] overflow-y-auto border border-white/[0.14] bg-[#151412] grid grid-cols-1 md:grid-cols-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close fragrance details"
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-white/[0.14] bg-[#11110F] text-[#F4F0E8] hover:border-[#B58A55] hover:text-[#B58A55] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4 stroke-[1.5]" />
            </button>

            {/* Left Portrait */}
            <div className="md:col-span-5 aspect-[3/4] md:aspect-auto bg-[#1A1814] border-b md:border-b-0 md:border-r border-white/[0.1]">
              <img
                src={fragrance.imageUrl}
                alt={fragrance.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Right Olfactory Architecture & Purchase */}
            <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 pr-10 text-xs tracking-[0.16em] uppercase text-[#B58A55]">
                  <span>{fragrance.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{fragrance.concentration}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{fragrance.volumeMl} ml</span>
                </div>

                <h3
                  id="fragrance-modal-title"
                  className="mt-3 font-serif text-3xl md:text-4xl font-normal text-[#F4F0E8]"
                >
                  {fragrance.name}
                </h3>

                <p className="mt-1.5 font-serif italic text-base text-[#A9A49A]">
                  “{fragrance.editorialQuote}”
                </p>

                <p className="mt-5 text-sm leading-relaxed text-[#A9A49A]">
                  {fragrance.description}
                </p>

                {/* Olfactory Pyramid */}
                <div className="mt-8 space-y-4 border-t border-white/[0.1] pt-6">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B58A55]">
                      Top Notes
                    </p>
                    <p className="mt-1 text-sm text-[#F4F0E8]">
                      {fragrance.notes.top.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B58A55]">
                      Heart Notes
                    </p>
                    <p className="mt-1 text-sm text-[#F4F0E8]">
                      {fragrance.notes.heart.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B58A55]">
                      Base Notes
                    </p>
                    <p className="mt-1 text-sm text-[#F4F0E8]">
                      {fragrance.notes.base.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.1] pt-6">
                <div>
                  <span className="block text-[11px] tracking-[0.18em] uppercase text-[#A9A49A]">
                    Price
                  </span>
                  <span className="font-sans text-2xl font-medium tabular-nums text-[#F4F0E8]">
                    ${fragrance.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(fragrance);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#B58A55] px-7 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#11110F] hover:bg-[#c89b62] transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4 stroke-[1.75]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
