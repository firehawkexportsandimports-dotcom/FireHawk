// ============================================
// FIREHAWK IMPORTS & EXPORTS — ENTITY TYPES
// ============================================

/* =====================================================
   COMMON ENUM TYPES (SHARED ACROSS APP)
===================================================== */

export type UserRole = 'admin' | 'editor';

export type EnquiryType = 'product' | 'general';

export type EnquiryStatus = 'unread' | 'read' | 'replied';

/* ---------- HOMEPAGE SECTIONS ---------- */

export type HomepageSection =
  | 'hero'
  | 'intro'
  | 'quality'
  | 'why_choose'
  | 'category_intro'
  | 'cta';

/* ---------- ABOUT SECTIONS ---------- */

export type AboutSection =
  | 'hero'
  | 'story'
  | 'heritage'
  | 'sourcing'
  | 'mission'
  | 'vision'
  | 'export'
  | 'cta';


/* =====================================================
   USERS
===================================================== */

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
  updated_at: string;
}


/* =====================================================
   CATEGORIES
===================================================== */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  product_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}


/* =====================================================
   PRODUCTS
===================================================== */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  category_id?: string;
  category?: Category;
  origin?: string;
  packaging: string[];
  images: ProductImage[];
  is_featured: boolean;
  is_export_ready: boolean;
  price_range?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt?: string;
  is_primary: boolean;
  order: number;
}


/* =====================================================
   ENQUIRIES
===================================================== */

export interface Enquiry {
  id: string;
  type: EnquiryType;
  product_id?: string;
  product?: Product;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}


/* =====================================================
   TESTIMONIALS
===================================================== */

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  country?: string;
  content: string;
  avatar?: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}


/* =====================================================
   HOMEPAGE CONTENT (CMS)
===================================================== */

export type IconType = 
  | 'Leaf' | 'Award' | 'Globe' | 'Shield' | 'Flame' 
  | 'Package' | 'Truck' | 'CheckCircle' | 'MapPin' 
  | 'Star' | 'Users' | 'Clock' | 'Trophy' | 'Heart'
  | 'ShieldCheck' | 'Zap' | 'Coffee' | 'Spices' | 'Factory';
export interface HomepageContent {
  id: string;
  section: HomepageSection;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  image?: string;
  button_text?: string;
  button_link?: string;
  order: number;
  is_active: boolean;
  updated_at: string;
}

export interface Feature {
  id?: string;
  title: string;
  description: string;
  icon: IconType;
  sort_order: number;
}

export interface JourneyStep {
  id?: string;
  title: string;
  description: string;
  icon: IconType;
  image: string;
  sort_order: number;
}

export interface Origin {
  id?: string;
  name: string;
  region: string;
  description: string;
  spices: string[]; // Array of spice names
  sort_order: number;
}

export interface Certification {
  id?: string;
  name: string;
  sort_order: number;
}


export interface HomepageResponse {
  sections: HomepageContent[];
  features: Feature[];
  journey: JourneyStep[];
  origins: Origin[];
  certifications: Certification[];
  testimonials: Testimonial[];
}


/* ---------- ADMIN EDIT FORM ---------- */

export interface HomepageEditForm {
  section: HomepageSection;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  image?: string;
  button_text?: string;
  button_link?: string;
  imageFile?: File;
}


/* =====================================================
   ABOUT CONTENT
===================================================== */

export interface AboutContent {
  id: string;
  section: AboutSection;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  description?: string;
  image?: string;
  countries?: string[];
  order: number;
  updated_at: string;
}


/* =====================================================
   CONTACT INFO
===================================================== */

export interface ContactInfo {
  id: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  working_hours?: string;
  map_embed?: string;
  updated_at: string;
}


/* =====================================================
   DASHBOARD STATS
===================================================== */

export interface DashboardStats {
  total_products: number;
  total_categories: number;
  total_enquiries: number;
  unread_enquiries: number;
  featured_products: number;
  recent_enquiries: Enquiry[];
}


// For form editing with file uploads
export interface JourneyStepForm extends Omit<JourneyStep, 'id'> {
  id?: string;
  imageFile?: File;
}

export interface HomepageEditForm {
  section: HomepageSection;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  imageFile?: File;
  button_text?: string;
  button_link?: string;
}