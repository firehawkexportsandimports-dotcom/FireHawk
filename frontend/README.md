# 🔥 Firehawk Imports & Exports

> Premium South Indian Spice Export Platform

A modern, premium product showcase website for Firehawk Imports and Exports — an authentic South Indian spice company sourcing spices from Kerala and Karnataka for European and international markets.

**Preview URL**: [View Live Preview](https://id-preview--574a4596-ee4d-452e-832c-3e7095ca1f0f.lovable.app)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Data Architecture](#-data-architecture)
- [API Service Layer](#-api-service-layer)
- [Getting Started](#-getting-started)
- [Backend Integration Guide](#-backend-integration-guide)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)

---

## 🌿 Overview

Firehawk Imports & Exports is a premium spice export showcase featuring:

- **Public Website**: Homepage, About, Products catalog, Product details, Contact
- **Admin Dashboard**: Products, Categories, Messages, Homepage & About content management
- **Fire-Inspired Design**: Premium ember/saffron color palette with elegant animations
- **Export-Ready Architecture**: Service layer abstraction for easy backend integration

### Brand Identity

| Attribute | Description |
|-----------|-------------|
| **Tone** | Premium, warm, authentic, export-quality |
| **Target Market** | European buyers, international distributors |
| **Heritage** | Kerala & Karnataka spice traditions |

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with functional components |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **TanStack Query** | Data fetching & caching |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Lucide React** | Icon library |
| **Zod** | Schema validation |
| **React Hook Form** | Form management |

---

## 📁 Project Structure

```
firehawk-spices/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PublicLayout.tsx    # Public website wrapper
│   │   │   └── AdminLayout.tsx     # Admin dashboard wrapper
│   │   │
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (50+ components)
│   │   │
│   │   ├── CategoryCard.tsx        # Category display card
│   │   ├── ProductCard.tsx         # Product display card
│   │   ├── TestimonialCard.tsx     # Customer testimonial
│   │   ├── SectionHeader.tsx       # Reusable section header
│   │   └── NavLink.tsx             # Navigation link component
│   │
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── AboutPage.tsx           # Company story
│   │   ├── ProductsPage.tsx        # Product catalog
│   │   ├── ProductDetailPage.tsx   # Single product view
│   │   ├── ContactPage.tsx         # Contact form
│   │   ├── NotFound.tsx            # 404 page
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.tsx  # Stats overview
│   │       ├── AdminProducts.tsx   # Product management
│   │       ├── AdminCategories.tsx # Category management
│   │       ├── AdminMessages.tsx   # Enquiry inbox
│   │       ├── AdminHomepage.tsx   # Homepage content
│   │       └── AdminAbout.tsx      # About page content
│   │
│   ├── data/
│   │   └── mockData.ts             # Mock database entities
│   │
│   ├── services/
│   │   └── api.ts                  # API abstraction layer
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   │
│   ├── hooks/
│   │   ├── use-toast.ts            # Toast notifications
│   │   └── use-mobile.tsx          # Mobile detection
│   │
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn)
│   │
│   ├── App.tsx                     # Root component & routes
│   ├── App.css                     # Global styles
│   ├── index.css                   # Tailwind & design tokens
│   └── main.tsx                    # Entry point
│
├── tailwind.config.ts              # Tailwind configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── components.json                 # shadcn/ui config
└── package.json                    # Dependencies
```

---

## 🎨 Design System

### Color Palette

The fire-inspired, premium color palette is defined in `tailwind.config.ts` and `src/index.css`:

#### Primary Colors (Fire Theme)

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `ember` | #8B1E1E | 0 65% 33% | Primary brand, CTAs, headers |
| `burnt-orange` | #C4511C | 20 76% 44% | Accent, highlights |
| `saffron` | #D9A441 | 40 66% 55% | Gold accents, premium feel |

#### Supporting Colors

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `charcoal` | #1C1C1C | 0 0% 11% | Dark backgrounds, admin |
| `charcoal-light` | #2A2A2A | 0 0% 16% | Elevated dark surfaces |
| `dark-brown` | #3B2A1F | 24 33% 18% | Footer, sections |
| `sand` | #F5EFE6 | 36 44% 93% | Main background |
| `cream` | #FAF6F0 | 33 45% 96% | Cards, elevated surfaces |

#### Spice Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `turmeric` | #E8B923 | Turmeric-related content |
| `cardamom` | #4A7C59 | Nature, organic sections |
| `cinnamon` | #8B4513 | Warm earthy accents |
| `pepper` | #2C2C2C | Dark text alternatives |

### CSS Variables

```css
/* Located in src/index.css */
:root {
  --background: 36 44% 93%;        /* Sand */
  --foreground: 0 0% 11%;          /* Charcoal */
  --primary: 0 65% 33%;            /* Ember */
  --secondary: 33 45% 96%;         /* Cream */
  --accent: 40 66% 55%;            /* Saffron */
  --muted: 36 20% 85%;
  --card: 33 45% 96%;
  --ember: 0 65% 33%;
  --burnt-orange: 20 76% 44%;
  --saffron: 40 66% 55%;
}
```

### Gradients

```css
--gradient-hero: linear-gradient(135deg, ember → burnt-orange → saffron)
--gradient-fire-glow: radial-gradient(ember/30% center → transparent)
--gradient-warm-overlay: linear-gradient(180deg, charcoal/80% → charcoal/40%)
```

### Typography

| Font | Usage |
|------|-------|
| **Cormorant Garamond** | Display headings, brand text |
| **System Sans** | Body text, UI elements |

```css
font-display: 'Cormorant Garamond', serif;
```

### Animations

```css
/* Fire glow pulse effect */
@keyframes fire-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

/* Ember float effect */
@keyframes ember-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

---

## 🗺 Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Landing with hero, featured products, testimonials |
| `/about` | `AboutPage` | Company story, heritage, mission |
| `/products` | `ProductsPage` | Product catalog with category filter |
| `/products/:slug` | `ProductDetailPage` | Single product with images, enquiry form |
| `/contact` | `ContactPage` | Contact form and company info |
| `*` | `NotFound` | 404 error page |

### Admin Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin` | `AdminDashboard` | Statistics, recent enquiries |
| `/admin/products` | `AdminProducts` | CRUD for products |
| `/admin/categories` | `AdminCategories` | CRUD for categories |
| `/admin/messages` | `AdminMessages` | Unified enquiry inbox |
| `/admin/homepage` | `AdminHomepage` | Edit homepage sections |
| `/admin/about` | `AdminAbout` | Edit about page sections |

---

## 🧩 Components

### Layout Components

#### `PublicLayout.tsx`
Wrapper for all public pages with:
- Responsive navigation header with fire-gradient styling
- Mobile hamburger menu with slide-out drawer
- Premium footer with company info & links
- Smooth scroll behavior

#### `AdminLayout.tsx`
Admin dashboard wrapper with:
- Fixed sidebar navigation (charcoal theme)
- Collapsible content menu
- Top bar with user info
- Active route highlighting

### UI Components

#### `ProductCard.tsx`
```tsx
interface ProductCardProps {
  product: Product;
}
```
- Hover zoom effect on image
- Category badge
- Export-ready indicator
- Fire-glow shadow on hover

#### `CategoryCard.tsx`
```tsx
interface CategoryCardProps {
  category: Category;
}
```
- Full-bleed image with gradient overlay
- Product count badge
- Hover scale animation

#### `TestimonialCard.tsx`
```tsx
interface TestimonialCardProps {
  testimonial: Testimonial;
}
```
- Star rating display
- Company and country info
- Avatar with gradient border

#### `SectionHeader.tsx`
```tsx
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}
```
- Fire gradient underline decoration
- Light/dark theme variants

---

## 📊 Data Architecture

### Type Definitions

All TypeScript interfaces are in `src/types/index.ts`:

```typescript
// Core Entities
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

interface Product {
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

interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  is_primary: boolean;
  order: number;
}

interface Enquiry {
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

interface Testimonial {
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

interface HomepageContent {
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

interface AboutContent {
  id: string;
  section: 'story' | 'heritage' | 'sourcing' | 'mission' | 'vision' | 'export';
  title: string;
  content: string;
  image?: string;
  order: number;
  updated_at: string;
}

interface ContactInfo {
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

interface DashboardStats {
  total_products: number;
  total_categories: number;
  total_enquiries: number;
  unread_enquiries: number;
  featured_products: number;
  recent_enquiries: Enquiry[];
}
```

### Mock Data

Located in `src/data/mockData.ts`:

| Entity | Count | Description |
|--------|-------|-------------|
| `categories` | 4 | Whole Spices, Ground, Blends, Premium Exports |
| `products` | 8 | Black Pepper, Cardamom, Cinnamon, Turmeric, etc. |
| `testimonials` | 4 | German, French, UK, Swedish buyers |
| `homepageContent` | 4 | Hero, Intro, Quality, CTA sections |
| `aboutContent` | 6 | Story, Heritage, Sourcing, Mission, Vision, Export |
| `enquiries` | 3 | Sample product & general enquiries |
| `users` | 2 | Admin and editor accounts |

### Helper Functions

```typescript
// Get product with category populated
getProductWithCategory(productId: string): Product | undefined

// Get products filtered by category slug
getProductsByCategory(categorySlug: string): Product[]

// Get featured products only
getFeaturedProducts(): Product[]

// Get featured testimonials only
getFeaturedTestimonials(): Testimonial[]

// Get dashboard statistics
getDashboardStats(): DashboardStats
```

---

## 🔌 API Service Layer

Located in `src/services/api.ts`, provides a clean abstraction over data fetching:

### Categories API

```typescript
categoriesApi.getAll(): Promise<Category[]>
categoriesApi.getBySlug(slug: string): Promise<Category | undefined>
categoriesApi.getById(id: string): Promise<Category | undefined>
```

### Products API

```typescript
productsApi.getAll(): Promise<Product[]>
productsApi.getBySlug(slug: string): Promise<Product | undefined>
productsApi.getById(id: string): Promise<Product | undefined>
productsApi.getByCategory(categorySlug: string): Promise<Product[]>
productsApi.getFeatured(): Promise<Product[]>
```

### Testimonials API

```typescript
testimonialsApi.getAll(): Promise<Testimonial[]>
testimonialsApi.getFeatured(): Promise<Testimonial[]>
```

### Content API

```typescript
contentApi.getHomepage(): Promise<HomepageContent[]>
contentApi.getAbout(): Promise<AboutContent[]>
contentApi.getContact(): Promise<ContactInfo>
```

### Enquiries API

```typescript
enquiriesApi.getAll(): Promise<Enquiry[]>
enquiriesApi.create(data: EnquiryInput): Promise<Enquiry>
enquiriesApi.updateStatus(id: string, status: EnquiryStatus): Promise<void>
```

### Dashboard API

```typescript
dashboardApi.getStats(): Promise<DashboardStats>
```

### Switching to Real Backend

To connect to a real backend, update each API method:

```typescript
// Before (mock)
getAll: async (): Promise<Category[]> => {
  await delay(100);
  return categories;
}

// After (real API)
getAll: async (): Promise<Category[]> => {
  const response = await fetch('/api/categories');
  return response.json();
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd firehawk-spices

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
bun run preview
```

---

## 🔧 Backend Integration Guide

This frontend is designed for easy backend integration. Here's the recommended architecture:

### Node.js Backend Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── categoriesController.ts
│   │   ├── productsController.ts
│   │   ├── enquiriesController.ts
│   │   ├── contentController.ts
│   │   └── authController.ts
│   │
│   ├── routes/
│   │   ├── categories.ts
│   │   ├── products.ts
│   │   ├── enquiries.ts
│   │   ├── content.ts
│   │   └── auth.ts
│   │
│   ├── services/
│   │   ├── categoriesService.ts
│   │   ├── productsService.ts
│   │   └── cloudinaryService.ts
│   │
│   ├── models/
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   ├── Enquiry.ts
│   │   └── User.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── errorHandler.ts
│   │
│   ├── config/
│   │   ├── database.ts
│   │   └── cloudinary.ts
│   │
│   └── app.ts
│
├── package.json
└── tsconfig.json
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:slug` | Get category by slug |
| POST | `/api/categories` | Create category (admin) |
| PUT | `/api/categories/:id` | Update category (admin) |
| DELETE | `/api/categories/:id` | Delete category (admin) |
| GET | `/api/products` | List all products |
| GET | `/api/products/:slug` | Get product by slug |
| GET | `/api/products/category/:slug` | Products by category |
| GET | `/api/products/featured` | Featured products |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/enquiries` | List enquiries (admin) |
| POST | `/api/enquiries` | Submit enquiry (public) |
| PATCH | `/api/enquiries/:id/status` | Update status (admin) |
| GET | `/api/content/homepage` | Homepage content |
| PUT | `/api/content/homepage/:id` | Update section (admin) |
| GET | `/api/content/about` | About page content |
| GET | `/api/content/contact` | Contact info |
| GET | `/api/testimonials` | All testimonials |
| GET | `/api/testimonials/featured` | Featured only |
| GET | `/api/dashboard/stats` | Dashboard stats (admin) |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |

---

## 🗄 Database Schema

Designed for PostgreSQL (Aiven recommended):

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  origin VARCHAR(255),
  packaging TEXT[], -- PostgreSQL array
  is_featured BOOLEAN DEFAULT FALSE,
  is_export_ready BOOLEAN DEFAULT TRUE,
  price_range VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
```

### Product Images Table

```sql
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt VARCHAR(255),
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);
```

### Enquiries Table

```sql
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('product', 'general')),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);
```

### Testimonials Table

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  country VARCHAR(100),
  content TEXT NOT NULL,
  avatar VARCHAR(500),
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Homepage Content Table

```sql
CREATE TABLE homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  content TEXT,
  image VARCHAR(500),
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### About Content Table

```sql
CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255),
  content TEXT,
  image VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Contact Info Table

```sql
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT,
  city VARCHAR(255),
  country VARCHAR(100),
  phone VARCHAR(50),
  email VARCHAR(255),
  working_hours VARCHAR(255),
  map_embed TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🌐 Deployment

### Lovable Deployment

1. Open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)
2. Click **Share → Publish**
3. Your app will be live instantly

### Custom Domain

1. Go to **Project → Settings → Domains**
2. Click **Connect Domain**
3. Follow DNS configuration instructions

### Environment Variables (for Backend)

```env
# Database
DATABASE_URL=postgresql://user:pass@host:port/dbname

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# App
NODE_ENV=production
PORT=3000
```

---

## 📝 License

This project is private and proprietary to Firehawk Imports & Exports.

---

## 🤝 Support

For questions about this codebase:
- **Technical Issues**: Open an issue in the repository
- **Business Inquiries**: exports@firehawkspices.com

---

