import { useEffect, useState } from "react";
import {
  Award,
  Globe,
  Users,
  Flame,
  Target,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { contentApi } from "@/services/api";
import { AboutContent } from "@/types";
import { HighlightText } from "@/components/ui/HighlightText";

/* =====================================================
   STATIC STATS (NEXT STEP: MOVE TO CMS)
===================================================== */

const stats = [
  { icon: Globe, value: "15+", label: "Export Countries" },
  { icon: Users, value: "500+", label: "Partner Farmers" },
  { icon: Award, value: "25+", label: "Years Experience" },
  { icon: Flame, value: "100+", label: "Business Clients" },
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
        console.error("Error fetching about content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* =====================================================
     HELPERS
  ===================================================== */

  const getSection = (section: string) =>
    content.find((c) => c.section === section);

  const heroContent = getSection("hero");
  const storyContent = getSection("story");
  const heritageContent = getSection("heritage");
  const sourcingContent = getSection("sourcing");
  const missionContent = getSection("mission");
  const visionContent = getSection("vision");
  const exportContent = getSection("export");

  const Badge = ({ text }: { text?: string }) => {
    if (!text) return null;

    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
        <Flame className="w-4 h-4 text-saffron" />
        <span className="text-sm font-medium text-saffron">
          {text}
        </span>
      </div>
    );
  };

  const Subtitle = ({ text }: { text?: string }) => {
    if (!text) return null;

    return (
      <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
        {text}
      </p>
    );
  };


  

  return (
    <PublicLayout>
      {/* =====================================================
          HERO SECTION (CMS CONTROLLED)
      ===================================================== */}
      <section className="relative py-32 bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              heroContent?.image ||
              "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1920"
            }
            alt="Spice plantation"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ember/20 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {heroContent?.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
                <Flame className="w-4 h-4 text-saffron" />
                <span className="text-sm font-medium text-saffron">
                  {heroContent.badge}
                </span>
              </div>
            )}

            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              <HighlightText
                text={
                  heroContent?.title ||
                  "Forging Excellence in {Every Spice}"
                }
              />
            </h1>

            <p className="text-xl text-white/70 leading-relaxed">
              {heroContent?.content ||
                "A legacy of quality, authenticity, and trust — from the heart of South India to tables worldwide."}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS BAR
      ===================================================== */}
      <section className="py-8 bg-gradient-to-r from-ember via-burnt-orange to-saffron">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <stat.icon className="w-7 h-7 mx-auto mb-2 opacity-80" />
                <p className="font-display text-3xl md:text-4xl font-bold">
                  {stat.value}
                </p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY (CMS CONTROLLED)
      ===================================================== */}
      <section className="py-24 bg-gradient-warm">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Subtitle text={storyContent?.badge || "Our Journey"} />


              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                <HighlightText
                  text={
                    storyContent?.title ||
                    "Our Story"
                  }
                />
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {storyContent?.content}
              </p>
            </div>

            <div>
              <img
                src={
                  storyContent?.image ||
                  "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800"
                }
                alt="Our story"
                className="rounded-3xl shadow-medium w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HERITAGE
      ===================================================== */}
      <section className="py-24 bg-charcoal">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <img
              src={
                heritageContent?.image ||
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800"
              }
              className="rounded-3xl shadow-medium"
            />

            <div>
              <Badge text={heritageContent?.badge || "Rich Heritage"} />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                <HighlightText
                  text={
                    heritageContent?.title ||
                    "Kerala & Karnataka Heritage"
                  }
                />
              </h2>

              <p className="text-white/70 whitespace-pre-line">
                {heritageContent?.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOURCING
      ===================================================== */}
      <section className="py-24 bg-gradient-warm">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Subtitle text={sourcingContent?.badge || "Our Process"} />  

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {sourcingContent?.title || "Sourcing & Quality"}
            </h2>

            <p className="text-muted-foreground whitespace-pre-line">
              {sourcingContent?.content}
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

          <img
            src={
              sourcingContent?.image ||
              "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800"
            }
            className="rounded-3xl shadow-medium"
          />
        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ===================================================== */}
      <section className="py-24 bg-sand">
        <div className="container">
          <SectionHeader
            subtitle="Our Purpose"
            title="Mission & Vision"
            description="Guided by tradition, driven by excellence"
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <Target className="w-7 h-7 mb-4 text-ember" />
              <h3 className="text-2xl font-bold mb-4">
                {missionContent?.title || "Our Mission"}
              </h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {missionContent?.content}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <Eye className="w-7 h-7 mb-4 text-ember" />
              <h3 className="text-2xl font-bold mb-4">
                {visionContent?.title || "Our Vision"}
              </h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {visionContent?.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPORT
      ===================================================== */}
      <section className="py-24 bg-gradient-warm">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <img
            src={
              exportContent?.image ||
              "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800"
            }
            className="rounded-3xl shadow-medium"
          />

          <div className="order-1 lg:order-2">
            <Subtitle text={exportContent?.badge || "Worldwide Reach"} />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {exportContent?.title || 'Global Presence'}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {exportContent?.content || "Firehawk exports to over 15 countries across Europe, Middle East, and North America. Our logistics partners ensure timely delivery with proper documentation for seamless customs clearance."}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-3">
                {(exportContent?.countries?.length
                  ? exportContent.countries
                  : ['Germany', 'France', 'UK', 'USA']
                ).map((country) => (
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

      {/* CTA stays static for now */}
    </PublicLayout>
  );
}
