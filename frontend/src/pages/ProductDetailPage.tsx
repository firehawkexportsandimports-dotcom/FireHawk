import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  Send,
  Flame,
} from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { useToast } from "@/hooks/use-toast";
import { productsApi, enquiriesApi } from "@/services/api";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  /* ============================================
     FETCH PRODUCT
  ============================================ */
  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      try {
        const data = await productsApi.getBySlug(slug);
        setProduct(data || null);
        
        // Always start with the first image (which will be the primary after sorting)
        setSelectedImage(0);
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  /* ============================================
     ENQUIRY SUBMIT
  ============================================ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSubmitting(true);

    try {
      await enquiriesApi.create({
        type: "product",
        product_id: product.id,
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      });

      toast({
        title: "Enquiry Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send enquiry.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ============================================
     STATES
  ============================================ */

  if (loading) {
    return (
      <PublicLayout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </PublicLayout>
    );
  }

  if (!product) {
    return (
      <PublicLayout>
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Product Not Found
          </h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  /* ============================================
     IMAGE HANDLING
  ============================================ */

  const images = product.images || [];

  // Create a new array with primary image first, then others in original order
  const sortedImages = [
    ...images.filter(img => img.is_primary),
    ...images.filter(img => !img.is_primary)
  ];

  const currentImage = sortedImages[selectedImage] || sortedImages[0];

  const imageUrl = currentImage?.url
    ? currentImage.url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
      )
    : "/placeholder.svg";

  /* ============================================
     UI
  ============================================ */

  return (
    <PublicLayout>
      <div className="bg-gradient-warm min-h-screen">
        <div className="container py-10">

          {/* BACK */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-ember mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* ================= IMAGES ================= */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-medium">
                <img
                  src={imageUrl}
                  alt={currentImage?.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {sortedImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {sortedImages.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all",
                        selectedImage === i
                          ? "border-ember ring-2 ring-ember/20"
                          : "border-transparent opacity-70 hover:opacity-100 hover:border-ember/50"
                      )}
                    >
                      <img
                        src={img.url}
                        alt={img.alt || product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* If no images, show placeholder */}
              {sortedImages.length === 0 && (
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center">
                  <span className="text-2xl">🌶️</span>
                </div>
              )}
            </div>

            {/* ================= DETAILS ================= */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.category && (
                  <Badge className="bg-ember/10 text-ember border-0">
                    {product.category.name}
                  </Badge>
                )}

                {product.is_export_ready && (
                  <Badge className="bg-charcoal text-white">
                    Export Ready
                  </Badge>
                )}

                {product.is_featured && (
                  <Badge className="bg-gradient-to-r from-ember to-saffron text-white">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-4">
                {product.name}
              </h1>

              {product.origin && (
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-4 h-4 text-ember" />
                  Origin: {product.origin}
                </div>
              )}

              {/* Price Range if available */}
              {product.price_range && (
                <div className="mb-6">
                  <span className="text-2xl font-bold text-ember">
                    {product.price_range}
                  </span>
                </div>
              )}

              {/* Short Description if available */}
              {product.short_description && (
                <p className="text-muted-foreground text-lg mb-4">
                  {product.short_description}
                </p>
              )}

              {/* Full Description */}
              {product.description && (
                <p className="text-muted-foreground mb-8">
                  {product.description}
                </p>
              )}

              {/* PACKAGING */}
              {product.packaging?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-ember" />
                    Available Packaging
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {product.packaging.map((pkg) => (
                      <span
                        key={pkg}
                        className="px-4 py-2 bg-white rounded-xl border text-sm hover:border-ember transition-colors"
                      >
                        {pkg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ENQUIRY FORM */}
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember to-saffron flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Request a Quote
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company: e.target.value,
                      })
                    }
                  />

                  <Textarea
                    rows={4}
                    required
                    placeholder="Quantity, packaging preferences, requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Send Enquiry"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}