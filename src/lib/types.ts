export interface PricingPackage {
  id: string;
  key: string;
  name: string;
  subtitle: string;
  basePrice: number;
  pageLimit: number;
  description: string;
  highlights: string[];
  isPopular?: boolean;
  sortOrder: number;
}

export interface PricingAddon {
  id: string;
  key: string;
  name: string;
  category: "core" | "3d_media" | "booking" | "marketing";
  price: number;
  priceType: "ONE_TIME" | "RECURRING_MONTHLY";
  description: string;
  sortOrder: number;
}

export interface HotelService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  startingPrice?: number;
  iconName: string;
  deliverables: string[];
  estimatedDays: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  propertyType: string;
  location: string;
  summary: string;
  designObjectives: string;
  features: string[];
  liveUrl?: string | null;
  demoUrl?: string | null;
  demoType?: "heritage" | "mountain" | "boutique" | null;
  isConcept: boolean;
  isFeatured: boolean;
  heroImage: string;
  galleryImages: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CalculatorState {
  hotelType: string;
  selectedPackageKey: string;
  additionalPages: number;
  additionalRoomCategories: number;
  selectedAddonKeys: string[];
  wantsAdminCms: boolean;
  wantsMonthlyMaintenance: boolean;
}

export interface CalculationResult {
  packageName: string;
  packageBasePrice: number;
  additionalPagesCost: number;
  additionalRoomsCost: number;
  selectedAddonsCost: number;
  oneTimeTotal: number;
  monthlyMaintenanceCost: number;
  estimatedDeliveryDays: { min: number; max: number };
  breakdown: Array<{ name: string; cost: number; type: "base" | "addon" | "recurring" }>;
}
