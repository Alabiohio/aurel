import { lazy, Suspense, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { BrandStorySection } from './components/sections/BrandStorySection';
import { CollectionSection } from './components/sections/CollectionSection';
import { HeroSection } from './components/sections/HeroSection';
import { CartItem, Fragrance } from './types/fragrance';

const CartDrawer = lazy(() =>
  import('./components/cart/CartDrawer').then((module) => ({
    default: module.CartDrawer,
  }))
);
const FragranceDetailModal = lazy(() =>
  import('./components/sections/FragranceDetailModal').then((module) => ({
    default: module.FragranceDetailModal,
  }))
);

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartHasLoaded, setCartHasLoaded] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(
    null
  );
  const [detailModalHasLoaded, setDetailModalHasLoaded] = useState(false);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (fragrance: Fragrance) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.fragrance.id === fragrance.id);
      if (existing) {
        return prev.map((item) =>
          item.fragrance.id === fragrance.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { fragrance, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.fragrance.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.fragrance.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCart = () => {
    setCartHasLoaded(true);
    setIsCartOpen(true);
  };

  const handleSelectFragrance = (fragrance: Fragrance) => {
    setDetailModalHasLoaded(true);
    setSelectedFragrance(fragrance);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="min-h-screen bg-[#11110F] text-[#F4F0E8] font-sans"
      >
        <Navbar
          cartCount={totalCount}
          onOpenCart={handleOpenCart}
        />

        <main>
          <HeroSection />
          <CollectionSection
            onAddToCart={handleAddToCart}
            onSelectFragrance={handleSelectFragrance}
          />
          <BrandStorySection />
        </main>

        <Footer />

        {detailModalHasLoaded && (
          <Suspense fallback={null}>
            <FragranceDetailModal
              fragrance={selectedFragrance}
              onClose={() => setSelectedFragrance(null)}
              onAddToCart={(fragrance) => {
                handleAddToCart(fragrance);
                handleOpenCart();
              }}
            />
          </Suspense>
        )}

        {cartHasLoaded && (
          <Suspense fallback={null}>
            <CartDrawer
              isOpen={isCartOpen}
              items={cartItems}
              onClose={() => setIsCartOpen(false)}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          </Suspense>
        )}
      </motion.div>
    </MotionConfig>
  );
}
