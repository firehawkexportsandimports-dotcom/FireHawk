import { Link } from "react-router-dom";
import { Star, Globe } from "lucide-react"; // Added icons
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // SAFE IMAGE RESOLUTION
  const primaryImage =
    product.images?.find((img) => img.is_primary) ||
    product.images?.[0];

  const imageUrl =
    primaryImage?.url || "/placeholder.svg";

  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        "group block bg-white rounded-2xl overflow-hidden border border-border/30 shadow-soft hover:shadow-medium hover:-translate-y-2 transition-all duration-500",
        className
      )}
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-sand">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={primaryImage?.alt || product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <span className="text-6xl">🌶️</span>
          </div>
        )}

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-ember to-burnt-orange text-white text-xs font-semibold rounded-full shadow-md inline-flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Export Ready Badge - Positioned on the right */}
        {product.is_export_ready && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1.5 bg-charcoal/80 backdrop-blur-sm text-white text-xs font-medium rounded-full inline-flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Export Ready
            </span>
          </div>
        )}

        {/* VIEW BUTTON */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <span className="block w-full py-2.5 bg-white/95 backdrop-blur-sm text-center text-sm font-semibold text-charcoal rounded-xl shadow-lg">
            View Details
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {product.category && (
          <p className="text-xs font-semibold text-ember uppercase tracking-wider mb-1.5">
            {product.category.name}
          </p>
        )}

        <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-ember transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.short_description || "Premium quality spice sourced directly from origin."}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse"></span>
            {product.origin || "India"}
          </span>

          <span className="text-sm font-medium text-ember group-hover:translate-x-1 transition-transform duration-300">
            Explore →
          </span>
        </div>

        {/* Optional: Show price range if available */}
        {product.price_range && (
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Price: </span>
            {product.price_range}
          </div>
        )}
      </div>
    </Link>
  );
}