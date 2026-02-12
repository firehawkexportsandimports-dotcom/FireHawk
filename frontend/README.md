🔥 Firehawk Imports & Exports
Premium South Indian Spice Export Platform

A modern, export-focused digital platform built for Firehawk Imports & Exports, designed to showcase authentic South Indian spices sourced from Kerala and Karnataka for global buyers, distributors, and partners.

The platform combines a premium public-facing website with a custom-built Admin CMS, enabling complete content and product management without relying on heavy CMS frameworks.

📑 Table of Contents

Overview

Project Vision

Tech Stack

Architecture Overview

Project Structure

Design System

Pages & Routes

Admin CMS Features

Data Architecture

Backend Architecture

API Endpoints

Database Schema Overview

CMS Reorder System

Image Handling Flow

Environment Variables

Getting Started

Deployment

Performance Considerations

Future Roadmap

🌿 Overview

Firehawk Imports & Exports is a premium spice export showcase platform created to present high-quality Indian spices to international markets.

The system consists of two major parts:

✅ Public Website

Dynamic homepage powered by CMS

Company story and heritage

Product catalog with categories

Product detail pages

Testimonials

Enquiry system

Contact page

✅ Admin Dashboard (Custom CMS)

Product management

Category management

Homepage content management

About page content management

Testimonials management

Enquiry inbox

Dynamic section reordering

🎯 Project Vision

The Firehawk platform was designed to:

Present spices with a premium export-quality identity

Allow non-technical administrators to manage content easily

Maintain high performance and scalability

Avoid heavy CMS dependencies

Provide flexible and structured content management

Support future integrations and expansion

🛠 Tech Stack
Frontend
Technology	Purpose
React 18	UI framework
TypeScript	Type-safe development
Vite	Fast bundler & dev server
React Router v6	Routing
Tailwind CSS	Styling
shadcn/ui	UI components
Lucide React	Icons
TanStack Query	Data fetching & caching
React Hook Form	Form handling
Zod	Validation
Backend
Technology	Purpose
Node.js	Backend runtime
Express.js	API framework
TypeScript	Type safety
Prisma ORM	Database ORM
PostgreSQL (Aiven)	Managed database
Cloudinary	Image storage
Multer	File upload middleware
JWT	Authentication (planned expansion)
🧱 Architecture Overview
Frontend (React)
        ↓
Service Layer (API abstraction)
        ↓
Express Routes
        ↓
Controllers
        ↓
Service Layer (Business Logic)
        ↓
Prisma ORM
        ↓
PostgreSQL (Aiven)

Core Principles

✅ Frontend never communicates directly with database
✅ Controllers remain thin
✅ Business logic lives in services
✅ Database access only via Prisma
✅ CMS structured for scalability

📁 Project Structure
Frontend
src/
├── components/
│   ├── layout/
│   ├── ui/
│   └── reusable components
│
├── pages/
│   ├── public/
│   └── admin/
│
├── services/
│   └── api.ts
│
├── hooks/
├── lib/
├── types/
└── data/

Backend
backend/src/
├── controllers/
│   ├── product.controller.ts
│   ├── category.controller.ts
│   ├── homepage.controller.ts
│   └── testimonial.controller.ts
│
├── routes/
│   ├── product.routes.ts
│   ├── category.routes.ts
│   ├── homepage.routes.ts
│   └── testimonial.routes.ts
│
├── services/
│   ├── homepage.service.ts
│   └── testimonial.service.ts
│
├── config/
│   └── db.ts
│
├── middleware/
└── server.ts

🎨 Design System
Theme Concept

A fire-inspired premium palette representing:

warmth

authenticity

spice heritage

export quality

Core Colors
Name	Usage
Ember	Primary brand color
Burnt Orange	Accent
Saffron	Premium highlight
Charcoal	Dark backgrounds / admin
Sand / Cream	Background
Typography

Cormorant Garamond — headings

System Sans — body content

🗺 Pages & Routes
Public Routes
Route	Description
/	Homepage
/about	Company story
/products	Product catalog
/products/:slug	Product details
/contact	Contact & enquiry
Admin Routes
Route	Description
/admin	Dashboard
/admin/products	Products CRUD
/admin/categories	Categories CRUD
/admin/messages	Enquiries
/admin/homepage	Homepage CMS
/admin/about	About CMS
⚙ Admin CMS Features
Homepage CMS Sections

Admin can manage:

Hero section

Introduction section

Quality section

Why Choose Us

Category intro section

CTA section

Dynamic CMS Blocks

Features (Why Firehawk)

Journey Steps (Farm → Export)

Origins (Kerala / Karnataka)

Certifications

Each supports:

✅ Create
✅ Update
✅ Delete
✅ Reorder

📊 Data Architecture

Core entities:

User

Category

Product

ProductImage

Enquiry

Testimonial

HomepageContent

HomepageFeature

HomepageJourney

HomepageOrigin

HomepageCertification

AboutContent

ContactInfo

Frontend and backend share aligned TypeScript types.

🧠 Backend Architecture

Pattern followed:

Route → Controller → Service → Prisma → Database


Example:

PATCH /homepage/features/:id/reorder


Flow:

Route
  ↓
Controller
  ↓
homepageService.reorderFeature()
  ↓
Prisma transaction

🔌 API Endpoints
Homepage Content
GET    /api/content/homepage
PUT    /api/content/homepage/:section

Features
POST   /api/content/homepage/features
PUT    /api/content/homepage/features/:id
DELETE /api/content/homepage/features/:id
PATCH  /api/content/homepage/features/:id/reorder

Journey
PATCH /api/content/homepage/journey/:id/reorder

Origins
PATCH /api/content/homepage/origins/:id/reorder

Certifications
PATCH /api/content/homepage/certifications/:id/reorder

🔄 CMS Reorder System

Each CMS entity contains:

sort_order INTEGER


Reordering logic:

Fetch current item

Calculate new position

Find item occupying target position

Swap using transaction

Example:

await prisma.$transaction([
  updateCurrent(),
  updateSwap(),
]);


This guarantees ordering consistency.

🖼 Image Handling

Images are stored in Cloudinary.

Flow:

Admin Upload
   ↓
Multer Middleware
   ↓
Cloudinary Upload
   ↓
Image URL stored in PostgreSQL


Used for:

Products

Homepage sections

Journey steps

Testimonials

🔐 Environment Variables
Backend
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
PORT=3000

Frontend
VITE_API_URL=http://localhost:3000/api

🚀 Getting Started
Install Dependencies
npm install

Run Frontend
npm run dev

Run Backend
npm run dev

🌐 Deployment
Frontend

Vercel

Netlify

Lovable

Backend

VPS

Railway

Render

Database

Aiven PostgreSQL

⚡ Performance Considerations

API abstraction layer reduces coupling

Prisma optimized queries

Parallel fetching using Promise.all

Image CDN via Cloudinary

Lazy loading for images

Cached data via TanStack Query

🧭 Future Roadmap

Planned improvements:

Authentication & role-based access

SEO optimization

Analytics integration

Export enquiry workflow automation

Email notifications

Multi-language support

Product specification downloads

📝 License

Private project — Firehawk Imports & Exports.