import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe, Leaf, Shield, ChevronDown, Flame, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { SectionHeader } from '@/components/SectionHeader';
import { productsApi, categoriesApi, testimonialsApi, contentApi } from '@/services/api';
import { Product, Category, Testimonial, HomepageContent } from '@/types';
import { HighlightText } from '@/components/ui/HighlightText';
import { Skeleton } from '@/components/ui/skeleton';

const features = [
  {
    icon: Leaf,
    title: 'Farm Fresh',
    description: 'Sourced directly from organic farms in Kerala and Karnataka',
  },
  {
    icon: Award,
    title: 'Export Quality',
    description: 'Meets EU, FDA, and international food safety standards',
  },
  {
    icon: Globe,
    title: 'Global Delivery',
    description: 'Shipping to 15+ countries with full documentation',
  },
  {
    icon: Shield,
    title: 'Certified Purity',
    description: 'Complete traceability from farm to warehouse',
  },
];

const journeySteps = [
  {
    icon: Leaf,
    title: 'Farm Sourcing',
    description: 'Hand-picked from traditional plantations in Kerala & Karnataka',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
  },
  {
    icon: Flame,
    title: 'Processing',
    description: 'Traditional methods meet modern quality standards',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
  },
  {
    icon: Package,
    title: 'Packaging',
    description: 'Export-grade packaging preserving freshness and aroma',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400',
  },
  {
    icon: Truck,
    title: 'Export',
    description: 'Delivered worldwide with complete documentation',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400',
  },
];

const origins = [
  {
    name: 'Kerala',
    region: 'Malabar Coast',
    spices: ['Black Pepper', 'Cardamom', 'Cloves'],
    description: 'The spice capital of India, blessed with perfect climate for premium spices',
  },
  {
    name: 'Karnataka',
    region: 'Western Ghats',
    spices: ['Cinnamon', 'Turmeric', 'Star Anise'],
    description: 'Lush green hills producing some of the finest aromatic spices',
  },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [content, setContent] = useState<HomepageContent[]>([]);
  const introContent = content.find(c => c.section === "intro");
  const qualityContent = content.find(c => c.section === "quality");
  const whyChooseContent = content.find(c => c.section === "why_choose");

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
            return [];
          })
        ]);

        console.log("PRODUCTS:", products);
        console.log("CATEGORIES:", categories);
        console.log("TESTIMONIALS:", tests);
        console.log("CONTENT:", homeContent);

        setFeaturedProducts(products || []);
        setFeaturedCategories(categories || []);
        setTestimonials(tests || []);
        setContent(homeContent || []);
        
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

  const heroContent = content.find(c => c.section === 'hero');
  const ctaContent = content.find(c => c.section === 'cta');

  const isLoading = loading.products || loading.categories || loading.testimonials;

  return (
    <PublicLayout>
      {/* Hero Section - Cinematic with Fire Glow */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
        <img
          src={
            heroContent?.image ||
            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920"
          }
          alt="Premium spices"
          className="w-full h-full object-cover"
        />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/60" />
          {/* Fire glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-ember/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-saffron/10 via-burnt-orange/5 to-transparent animate-fire-glow" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6 animate-fade-in">
              <Flame className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium text-saffron">Premium Spice Exporters</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in-up">
              <HighlightText
                text={
                  heroContent?.title ||
                  "From the Heart of India, {Forged in Fire}"
                }
              />
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl animate-fade-in-up delay-100">
              {heroContent?.subtitle || 'Premium spices sourced from Kerala & Karnataka, delivered to European and global markets with uncompromising quality.'}
            </p>

            {/* CTA Buttons */}
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

            {/* Trust Indicators */}
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-saffron/60" />
        </div>
      </section>

      {/* From Farm to Flame Section */}
      <section className="py-24 bg-gradient-warm relative overflow-hidden">
        {/* Subtle fire glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-saffron/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <SectionHeader
            subtitle={introContent?.subtitle || "Our Process"}
            title={introContent?.title || "From Farm to Flame"}
            description={
              introContent?.content ||
              "Every spice tells a story of tradition, quality, and passion."
            }
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {journeySteps.map((step, index) => (
              <div 
                key={step.title}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  {/* Step number */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-ember to-saffron flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember/10 to-saffron/10 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-ember" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Spice Origins Section */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Fire glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ember/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/15 rounded-full blur-[120px]" />
        
        <div className="container relative z-10">
          <SectionHeader
            subtitle={whyChooseContent?.subtitle || "Our Sourcing Regions"}
            title={whyChooseContent?.title || "Spice Origins"}
            description={
              whyChooseContent?.content ||
              "Two legendary regions, centuries of spice heritage"
            }
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {origins.map((origin, index) => (
              <div 
                key={origin.name}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-saffron/30 transition-all duration-500"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-ember/10 via-transparent to-saffron/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Location Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron/20 border border-saffron/30 mb-4">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span className="text-sm font-medium text-saffron">{origin.region}</span>
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold text-white mb-3">{origin.name}</h3>
                  <p className="text-white/70 mb-6">{origin.description}</p>
                  
                  {/* Spices List */}
                  <div className="flex flex-wrap gap-2">
                    {origin.spices.map((spice) => (
                      <span 
                        key={spice}
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
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-warm relative">
        <div className="container">
          <SectionHeader
            subtitle={qualityContent?.subtitle || "Our Collection"}
            title={qualityContent?.title || "Featured Products"}
            description={
              qualityContent?.content ||
              "Discover our most sought-after spices"
            }
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

      {/* Categories - FIXED THIS SECTION */}
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
            {/* Content */}
            <div>
              <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                {qualityContent?.subtitle || "Why Firehawk"}
              </p>

              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                {qualityContent?.title || "Export-Grade Quality, Globally Trusted"}
              </h2>

              <p className="text-muted-foreground text-lg mb-8">
                {qualityContent?.content ||
                  "At Firehawk, quality isn't just a promise — it's our legacy."}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember/10 to-saffron/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-ember" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-sand to-white rounded-3xl p-8 shadow-medium">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Certifications & Standards</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['EU Food Safety', 'FDA Approved', 'FSSAI Certified', 'ISO 22000', 'HACCP', 'Organic Certified'].map((cert) => (
                    <div key={cert} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border/50">
                      <CheckCircle className="w-5 h-5 text-ember" />
                      <span className="text-sm font-medium text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative glow */}
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

      {/* CTA Section - Dark with Fire Glow */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Fire glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-saffron/15 rounded-full blur-[100px]" />
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
            <Flame className="w-4 h-4 text-saffron" />
            <span className="text-sm font-medium text-saffron">Partner With Us</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            <HighlightText
              text={
                ctaContent?.title ||
                "Ready to Source {Premium Spices?}"
              }
            />
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            {ctaContent?.content || "Whether you're a distributor, manufacturer, or retailer, we offer flexible packaging and competitive pricing for bulk orders."}
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