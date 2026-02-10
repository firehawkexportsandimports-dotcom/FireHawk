🔥 Firehawk Imports & Exports

Premium South Indian Spice Export Platform
Built with React, Node.js, PostgreSQL (Aiven), Prisma & Cloudinary

A modern, premium export-ready platform for Firehawk Imports & Exports, designed to showcase authentic South Indian spices sourced from Kerala and Karnataka for international buyers and distributors.

This project includes a public product showcase website and a custom-built admin CMS for managing products, categories, homepage content, and enquiries.

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

Database Schema

Reorder System (CMS Logic)

Image Handling

Getting Started

Deployment

🌿 Overview

Firehawk Imports & Exports is a premium spice export showcase platform designed for international buyers.

The platform consists of:

✅ Public Website

Homepage with dynamic CMS sections

About page with company heritage

Product catalog

Product detail pages

Enquiry system

Contact page

✅ Admin Dashboard

Product management

Category management

Homepage content management

About page content management

Testimonials management

Enquiry inbox

CMS reorder system

🎯 Project Vision

The goal of Firehawk platform is to:

Present spices with a premium export-quality identity

Allow non-technical admins to update content easily

Support scalable backend integration

Maintain performance and SEO-friendly structure

Provide enterprise-level CMS flexibility without heavy frameworks

🛠 Tech Stack
Frontend
Technology	Purpose
React 18	UI framework
TypeScript	Type-safe development
Vite	Fast dev server & bundler
React Router v6	Routing
Tailwind CSS	Styling
shadcn/ui	UI components
Lucide React	Icons
TanStack Query	Data fetching
React Hook Form	Forms
Zod	Validation
Backend
Technology	Purpose
Node.js	Backend runtime
Express.js	API framework
TypeScript	Type safety
Prisma ORM	Database ORM
PostgreSQL (Aiven)	Database
Cloudinary	Image storage
Multer	File upload handling
🧱 Architecture Overview
Frontend (React)
        ↓
Service Layer (API abstraction)
        ↓
Express Controllers
        ↓
Service Layer (Business Logic)
        ↓
Prisma ORM
        ↓
PostgreSQL (Aiven)

Key Principle

✅ Frontend never talks directly to database
✅ Controllers stay thin
✅ Business logic lives in services

📁 Project Structure
Frontend
src/
├── components/
│   ├── layout/
│   ├── ui/
│   └── reusable components
│
├── pages/
│   ├── public pages
│   └── admin pages
│
├── services/
│   └── api.ts
│
├── types/
│   └── index.ts
│
├── hooks/
├── lib/
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
│   └── homepage.service.ts
│
├── config/
│   └── db.ts
│
└── app.ts

🎨 Design System
Theme Concept

Fire-inspired premium palette representing:

warmth

authenticity

spice heritage

export quality

Core Colors
Name	Usage
Ember	Primary brand color
Burnt Orange	Accent
Saffron	Premium highlight
Charcoal	Admin theme
Sand / Cream	Background
Typography

Cormorant Garamond — headings

System Sans — body text

🗺 Pages & Routes
Public Routes
Route	Description
/	Homepage
/about	Company story
/products	Product catalog
/products/:slug	Product details
/contact	Contact form
Admin Routes
Route	Description
/admin	Dashboard
/admin/products	Products CRUD
/admin/categories	Categories CRUD
/admin/messages	Enquiries
/admin/homepage	Homepage CMS
/admin/about	About CMS
⚙ Admin CMS Features
Homepage CMS

Admin can manage:

Hero section

Introduction

Quality section

Why choose us

CTA section

Dynamic Blocks

Features (Why Firehawk)

Journey steps (Farm → Export)

Origins (Kerala / Karnataka)

Certifications

All support:

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

All types shared between frontend and backend.

🧠 Backend Architecture

Backend follows:

Route → Controller → Service → Prisma → Database


Example:

PATCH /homepage/features/:id/reorder

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

🔄 Reorder System (CMS Logic)

Each item has:

sort_order INTEGER


Reorder logic:

Fetch current item

Calculate new order

Find item with target order

Swap using Prisma transaction

Example:

await prisma.$transaction([
  updateCurrent(),
  updateSwap(),
]);


This ensures consistent ordering.

🖼 Image Handling

Images are stored in Cloudinary.

Flow:

Admin Upload
   ↓
Multer Middleware
   ↓
Cloudinary Upload
   ↓
URL stored in PostgreSQL


Used for:

Products

Homepage sections

Journey steps

Testimonials

🚀 Getting Started
Install
npm install

Run Frontend
npm run dev

Run Backend
npm run dev

🌐 Deployment
Frontend

Lovable / Vercel / Netlify

Backend

VPS / Railway / Render

Database

Aiven PostgreSQL

🔐 Environment Variables
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=

🏁 Current Status

✅ Frontend complete
✅ Backend CMS complete
✅ Homepage dynamic content working
✅ Reorder system implemented
✅ Image uploads working
✅ Admin CMS operational

Next planned:

Authentication & roles

SEO optimization

Analytics integration

Export enquiry workflow

📝 License

Private project — Firehawk Imports & Exports.