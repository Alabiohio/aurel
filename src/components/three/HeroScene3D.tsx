import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';
import { HERO_FALLBACK_IMAGE } from '../../data/fragrances';
import { SceneRenderConfig } from '../../types/fragrance';
import { PerfumeBottleModel } from './PerfumeBottleModel';
import { PerfumeStudioRig } from './PerfumeStudioRig';
import { detectWebGLCapabilities } from './webglSupport';

interface SceneRenderSchedulerProps {
  active: boolean;
  visible: boolean;
  invalidateRef: React.MutableRefObject<() => void>;
}

function SceneRenderScheduler({
  active,
  visible,
  invalidateRef,
}: SceneRenderSchedulerProps) {
  const invalidate = useThree((state) => state.invalidate);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    invalidateRef.current = invalidate;
    return () => {
      invalidateRef.current = () => {};
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [invalidate, invalidateRef]);

  useEffect(() => {
    if (visible) invalidate();
  }, [visible, invalidate]);

  useEffect(() => {
    if (active) return;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [active]);

  useFrame(() => {
    if (!active || timerRef.current !== null) return;
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      invalidate();
    }, 1000 / 30);
  });

  return null;
}

interface HeroScene3DProps extends SceneRenderConfig {
  className?: string;
}

/**
 * Modular 3D Hero Scene Controller.
 * Configured with clean separation so a future Spline scene URL (`splineSceneUrl`)
 * can drop into the same viewport container without altering layout or interaction state.
 */
export function HeroScene3D({
  splineSceneUrl,
  enableMouseTracking = true,
  autoRotateSpeed = 0.18,
  className = '',
}: HeroScene3DProps) {
  const capabilities = useMemo(() => detectWebGLCapabilities(), []);
  const [contextLost, setContextLost] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1024 : window.innerWidth
  );
  const [hasCoarsePointer, setHasCoarsePointer] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  );
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible'
  );
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const dragRotationYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const canvasEventsCleanupRef = useRef<(() => void) | null>(null);
  const invalidateRef = useRef<() => void>(() => {});

  useEffect(() => {
    let resizeFrame = 0;
    const handleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const handlePointerChange = (event: MediaQueryListEvent) => {
      setHasCoarsePointer(event.matches);
    };

    pointerQuery.addEventListener('change', handlePointerChange);
    return () => pointerQuery.removeEventListener('change', handlePointerChange);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const node = sceneContainerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { rootMargin: '100px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      canvasEventsCleanupRef.current?.();
    },
    []
  );

  useEffect(() => {
    if (contextLost) {
      canvasEventsCleanupRef.current?.();
      canvasEventsCleanupRef.current = null;
    }
  }, [contextLost]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    invalidateRef.current();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    invalidateRef.current();
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    dragRotationYRef.current += deltaX * 0.0085;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    invalidateRef.current();
  };

  // Architectural extension point for future Spline integration
  if (splineSceneUrl) {
    return (
      <div
        data-spline-ready="true"
        data-spline-url={splineSceneUrl}
        className={`relative w-full h-full ${className}`}
      >
        <img
          src={HERO_FALLBACK_IMAGE}
          alt="AUREL Noir Ambre amber glass flacon"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Graceful fallback when WebGL is unavailable or context is lost
  if (!capabilities.supported || contextLost) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center bg-[#11110F] ${className}`}
        role="img"
        aria-label="AUREL sculptural amber glass perfume bottle in warm chiaroscuro lighting"
      >
        <img
          src={HERO_FALLBACK_IMAGE}
          alt="AUREL sculptural amber glass perfume bottle"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center opacity-85"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#11110F_82%)]"
        />
      </div>
    );
  }

  const isMobile = viewportWidth < 768 || hasCoarsePointer;
  const enableHighQuality = !capabilities.isSoftwareGl && !isMobile;
  const devicePixelRatio =
    typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  const maxDpr = capabilities.isSoftwareGl
    ? 1
    : Math.min(devicePixelRatio, isMobile ? 1.25 : 1.75);
  const effectiveCameraZ = isMobile ? 7.6 : 6.4;
  const effectiveFov = isMobile ? 38 : 34;

  return (
    <div
      className={`relative w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div ref={sceneContainerRef} className="h-full w-full">
        <Canvas
          key={isMobile ? 'mobile' : 'desktop'}
          dpr={[1, maxDpr]}
          frameloop={isDocumentVisible && isHeroVisible ? 'demand' : 'never'}
          shadows={enableHighQuality}
          camera={{
            position: [0, 0.35, effectiveCameraZ],
            fov: effectiveFov,
            near: 0.1,
            far: 40,
          }}
          gl={{
            antialias: enableHighQuality,
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.12,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            const onLost = (event: Event) => {
              event.preventDefault();
              setContextLost(true);
            };
            canvas.addEventListener('webglcontextlost', onLost, false);
            canvasEventsCleanupRef.current = () => {
              canvas.removeEventListener('webglcontextlost', onLost, false);
            };
          }}
        >
          <SceneRenderScheduler
            active={
              isDocumentVisible &&
              isHeroVisible &&
              !prefersReducedMotion
            }
            visible={isDocumentVisible && isHeroVisible}
            invalidateRef={invalidateRef}
          />
          <Suspense fallback={null}>
            <PerfumeStudioRig isLowPower={!enableHighQuality} />
            <PerfumeBottleModel
              isSoftwareGl={capabilities.isSoftwareGl}
              isMobile={isMobile}
              isLowPower={!enableHighQuality}
              enableMouseTracking={enableMouseTracking && !prefersReducedMotion}
              autoRotateSpeed={
                prefersReducedMotion
                  ? 0
                  : isMobile
                    ? autoRotateSpeed * 0.75
                    : autoRotateSpeed
              }
              reduceMotion={Boolean(prefersReducedMotion)}
              dragRotationYRef={dragRotationYRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
