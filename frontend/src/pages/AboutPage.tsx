import { useEffect, useState } from 'react';
import { Award, Globe, Leaf, Users, MapPin, Target, Eye, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { contentApi } from '@/services/api';
import { AboutContent } from '@/types';

const stats = [
  { icon: Globe, value: '15+', label: 'Export Countries' },
  { icon: Users, value: '500+', label: 'Partner Farmers' },
  { icon: Award, value: '25+', label: 'Years Experience' },
  { icon: Flame, value: '100+', label: 'Business Clients' },
];

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const aboutContent = await contentApi.getAbout();
        setContent(aboutContent);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const storyContent = content.find(c => c.section === 'story');
  const heritageContent = content.find(c => c.section === 'heritage');
  const sourcingContent = content.find(c => c.section === 'sourcing');
  const missionContent = content.find(c => c.section === 'mission');
  const visionContent = content.find(c => c.section === 'vision');
  const exportContent = content.find(c => c.section === 'export');

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-32 bg-charcoal overflow-hidden">
        {/* Background with fire glow */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1920"
            alt="Spice plantation"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ember/20 via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
              <Flame className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium text-saffron">Our Story</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Forging Excellence in{' '}
              <span className="text-gradient-fire">Every Spice</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              A legacy of quality, authenticity, and trust — from the heart of South India to tables worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gradient-to-r from-ember via-burnt-orange to-saffron">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <stat.icon className="w-7 h-7 mx-auto mb-2 opacity-80" />
                <p className="font-display text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gradient-warm">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">Our Journey</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {storyContent?.title || 'Our Story'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {storyContent?.content || 'Founded with a passion for authentic Indian spices, Firehawk Imports and Exports emerged from a simple belief: the world deserves access to the finest spices that Kerala and Karnataka have to offer.'}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our journey began in the spice plantations of Malabar, where generations of farmers have perfected the art of growing and harvesting premium spices. Today, we bridge the gap between these traditional growers and global markets, ensuring every spice carries the authentic essence of its origin.
              </p>
            </div>
            <div className="relative">
              <img
                src={storyContent?.image || 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800'}
                alt="Our story"
                className="rounded-3xl shadow-medium w-full"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-ember via-burnt-orange to-saffron text-white p-8 rounded-2xl shadow-lg">
                <p className="font-display text-5xl font-bold">25+</p>
                <p className="text-sm opacity-90 mt-1">Years of Excellence</p>
              </div>
              {/* Glow effect */}
              <div className="absolute -z-10 inset-0 translate-x-6 translate-y-6 bg-gradient-to-r from-ember/30 to-saffron/30 rounded-3xl blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Fire glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ember/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/15 rounded-full blur-[120px]" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={heritageContent?.image || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800'}
                alt="Kerala heritage"
                className="rounded-3xl shadow-medium w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-saffron uppercase tracking-wider mb-3">Rich Heritage</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                {heritageContent?.title || 'Kerala & Karnataka Heritage'}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {heritageContent?.content || "The Western Ghats of Kerala and Karnataka form one of the world's most bio-diverse regions, blessed with the perfect climate for growing exceptional spices."}
              </p>
              <p className="text-white/60 leading-relaxed">
                From the Malabar coast's legendary black pepper to the Cardamom Hills' aromatic green cardamom, our sourcing network spans the finest growing regions of South India. Each spice carries centuries of cultivation knowledge and natural excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Quality */}
      <section className="py-24 bg-gradient-warm">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">Our Process</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {sourcingContent?.title || 'Sourcing & Quality'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {sourcingContent?.content || 'We work directly with farmers and cooperatives, ensuring fair prices for growers while maintaining complete supply chain transparency.'}
              </p>
              <ul className="space-y-4">
                {['Direct farmer partnerships ensuring fair trade', 'Rigorous quality testing at every stage', 'Complete traceability from farm to warehouse', 'International food safety certifications'].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-ember to-saffron flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={sourcingContent?.image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800'}
                alt="Quality process"
                className="rounded-3xl shadow-medium w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-sand">
        <div className="container">
          <SectionHeader
            subtitle="Our Purpose"
            title="Mission & Vision"
            description="Guided by tradition, driven by excellence"
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-medium transition-shadow border border-border/30">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ember to-burnt-orange flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {missionContent?.title || 'Our Mission'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {missionContent?.content || "To be the trusted bridge between South India's spice heritage and the global marketplace, delivering uncompromising quality while supporting sustainable farming practices and fair trade."}
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-medium transition-shadow border border-border/30">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron to-gold flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {visionContent?.title || 'Our Vision'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {visionContent?.content || 'To make authentic Indian spices accessible to every kitchen worldwide, while preserving traditional cultivation methods and empowering local farming communities.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-gradient-warm">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={exportContent?.image || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800'}
                alt="Global exports"
                className="rounded-3xl shadow-medium w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">Worldwide Reach</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {exportContent?.title || 'Global Presence'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {exportContent?.content || "Firehawk exports to over 15 countries across Europe, Middle East, and North America. Our logistics partners ensure timely delivery with proper documentation for seamless customs clearance."}
              </p>
              <div className="flex flex-wrap gap-3">
                {['Germany', 'France', 'UK', 'Sweden', 'Netherlands', 'USA', 'UAE', 'Canada'].map((country) => (
                  <span 
                    key={country}
                    className="px-4 py-2 bg-white text-sm font-medium text-foreground rounded-full border border-border/50 shadow-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/20 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Partner With Firehawk
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            Ready to bring the finest South Indian spices to your market? Let's discuss how we can work together.
          </p>
          <Button asChild variant="fire" size="xl">
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
