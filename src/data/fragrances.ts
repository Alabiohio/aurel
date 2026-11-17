import { Fragrance } from '../types/fragrance';
import cedreFumeImage from '../assets/images/product_cedre_fume_1794849073934.jpg';
import irisObscurImage from '../assets/images/product_iris_obscur_1794849073848.jpg';
import noirAmbreImage from '../assets/images/product_noir_ambre_1794849073239.jpg';
import heroFallbackImage from '../assets/images/hero_amber_fallback_1794849075256.jpg';
import storyAtelierImage from '../assets/images/story_atelier_craft_1794849074702.jpg';

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'noir-ambre',
    number: 'N° 01',
    name: 'Noir Ambre',
    subtitle: 'Resinous Darkness & Warm Skin',
    concentration: 'Extrait de Parfum',
    volumeMl: 100,
    price: 295,
    description:
      'Aged Andalusian labdanum folded into smoked Siam benzoin and dark Indonesian patchouli leaf. A quiet, lingering warmth that settles like late-evening candlelight.',
    editorialQuote: 'An echo of velvet curtains and warm basalt after dusk.',
    imageUrl: noirAmbreImage,
    imageAlt: 'AUREL Noir Ambre sculptural amber glass perfume bottle on dark volcanic stone',
    notes: {
      top: ['Calabrian Bergamot', 'Black Cardamom', 'Saffron Thread'],
      heart: ['Andalusian Labdanum', 'Smoked Benzoin', 'Damask Rose'],
      base: ['Aged Patchouli', 'Madagascar Vanilla Bean', 'Ambergris Accord'],
    },
    amberTint: '#B58A55',
  },
  {
    id: 'cedre-fume',
    number: 'N° 02',
    name: 'Cèdre Fumé',
    subtitle: 'Charred Timber & Sacred Resin',
    concentration: 'Eau de Parfum',
    volumeMl: 100,
    price: 260,
    description:
      'Kiln-charred Atlas cedarwood suspended in golden Somalian myrrh and crushed black Tellicherry pepper. Architectural, dry, and deeply meditative.',
    editorialQuote: 'Cedar embers cooling against honed stone.',
    imageUrl: cedreFumeImage,
    imageAlt: 'AUREL Cedre Fume smoked amber apothecary flacon beside charred cedarwood',
    notes: {
      top: ['Black Tellicherry Pepper', 'Juniper Berry', 'Elemi Resin'],
      heart: ['Charred Atlas Cedar', 'Somalian Myrrh', 'Cade Oil'],
      base: ['Haitian Vetiver', 'Guaiac Wood', 'Dry Oakmoss'],
    },
    amberTint: '#8F6334',
  },
  {
    id: 'iris-obscur',
    number: 'N° 03',
    name: 'Iris Obscur',
    subtitle: 'Florentine Orris & Cognac Amber',
    concentration: 'Extrait de Parfum',
    volumeMl: 50,
    price: 320,
    description:
      'Three-year aged Florentine iris pallida butter layered with fine cognac-cask amber and earthy angelica root. Powdery silk cut with luminous mineral clarity.',
    editorialQuote: 'Heirloom parchment, silvered mist, and golden liqueur.',
    imageUrl: irisObscurImage,
    imageAlt: 'AUREL Iris Obscur faceted amber glass perfume flacon on dark travertine plinth',
    notes: {
      top: ['Angelica Root', 'Bitter Almond', 'White Violet Leaf'],
      heart: ['Florentine Orris Butter', 'Cognac Accord', 'Ambrette Seed'],
      base: ['Mysore Sandalwood', 'White Suede', 'Tonka Absolute'],
    },
    amberTint: '#C89B62',
  },
];

export const HERO_FALLBACK_IMAGE = heroFallbackImage;
export const STORY_ATELIER_IMAGE = storyAtelierImage;
