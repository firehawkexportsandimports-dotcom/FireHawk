import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// ─── Eager load only the first page users see ───────────────────────────────
import HomePage from "./pages/HomePage";

// ─── Lazy load all other public pages ────────────────────────────────────────
const AboutPage          = lazy(() => import("./pages/AboutPage"));
const ProductsPage       = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage  = lazy(() => import("./pages/ProductDetailPage"));
const ContactPage        = lazy(() => import("./pages/ContactPage"));
const NotFound           = lazy(() => import("./pages/NotFound"));
const LoginPage          = lazy(() => import("./pages/LoginPage"));

// ─── Lazy load ALL admin pages (never needed by public users) ────────────────
const AdminDashboard        = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts         = lazy(() => import("./pages/admin/AdminProducts"));
const AdminCategories       = lazy(() => import("./pages/admin/AdminCategories"));
const AdminMessages         = lazy(() => import("./pages/admin/AdminMessages"));
const AdminHomepage         = lazy(() => import("./pages/admin/AdminHomepage"));
const AdminAbout            = lazy(() => import("./pages/admin/AdminAbout"));
const AdminProductsContent  = lazy(() => import("./pages/admin/AdminProductsContent"));
const AdminContactContent   = lazy(() => import("./pages/admin/AdminContactContent"));
const AdminUsers            = lazy(() => import("./pages/admin/AdminUsers"));

import { ProtectedRoute } from "@/components/ProtectedRoute";

// ─── Minimal fallback — avoids layout shift, shows nothing while chunks load ─
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-ember border-t-transparent rounded-full animate-spin" />
  </div>
);

// ─── QueryClient: aggressive caching to survive Aiven cold-start penalty ─────
//  • staleTime 5 min  → data is reused without a new network call for 5 min
//  • gcTime 30 min    → cached data stays in memory for 30 min after unmount
//  • retry 1          → don't hammer a cold DB with 3 retries (default)
//  • retryDelay 2000  → give the DB 2 s to wake up before the single retry
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:  5  * 60 * 1000,   // 5 minutes
      gcTime:     30 * 60 * 1000,   // 30 minutes
      retry: 1,
      retryDelay: 2000,
      refetchOnWindowFocus: false,  // stop re-fetching every time tab regains focus
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/"               element={<HomePage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/products"       element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/login"          element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin"                   element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products"          element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/categories"        element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/messages"          element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
            <Route path="/admin/homepage"          element={<ProtectedRoute><AdminHomepage /></ProtectedRoute>} />
            <Route path="/admin/about"             element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
            <Route path="/admin/products-content"  element={<ProtectedRoute><AdminProductsContent /></ProtectedRoute>} />
            <Route path="/admin/contact-content"   element={<ProtectedRoute><AdminContactContent /></ProtectedRoute>} />
            <Route path="/admin/users"             element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;