import { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CartItem } from '../../types/fragrance';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.fragrance.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    setOrderConfirmed(true);
    onClearCart();
  };

  const handleClose = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/[0.12] bg-[#151412] text-[#F4F0E8]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.12] px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 stroke-[1.5] text-[#B58A55]" />
                <h2 className="font-serif text-xl tracking-wide">
                  Shopping Bag
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close shopping bag"
                className="inline-flex h-10 w-10 items-center justify-center text-[#A9A49A] hover:text-[#F4F0E8] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {orderConfirmed ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="inline-flex h-12 w-12 items-center justify-center border border-[#B58A55] text-[#B58A55]">
                    <Check className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-[#F4F0E8]">
                    Demo Checkout Complete
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#A9A49A]">
                    This concept checkout does not process a payment or place an
                    order. Your bag has been cleared for this demo.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-8 border border-[#B58A55] px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase text-[#B58A55] transition-colors hover:bg-[#B58A55] hover:text-[#11110F] active:bg-[#a87945] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151412] cursor-pointer"
                  >
                    Return to Gallery
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <p className="font-serif text-2xl text-[#F4F0E8]">
                    Your bag is empty
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-[#A9A49A]">
                    Explore our three signature amber-glass compositions to begin
                    your collection.
                  </p>
                  <a
                    href="#collection"
                    onClick={handleClose}
                    className="mt-7 border border-white/[0.16] px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] transition-colors hover:border-[#B58A55] hover:text-[#B58A55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A55]"
                  >
                    Browse Collection
                  </a>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.1]">
                  {items.map(({ fragrance, quantity }) => (
                    <li key={fragrance.id} className="flex gap-4 py-5">
                      <img
                        src={fragrance.imageUrl}
                        alt={fragrance.imageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="h-24 w-20 shrink-0 object-cover border border-white/[0.1] bg-[#1A1814]"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] tracking-[0.14em] uppercase text-[#B58A55]">
                              {fragrance.number} · {fragrance.volumeMl} ml
                            </p>
                            <h3 className="mt-0.5 font-serif text-lg text-[#F4F0E8]">
                              {fragrance.name}
                            </h3>
                          </div>
                          <span className="text-sm font-medium tabular-nums text-[#F4F0E8]">
                            ${fragrance.price * quantity}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-white/[0.14]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(fragrance.id, -1)}
                              aria-label={`Decrease ${fragrance.name} quantity`}
                              className="inline-flex h-8 w-8 items-center justify-center text-[#A9A49A] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs tabular-nums text-[#F4F0E8]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(fragrance.id, 1)}
                              aria-label={`Increase ${fragrance.name} quantity`}
                              className="inline-flex h-8 w-8 items-center justify-center text-[#A9A49A] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(fragrance.id)}
                            aria-label={`Remove ${fragrance.name}`}
                            className="inline-flex items-center gap-1 text-xs text-[#A9A49A] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5 stroke-[1.5]" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer Checkout Summary */}
            {items.length > 0 && !orderConfirmed && (
              <div className="border-t border-white/[0.12] bg-[#11110F] px-6 py-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#A9A49A]">
                  <span>Complimentary Courier &amp; 2ml Sample Vials</span>
                  <span className="text-[#B58A55]">Included</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-4">
                  <span className="text-xs tracking-[0.18em] uppercase text-[#A9A49A]">
                    Subtotal
                  </span>
                  <span className="font-sans text-xl font-medium tabular-nums text-[#F4F0E8]">
                    ${subtotal}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-[#B58A55] py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-[#11110F] hover:bg-[#c89b62] transition-colors cursor-pointer"
                >
                  Complete Demo Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
