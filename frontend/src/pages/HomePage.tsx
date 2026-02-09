import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe, Leaf, Shield, ChevronDown, Flame, Package, Truck, CheckCircle, MapPin, Star, Users, Clock, Trophy, Heart, ShieldCheck, Zap, Coffee, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { SectionHeader } from '@/components/SectionHeader';
import { productsApi, categoriesApi, testimonialsApi, contentApi } from '@/services/api';
import { Product, Category, Testimonial, HomepageContent, Feature, JourneyStep, Origin, Certification, IconType } from '@/types';
import { HighlightText } from '@/components/ui/HighlightText';
import { Skeleton } from '@/components/ui/skeleton';

// Icon mapping for dynamic icons
const iconComponents: Record<IconType, any> = {
  Leaf,
  Award,
  Globe,
  Shield,
  Flame,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Star,
  Users,
  Clock,
  Trophy,
  Heart,
  ShieldCheck,
  Zap,
  Coffee,
  Spices: Flame, // Fallback
  Factory,
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [homepageData, setHomepageData] = useState<{
    sections: HomepageContent[];
    features: Feature[];
    journey: JourneyStep[];
    origins: Origin[];
    certifications: Certification[];
  }>({
    sections: [],
    features: [],
    journey: [],
    origins: [],
    certifications: [],
  });

  // Helper to get section content
  const getSectionContent = (section: string) => {
    return homepageData.sections.find(c => c.section === section);
  };

  // Type-safe content extraction
  const getContentValue = (content: any, property: string): string | undefined => {
    if (!content) return undefined;
    if (typeof content === 'object') {
      return content[property] as string | undefined;
    }
    return undefined;
  };

  const [loading, setLoading] = useState({
    products: true,
    categories: true,
    testimonials: true,
    content: true,
  });

  useEffect(() => {
    async function fetchData() {
      console.log("FETCH STARTED");
      
      try {
        // Fetch all data in parallel
        const [products, categories, tests, homeContent] = await Promise.all([
          productsApi.getFeatured().catch(error => {
            console.error("Error fetching products:", error);
            return [];
          }),
          categoriesApi.getFeatured().catch(error => {
            console.error("Error fetching categories:", error);
            return [];
          }),
          testimonialsApi.getFeatured().catch(error => {
            console.error("Error fetching testimonials:", error);
            return [];
          }),
          contentApi.getHomepage().catch(error => {
            console.error("Error fetching content:", error);
            return {
              sections: [],
              features: [],
              journey: [],
              origins: [],
              certifications: [],
            };
          })
        ]);

        console.log("PRODUCTS:", products);
        console.log("CATEGORIES:", categories);
        console.log("TESTIMONIALS:", tests);
        console.log("HOMEPAGE DATA:", homeContent);

        setFeaturedProducts(products || []);
        setFeaturedCategories(categories || []);
        setTestimonials(tests || []);
        setHomepageData(homeContent);
        
      } catch (error) {
        console.error("Homepage fetch error:", error);
      } finally {
        setLoading({
          products: false,
          categories: false,
          testimonials: false,
          content: false,
        });
      }
    }

    fetchData();
  }, []);

  const heroContent = getSectionContent('hero');
  const introContent = getSectionContent('intro');
  const qualityContent = getSectionContent('quality');
  const whyChooseContent = getSectionContent('why_choose');
  const ctaContent = getSectionContent('cta');

  const isLoading = loading.products || loading.categories || loading.testimonials;

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getContentValue(heroContent, 'image') || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920"}
            alt="Premium spices"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ember/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-saffron/10 via-burnt-orange/5 to-transparent animate-fire-glow" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6 animate-fade-in">
              <Flame className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium text-saffron">Premium Spice Exporters</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in-up">
              <HighlightText
                text={getContentValue(heroContent, 'title') || "From the Heart of India, {Forged in Fire}"}
              />
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl animate-fade-in-up delay-100">
              {getContentValue(heroContent, 'subtitle') || 'Premium spices sourced from Kerala & Karnataka, delivered to European and global markets with uncompromising quality.'}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
              <Button asChild variant="fire" size="xl">
                <Link to="/products">
                  Explore Our Spices
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline-gold" size="xl">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-in delay-300">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-saffron">15+</p>
                <p className="text-sm text-white/60">Export Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-saffron">25+</p>
                <p className="text-sm text-white/60">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-saffron">500+</p>
                <p className="text-sm text-white/60">Partner Farmers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-saffron/60" />
        </div>
      </section>

      {/* From Farm to Flame Section */}
      <section className="py-24 bg-gradient-warm relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-saffron/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <SectionHeader
            subtitle={getContentValue(introContent, 'subtitle') || "Our Process"}
            title={getContentValue(introContent, 'title') || "From Farm to Flame"}
            description={getContentValue(introContent, 'content') || "Every spice tells a story of tradition, quality, and passion."}
          />
          
          {loading.content ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-soft">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {homepageData.journey
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((step, index) => {
                  const IconComponent = iconComponents[step.icon] || Flame;
                  return (
                    <div 
                      key={step.id}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-ember to-saffron flex items-center justify-center">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember/10 to-saffron/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-ember" />
                          </div>
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      {/* Spice Origins Section */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ember/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/15 rounded-full blur-[120px]" />
        
        <div className="container relative z-10">
          <SectionHeader
            subtitle={getContentValue(whyChooseContent, 'subtitle') || "Our Sourcing Regions"}
            title={getContentValue(whyChooseContent, 'title') || "Spice Origins"}
            description={getContentValue(whyChooseContent, 'content') || "Two legendary regions, centuries of spice heritage"}
          />
          
          {loading.content ? (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <Skeleton className="h-6 w-1/4 mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {homepageData.origins
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((origin) => (
                  <div 
                    key={origin.id}
                    className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-saffron/30 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-ember/10 via-transparent to-saffron/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron/20 border border-saffron/30 mb-4">
                        <MapPin className="w-4 h-4 text-saffron" />
                        <span className="text-sm font-medium text-saffron">{origin.region}</span>
                      </div>
                      
                      <h3 className="font-display text-3xl font-bold text-white mb-3">{origin.name}</h3>
                      <p className="text-white/70 mb-6">{origin.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {origin.spices.map((spice, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium"
                          >
                            {spice}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-warm relative">
        <div className="container">
          <SectionHeader
            subtitle={getContentValue(qualityContent, 'subtitle') || "Our Collection"}
            title={getContentValue(qualityContent, 'title') || "Featured Products"}
            description={getContentValue(qualityContent, 'content') || "Discover our most sought-after spices"}
          />
          
          {loading.products ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="ember" size="lg">
              <Link to="/products">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-sand">
        <div className="container">
          <SectionHeader
            subtitle="Browse by Category"
            title="Spice Collections"
            description="Explore our diverse range of authentic South Indian spices"
          />
          
          {loading.categories ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredCategories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us / Export Quality */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                {getContentValue(qualityContent, 'subtitle') || "Why Firehawk"}
              </p>

              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                {getContentValue(qualityContent, 'title') || "Export-Grade Quality, Globally Trusted"}
              </h2>

              <p className="text-muted-foreground text-lg mb-8">
                {getContentValue(qualityContent, 'content') || "At Firehawk, quality isn't just a promise — it's our legacy."}
              </p>
              
              {loading.content ? (
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Skeleton className="w-10 h-10 rounded-xl" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  {homepageData.features
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((feature) => {
                      const IconComponent = iconComponents[feature.icon] || Shield;
                      return (
                        <div key={feature.id} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember/10 to-saffron/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-ember" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Certifications Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-sand to-white rounded-3xl p-8 shadow-medium">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Certifications & Standards</h3>
                {loading.content ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <Skeleton key={index} className="h-12 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {homepageData.certifications
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((cert) => (
                        <div key={cert.id} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border/50">
                          <CheckCircle className="w-5 h-5 text-ember" />
                          <span className="text-sm font-medium text-foreground">{cert.name}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 bg-gradient-to-r from-ember/20 to-saffron/20 rounded-3xl blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-warm">
        <div className="container">
          <SectionHeader
            subtitle="Client Testimonials"
            title="What Our Partners Say"
            description="Trusted by leading spice importers and distributors across Europe"
          />
          
          {loading.testimonials ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-soft p-6">
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-saffron/15 rounded-full blur-[100px]" />
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
            <Flame className="w-4 h-4 text-saffron" />
            <span className="text-sm font-medium text-saffron">Partner With Us</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            <HighlightText
              text={getContentValue(ctaContent, 'title') || "Ready to Source {Premium Spices?}"}
            />
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            {getContentValue(ctaContent, 'content') || "Whether you're a distributor, manufacturer, or retailer, we offer flexible packaging and competitive pricing for bulk orders."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="fire" size="xl">
              <Link to="/contact">
                Get a Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline-gold" size="xl">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}