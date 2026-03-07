import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, Flame } from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  productsApi,
  categoriesApi,
  productsContentApi,
} from "@/services/api";

import { Product, Category } from "@/types";
import { HighlightText } from "@/components/ui/HighlightText";


/* ============================================
   TYPE (FOR CMS CONTENT)
============================================ */

type ProductsContent = {
  section: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  image?: string | null;
};

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsContent, setProductsContent] =
    useState<ProductsContent[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = searchParams.get("category") || "";

  /* ============================================
     FETCH DATA
  ============================================ */

  useEffect(() => {
    async function fetchData() {
      try {
        const [prods, cats, content] = await Promise.all([
          productsApi.getAll(),
          categoriesApi.getAll(),
          productsContentApi.getAll(),
        ]);

        setProducts(prods);
        setCategories(cats);
        setProductsContent(content);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ============================================
     HERO CONTENT
  ============================================ */

  const heroContent = productsContent.find(
    (c) => c.section === "hero"
  );

  /* ============================================
     FILTERING
  ============================================ */

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !activeCategory ||
      product.category?.slug === activeCategory;

    const matchesSearch =
      !searchQuery ||
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  /* ============================================
     CATEGORY CLICK
  ============================================ */

  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams);

    if (!slug) params.delete("category");
    else params.set("category", slug);

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  /* ============================================
     UI
  ============================================ */

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-ember/20 via-saffron/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
              <Flame className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium text-saffron">
                {heroContent?.badge || "Our Collection"}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <HighlightText
                text={heroContent?.title || "Premium {Spices}"}
              />
            </h1>
            {/* CONTENT */}
            <p className="text-white/70 text-lg mb-10">
              {heroContent?.content ||
                "Explore our complete range of authentic South Indian spices, sourced directly from Kerala and Karnataka"}
            </p>

            {/* SEARCH */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search spices..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-14 pr-5 py-6 text-base bg-white border-0 rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 bg-gradient-warm">
        <div className="container">

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter:
            </span>

            <Button
              variant={!activeCategory ? "fire" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick("")}
            >
              All Products
            </Button>

            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  activeCategory === category.slug
                    ? "fire"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  handleCategoryClick(category.slug)
                }
              >
                {category.name}
              </Button>
            ))}

            {(activeCategory || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-destructive"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* RESULTS COUNT */}
          <p className="text-sm text-muted-foreground mb-8">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}
          </p>

          {/* GRID */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl aspect-[4/5] animate-pulse"
                />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-border/30">
              <p className="text-muted-foreground text-lg mb-4">
                No products found matching your criteria.
              </p>
              <Button onClick={clearFilters} variant="ember">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
