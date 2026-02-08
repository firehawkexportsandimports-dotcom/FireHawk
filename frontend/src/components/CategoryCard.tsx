import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({
  category,
  className,
}: CategoryCardProps) {
  /* ------------------------------------------
     SAFE FALLBACKS (IMPORTANT)
  ------------------------------------------ */

  // image fallback
  const imageUrl =
    category?.image && category.image.length > 0
      ? category.image
      : "/placeholder.svg";

  // product count fallback
  const productCount =
    typeof category?.product_count === "number"
      ? category.product_count
      : 0;

  // slug fallback (prevents broken navigation)
  const categorySlug = category?.slug || "";

  return (
    <Link
      to={`/products?category=${categorySlug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl aspect-[4/3] bg-charcoal",
        className
      )}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={category?.name || "Category"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

      {/* Fire Glow Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-ember/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
          
          {/* Title */}
          <h3 className="font-display font-bold text-xl text-white group-hover:text-saffron transition-colors">
            {category?.name || "Category"}
          </h3>

          {/* Description */}
          {category?.description && (
            <p className="text-sm text-white/70 mt-1 line-clamp-2">
              {category.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
            <span className="text-xs text-white/50">
              {productCount} Products
            </span>

            <span className="flex items-center gap-1 text-sm font-medium text-saffron group-hover:gap-2 transition-all">
              Explore
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
