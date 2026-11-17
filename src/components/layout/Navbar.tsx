import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };

    desktopQuery.addEventListener('change', closeMenuOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#11110F]/95 border-b border-white/[0.12]'
            : 'bg-gradient-to-b from-[#11110F]/85 to-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-[1440px] items-center justify-between gap-8 px-5 md:px-10">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#hero"
            className="font-serif text-xl md:text-2xl font-medium tracking-[0.28em] text-[#F4F0E8] hover:text-[#B58A55] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B58A55]"
          >
            AUREL
          </a>

          {/* Zone 2: Primary Editorial Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-10"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-1 text-xs font-medium tracking-[0.18em] uppercase text-[#A9A49A] hover:text-[#F4F0E8] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B58A55]"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#B58A55] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Zone 3: Shopping Bag Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag (${cartCount} items)`}
              className="group inline-flex items-center gap-2.5 min-h-[44px] px-3 text-xs font-medium tracking-[0.14em] uppercase text-[#F4F0E8] hover:text-[#B58A55] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B58A55]"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span className="tabular-nums text-[#A9A49A] group-hover:text-[#F4F0E8] transition-colors">
                ({cartCount})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[#F4F0E8] hover:text-[#B58A55] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B58A55]"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[1.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-30 bg-[#11110F] border-b border-white/[0.12] px-6 py-8 md:hidden"
          >
            <nav id="mobile-navigation" aria-label="Mobile Navigation" className="flex flex-col gap-5">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-baseline justify-between border-b border-white/[0.08] pb-4 font-serif text-2xl tracking-wide text-[#F4F0E8] hover:text-[#B58A55] transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="font-sans text-xs tracking-[0.2em] text-[#A9A49A]">
                    0{index + 1}
                  </span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="mt-2 inline-flex items-center justify-between py-2 text-xs font-medium tracking-[0.18em] uppercase text-[#B58A55]"
              >
                <span>View Shopping Bag</span>
                <span className="tabular-nums">({cartCount})</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
