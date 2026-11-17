export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  concentration: string;
  volumeMl: number;
  price: number;
  description: string;
  editorialQuote: string;
  imageUrl: string;
  imageAlt: string;
  notes: OlfactoryNotes;
  amberTint: string;
}

export interface CartItem {
  fragrance: Fragrance;
  quantity: number;
}

export interface SceneRenderConfig {
  /** Future Spline scene URL hook for drop-in Spline integration */
  splineSceneUrl?: string;
  /** Enables subtle cursor parallax rotation */
  enableMouseTracking?: boolean;
  /** Auto rotation speed in radians per second */
  autoRotateSpeed?: number;
}
