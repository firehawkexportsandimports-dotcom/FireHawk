// Database Entity Types for Firehawk Imports & Exports

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  category?: Category;
  origin: string;
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
  alt: string;
  is_primary: boolean;
  order: number;
}

export interface Enquiry {
  id: string;
  type: 'product' | 'general';
  product_id?: string;
  product?: Product;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  country: string;
  content: string;
  avatar?: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomepageContent {
  id: string;
  section: 'hero' | 'intro' | 'quality' | 'why_choose' | 'cta';
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  button_text?: string;
  button_link?: string;
  order: number;
  is_active: boolean;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  section: 'story' | 'heritage' | 'sourcing' | 'mission' | 'vision' | 'export';
  title: string;
  content: string;
  image?: string;
  order: number;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  working_hours: string;
  map_embed?: string;
  updated_at: string;
}

// Dashboard Statistics
export interface DashboardStats {
  total_products: number;
  total_categories: number;
  total_enquiries: number;
  unread_enquiries: number;
  featured_products: number;
  recent_enquiries: Enquiry[];
}
