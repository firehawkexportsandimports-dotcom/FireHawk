// ============================================
// API SERVICE LAYER (REAL BACKEND VERSION)
// ============================================

import type {
  Category,
  Product,
  Testimonial,
  HomepageContent,
  AboutContent,
  ContactInfo,
  Enquiry,
  DashboardStats,
} from "@/types";

/* =====================================================
   API BASE URL
===================================================== */

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/* =====================================================
   JSON HELPER (FOR NORMAL REQUESTS)
===================================================== */

async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
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
  /* ---------- READ ---------- */

  getAll: async (): Promise<Category[]> => {
    return fetchJson(`${API_BASE}/categories`);
  },

  getFeatured: async (): Promise<Category[]> => {
    return fetchJson(`${API_BASE}/categories/featured`);
  },

  getBySlug: async (slug: string): Promise<Category> => {
    return fetchJson(`${API_BASE}/categories/${slug}`);
  },

  getById: async (id: string): Promise<Category> => {
    return fetchJson(`${API_BASE}/categories/id/${id}`);
  },

  /* ---------- CREATE ---------- */

  create: async (formData: FormData): Promise<Category> => {
    return fetchForm(`${API_BASE}/categories`, {
      method: "POST",
      body: formData,
    });
  },

  /* ---------- UPDATE ---------- */

  update: async (section: string, formData: FormData) => {
    return fetchForm(
      `${API_BASE}/content/homepage/${section}`,
      {
        method: "PUT",
        body: formData,
      }
    );
  },
  
  /* ---------- DELETE ---------- */

  delete: async (id: string): Promise<void> => {
    await fetchJson(`${API_BASE}/categories/${id}`, {
      method: "DELETE",
    });
  },
};

/* =====================================================
   PRODUCTS API
===================================================== */

export const productsApi = {
  /* ---------- READ ---------- */

  getAll: async (): Promise<Product[]> => {
    return fetchJson(`${API_BASE}/products`);
  },

  getBySlug: async (slug: string): Promise<Product> => {
    return fetchJson(`${API_BASE}/products/${slug}`);
  },

  getById: async (id: string): Promise<Product> => {
    return fetchJson(`${API_BASE}/products/id/${id}`);
  },

  getByCategory: async (slug: string): Promise<Product[]> => {
    return fetchJson(`${API_BASE}/products/category/${slug}`);
  },

  getFeatured: async (): Promise<Product[]> => {
    return fetchJson(`${API_BASE}/products/featured`);
  },

  /* ---------- CREATE ---------- */

  create: async (formData: FormData): Promise<Product> => {
    return fetchForm(`${API_BASE}/products`, {
      method: "POST",
      body: formData,
    });
  },

  /* ---------- UPDATE ---------- */

  update: async (
    id: string,
    formData: FormData
  ): Promise<Product> => {
    return fetchForm(`${API_BASE}/products/${id}`, {
      method: "PUT",
      body: formData,
    });
  },

  /* ---------- DELETE ---------- */

  delete: async (id: string): Promise<void> => {
    await fetchJson(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });
  },
};

/* =====================================================
   TESTIMONIALS API
===================================================== */

export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    return fetchJson(`${API_BASE}/testimonials`);
  },

  getFeatured: async (): Promise<Testimonial[]> => {
    return fetchJson(`${API_BASE}/testimonials/featured`);
  },
};

/* =====================================================
   CONTENT API
===================================================== */

export const contentApi = {
  getHomepage: async (): Promise<HomepageContent[]> => {
    return fetchJson(`${API_BASE}/content/homepage`);
  },

  getAbout: async (): Promise<AboutContent[]> => {
    return fetchJson(`${API_BASE}/content/about`);
  },

  getContact: async (): Promise<ContactInfo> => {
    return fetchJson(`${API_BASE}/content/contact`);
  },
};

/* =====================================================
   ENQUIRIES API
===================================================== */

export const enquiriesApi = {
  getAll: async (): Promise<Enquiry[]> => {
    return fetchJson(`${API_BASE}/enquiries`);
  },

  create: async (
    data: Omit<
      Enquiry,
      "id" | "status" | "created_at" | "updated_at"
    >
  ): Promise<Enquiry> => {
    return fetchJson(`${API_BASE}/enquiries`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateStatus: async (
    id: string,
    status: Enquiry["status"]
  ): Promise<void> => {
    await fetchJson(`${API_BASE}/enquiries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

/* =====================================================
   DASHBOARD API
===================================================== */

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return fetchJson(`${API_BASE}/dashboard/stats`);
  },
};

/* =====================================================
   HOMEPAGE API
===================================================== */

export const homepageApi = {
  getAll: async (): Promise<HomepageContent[]> => {
    return fetchJson(`${API_BASE}/content/homepage`);
  },

  update: async (
    section: string,
    formData: FormData
  ): Promise<HomepageContent> => {
    return fetch(`${API_BASE}/content/homepage/${section}`, {
      method: "PUT",
      body: formData,
    }).then(res => res.json());
  },
};
