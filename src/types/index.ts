/**
 * Data Model Types for ZawqList
 * Category-driven, stable ID foreign keys, Arabic-first personal product library
 */

export type CategoryStatus = 'active' | 'planned' | 'archived';
export type VerificationStatus = 'verified' | 'pending' | 'unverified';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type OfferAvailability = 'in_stock' | 'low_stock' | 'out_of_stock';
export type LibraryVisibility = 'public' | 'private';

export interface Category {
  category_id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  parent_category_id?: string | null;
  status: CategoryStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  icon_name?: string;
  description_ar?: string;
}

export interface Company {
  company_id: string;
  name_ar: string;
  name_en: string;
  website: string;
  country: string;
  verification_status: VerificationStatus;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  brand_id: string;
  company_id: string;
  name_ar: string;
  name_en: string;
  logo_url?: string;
  website: string;
  verification_status: VerificationStatus;
  source_url: string;
  status: 'active' | 'archived';
}

export interface ProductVariant {
  variant_id: string;
  product_id: string;
  variant_name: string;
  size_value: number;
  size_unit: string;
  barcode?: string;
  image_url?: string;
  status: 'active' | 'archived';
}

export interface ProductAttributes {
  // Category: Sunscreens
  spf?: string;
  pa_rating?: string;
  formulation?: string;
  skin_type?: string;
  water_resistance?: string;
  finish?: string;
  // Category: Fragrances
  concentration?: string;
  volume?: string;
  fragrance_family?: string;
  scent_notes?: {
    top?: string;
    heart?: string;
    base?: string;
  };
  gender_positioning?: string;
  // Future categories (Makeup, Skincare, Haircare)
  coverage?: string;
  active_ingredients?: string;
  hair_type?: string;
  [key: string]: any;
}

export interface Product {
  product_id: string;
  primary_category_id: string;
  brand_id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description: string;
  variant_name: string;
  image_url: string;
  barcode?: string;
  official_product_url: string;
  status: ProductStatus;
  verification_status: VerificationStatus;
  source_url: string;
  last_verified_at: string;
  created_at: string;
  updated_at: string;
  attributes: ProductAttributes;
}

export interface Retailer {
  retailer_id: string;
  name_ar: string;
  name_en: string;
  website: string;
  country: string;
  logo_url: string;
  status: 'active' | 'inactive';
  data_source_method: string;
  last_checked_at: string;
}

export interface PriceOffer {
  offer_id: string;
  product_id: string;
  variant_id?: string;
  retailer_id: string;
  seller_name?: string;
  price_amount: number;
  currency: 'EGP';
  product_url: string;
  availability: OfferAvailability;
  captured_at: string;
  valid_until?: string;
  source_type: 'manual_admin_entry' | 'authorized_feed';
  verification_status: VerificationStatus;
}

export interface UserLibrary {
  library_id: string;
  owner_uid: string;
  owner_name: string;
  title: string;
  description: string;
  slug: string;
  visibility: LibraryVisibility;
  cover_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryItem {
  item_id: string;
  library_id: string;
  product_id: string;
  shelf_id: string; // default shelf key or custom shelf id
  personal_note?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CustomShelf {
  shelf_id: string;
  library_id: string;
  name: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type DefaultShelfKey = 'favorites' | 'recommended' | 'not_recommended' | 'want_to_try';

export interface DefaultShelfInfo {
  key: DefaultShelfKey;
  name_ar: string;
  name_en: string;
  description_ar: string;
  color: string;
  badge_color: string;
  icon_name: string;
}

export type AnalyticsEventType =
  | 'product_view'
  | 'product_added_to_library'
  | 'shelf_placement_changed'
  | 'library_shared'
  | 'search_submitted'
  | 'price_offer_viewed';

export interface AnalyticsEvent {
  event_id: string;
  timestamp: string;
  event_type: AnalyticsEventType;
  user_id: string;
  product_id?: string;
  library_id?: string;
  shelf_id?: string;
  retailer_id?: string;
  search_query?: string;
  result_count?: number;
}

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  bio?: string;
  avatar_url?: string;
}
