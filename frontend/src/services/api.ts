// ============================================
// FIREHAWK API SERVICE LAYER
// ============================================

import type {
  Category,
  Product,
  Testimonial,
  HomepageContent,
  HomepageResponse,
  AboutContent,
  ContactInfo,
  Enquiry,
  DashboardStats,
  Feature,
  JourneyStep,
  Origin,
  Certification,
  HomepageStat, 
} from "@/types";
import type { User } from "@/types";

/* =====================================================
   API BASE
===================================================== */

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/* =====================================================
   JSON HELPER
===================================================== */

async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {

  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  return res.json();
}

/* =====================================================
   FORM DATA HELPER (UPLOADS)
===================================================== */

async function fetchForm<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Upload request failed");
  }

  return res.json();
}

/* =====================================================
   CATEGORIES API
===================================================== */

export const categoriesApi = {
  getAll: () =>
    fetchJson<Category[]>(`${API_BASE}/categories`),

  getFeatured: () =>
    fetchJson<Category[]>(`${API_BASE}/categories/featured`),

  getBySlug: (slug: string) =>
    fetchJson<Category>(`${API_BASE}/categories/${slug}`),

  getById: (id: string) =>
    fetchJson<Category>(`${API_BASE}/categories/id/${id}`),

  create: (formData: FormData) =>
    fetchForm<Category>(`${API_BASE}/categories`, {
      method: "POST",
      body: formData,
    }),

  // ✅ FIXED (THIS WAS BREAKING YOUR APP)
  update: (id: string, formData: FormData) =>
    fetchForm<Category>(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      body: formData,
    }),

  delete: (id: string) =>
    fetchJson(`${API_BASE}/categories/${id}`, {
      method: "DELETE",
    }),
};

/* =====================================================
   PRODUCTS API
===================================================== */

/* =====================================================
   PRODUCTS API
===================================================== */

export const productsApi = {
  getAll: () =>
    fetchJson<Product[]>(`${API_BASE}/products`),

  getBySlug: (slug: string) =>
    fetchJson<Product>(`${API_BASE}/products/${slug}`),

  getById: (id: string) =>
    fetchJson<Product>(`${API_BASE}/products/id/${id}`),

  getByCategory: (slug: string) =>
    fetchJson<Product[]>(
      `${API_BASE}/products/category/${slug}`
    ),

  getFeatured: () =>
    fetchJson<Product[]>(`${API_BASE}/products/featured`),

  create: (formData: FormData) =>
    fetchForm<Product>(`${API_BASE}/products`, {
      method: "POST",
      body: formData,
    }),

  update: (id: string, formData: FormData) =>
    fetchForm<Product>(`${API_BASE}/products/${id}`, {
      method: "PUT",
      body: formData,
    }),

  delete: (id: string) =>
    fetchJson(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    }),
};


/* =====================================================
   HOMEPAGE CONTENT (CMS)
===================================================== */

export const homepageApi = {
  /* ---------- GET FULL HOMEPAGE CMS DATA ---------- */
  getAll: (): Promise<HomepageResponse> =>
    fetchJson(`${API_BASE}/content/homepage`),

  /* ---------- UPDATE SECTION ---------- */
  updateSection: (
    section: string,
    formData: FormData
  ) =>
    fetchForm<HomepageContent>(
      `${API_BASE}/content/homepage/${section}`,
      {
        method: "PUT",
        body: formData,
      }
    ),

  /* ---------- HERO STATS ---------- */
  getStats: (page: string) =>
    fetchJson<HomepageStat[]>(
      `${API_BASE}/content/homepage/stats?page=${page}`
    ),


  createStat: (data: any) =>
    fetchJson(`${API_BASE}/content/homepage/stats`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateStat: (id: string, data: any) =>
    fetchJson(
      `${API_BASE}/content/homepage/stats/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),

  deleteStat: (id: string) =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/stats/${id}`,
      { method: "DELETE" }
    ),

  reorderStat: (id: string, direction: "up" | "down") =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/stats/${id}/reorder`,
      {
        method: "PATCH",
        body: JSON.stringify({ direction }),
      }
    ),


  /* ---------- FEATURES ---------- */
  createFeature: (data: Partial<Feature>) =>
    fetchJson<Feature>(`${API_BASE}/content/homepage/features`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateFeature: (id: string, data: Partial<Feature>) =>
    fetchJson<Feature>(
      `${API_BASE}/content/homepage/features/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),

  deleteFeature: (id: string) =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/features/${id}`,
      { method: "DELETE" }
    ),

  reorderFeature: (id: string, direction: 'up' | 'down') =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/features/${id}/reorder`,
      {
        method: "PATCH",
        body: JSON.stringify({ direction }),
      }
    ),

  /* ---------- JOURNEY ---------- */
  createJourney: (formData: FormData) =>
    fetchForm<JourneyStep>(
      `${API_BASE}/content/homepage/journey`,
      {
        method: "POST",
        body: formData,
      }
    ),

  updateJourney: (id: string, formData: FormData) =>
    fetchForm<JourneyStep>(
      `${API_BASE}/content/homepage/journey/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    ),

  deleteJourney: (id: string) =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/journey/${id}`,
      { method: "DELETE" }
    ),

  reorderJourney: (id: string, direction: 'up' | 'down') =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/journey/${id}/reorder`,
      {
        method: "PATCH",
        body: JSON.stringify({ direction }),
      }
    ),

  /* ---------- ORIGINS ---------- */
  createOrigin: (data: Partial<Origin>) =>
    fetchJson<Origin>(`${API_BASE}/content/homepage/origins`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateOrigin: (id: string, data: Partial<Origin>) =>
    fetchJson<Origin>(
      `${API_BASE}/content/homepage/origins/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),

  deleteOrigin: (id: string) =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/origins/${id}`,
      { method: "DELETE" }
    ),

  reorderOrigin: (id: string, direction: 'up' | 'down') =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/origins/${id}/reorder`,
      {
        method: "PATCH",
        body: JSON.stringify({ direction }),
      }
    ),

  /* ---------- CERTIFICATIONS ---------- */
  createCertification: (data: Partial<Certification>) =>
    fetchJson<Certification>(
      `${API_BASE}/content/homepage/certifications`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),

  updateCertification: (id: string, data: Partial<Certification>) =>
    fetchJson<Certification>(
      `${API_BASE}/content/homepage/certifications/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),

  deleteCertification: (id: string) =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/certifications/${id}`,
      { method: "DELETE" }
    ),

  reorderCertification: (id: string, direction: 'up' | 'down') =>
    fetchJson<void>(
      `${API_BASE}/content/homepage/certifications/${id}/reorder`,
      {
        method: "PATCH",
        body: JSON.stringify({ direction }),
      }
    ),
};

  /* ---------- TESTIMONIALS ---------- */

export const testimonialsApi = {
  getAll: () =>
    fetchJson<Testimonial[]>(`${API_BASE}/testimonials`),

  getFeatured: () =>
    fetchJson<Testimonial[]>(
      `${API_BASE}/testimonials/featured`
    ),

  create: (data: Partial<Testimonial>) =>
    fetchJson<Testimonial>(`${API_BASE}/testimonials`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Testimonial>) =>
    fetchJson<Testimonial>(`${API_BASE}/testimonials/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchJson<void>(`${API_BASE}/testimonials/${id}`, {
      method: "DELETE",
    }),
};




/* =====================================================
   CONTENT API (ABOUT / CONTACT)
===================================================== */

export const contentApi = {
  /* ---------- HOMEPAGE ---------- */
  getHomepage: () => homepageApi.getAll(),

  /* ---------- ABOUT ---------- */
  getAbout: () =>
    fetchJson<AboutContent[]>(`${API_BASE}/content/about`),

  updateAboutSection: (
    section: string,
    formData: FormData
  ) =>
    fetchForm<AboutContent>(
      `${API_BASE}/content/about/${section}`,
      {
        method: "PUT",
        body: formData,
      }
    ),



  /* ---------- CONTACT ---------- */
  getContact: () =>
    fetchJson<ContactInfo>(`${API_BASE}/content/contact`),

  updateContact: (formData: FormData) =>
    fetchForm<ContactInfo>(
      `${API_BASE}/content/contact`,
      {
        method: "PUT",
        body: formData,
      }
    ),
};




/* =====================================================
   PRODUCTS CONTENT API
===================================================== */

export const productsContentApi = {
  getAll: () =>
    fetchJson<any[]>(`${API_BASE}/products-content`),

  updateSection: (section: string, formData: FormData) =>
    fetchForm<any>(
      `${API_BASE}/products-content/${section}`,
      {
        method: "PUT",
        body: formData,
      }
    ),
};

/* =====================================================
   ENQUIRIES
===================================================== */

export const enquiriesApi = {
  getAll: () =>
    fetchJson<Enquiry[]>(`${API_BASE}/enquiries`),

  create: (data: any) =>
    fetchJson<Enquiry>(`${API_BASE}/enquiries`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  markAsRead: (id: string) =>
    fetchJson<Enquiry>(`${API_BASE}/enquiries/${id}/read`, {
      method: "PATCH",
    }),

  delete: (id: string) =>
    fetchJson(`${API_BASE}/enquiries/${id}`, {
      method: "DELETE",
    }),
};


/* =====================================================
   DASHBOARD
===================================================== */

export const dashboardApi = {
  getStats: () =>
    fetchJson<DashboardStats>(
      `${API_BASE}/dashboard`
    ),
};


/* =====================================================
   USERS API (ADMIN)
===================================================== */

export const usersApi = {
  getAll: () =>
    fetchJson<User[]>(`${API_BASE}/users`),

  approve: (id: string) =>
    fetchJson(`${API_BASE}/users/${id}/approve`, {
      method: "PATCH",
    }),

  updateRole: (id: string, role: string) =>
    fetchJson(`${API_BASE}/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  delete: (id: string) =>
    fetchJson(`${API_BASE}/users/${id}`, {
      method: "DELETE",
    }),

};

