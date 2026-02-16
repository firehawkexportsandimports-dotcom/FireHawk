import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { homepageApi , testimonialsApi } from "@/services/api";
import {
  HomepageContent,
  HomepageEditForm,
  HomepageSection,
  Feature,
  JourneyStep,
  JourneyStepForm,
  Origin,
  Certification,
  IconType,
  Testimonial,
  HomepageStat,
} from "@/types";


// All available icons
const availableIcons: { value: IconType; label: string }[] = [
  { value: "Leaf", label: "Leaf" },
  { value: "Award", label: "Award" },
  { value: "Globe", label: "Globe" },
  { value: "Shield", label: "Shield" },
  { value: "Flame", label: "Flame" },
  { value: "Package", label: "Package" },
  { value: "Truck", label: "Truck" },
  { value: "CheckCircle", label: "Check Circle" },
  { value: "MapPin", label: "Map Pin" },
  { value: "Star", label: "Star" },
  { value: "Users", label: "Users" },
  { value: "Clock", label: "Clock" },
  { value: "Trophy", label: "Trophy" },
  { value: "Heart", label: "Heart" },
  { value: "ShieldCheck", label: "Shield Check" },
  { value: "Zap", label: "Zap" },
  { value: "Coffee", label: "Coffee" },
  { value: "Factory", label: "Factory" },
];

// Sections config
const sections: { id: HomepageSection; title: string }[] = [
  { id: "hero", title: "Hero Section" },
  { id: "intro", title: "Introduction" },
  { id: "products_intro", title: "Products Introduction" },
  { id: "quality", title: "Quality Section" },
  { id: "why_choose", title: "Why Choose Us" },
  { id: "category_intro", title: "Category Section Header" },
  { id: "cta", title: "CTA Section" },
  { id: "testimonials_intro", title: "Testimonials Section Header" },
];

const sectionFieldConfig: Record<
  HomepageSection,
  {
    title?: boolean;
    subtitle?: boolean;
    content?: boolean;
    image?: boolean;
    badge?: boolean;
    button?: boolean;
  }
> = {
  hero: {
    title: true,
    content: true,
    image: true,
    badge: true,
  },

  intro: {
    title: true,
    subtitle: true,
    content: true,
  },

  products_intro: {
    title: true,
    content: true,
    subtitle: true,
  },

  quality: {
    title: true,
    subtitle: true,
    content: true,
  },

  why_choose: {
    subtitle: true,
    title: true,
    content: true,
  },

  category_intro: {
    title: true,
    subtitle: true,
    content: true,
  },

  cta: {
    title: true,
    content: true,
    badge: true,
    button: true,
  },

  testimonials_intro: {
    title: true,
    subtitle: true,
    content: true,
  },
  
};



export default function AdminHomepage() {
  // States
  const [sectionsData, setSectionsData] = useState<HomepageContent[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [journey, setJourney] = useState<JourneyStep[]>([]);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const [editingSection, setEditingSection] = useState<HomepageEditForm | null>(null);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [editingJourney, setEditingJourney] = useState<JourneyStepForm | null>(null);
  const [editingOrigin, setEditingOrigin] = useState<Origin | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] =  useState<Partial<Testimonial> | null>(null);
  const [spiceInput, setSpiceInput] = useState("");
  const [stats, setStats] = useState<HomepageStat[]>([]);
  const [editingStat, setEditingStat] = useState<HomepageStat | null>(null);




  const [loading, setLoading] = useState(true);

  // Load all data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await homepageApi.getAll();
      setSectionsData(data.sections || []);
      setFeatures(data.features || []);
      setJourney(data.journey || []);
      setOrigins(data.origins || []);
      setCertifications(data.certifications || []);
      setTestimonials(data.testimonials || []);
      setStats(data.stats || []);
    } catch (err) {
      console.error("Homepage fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get section data
  const getSectionData = (section: HomepageSection) =>
    sectionsData.find((c) => c.section === section);

  // Save section
  const handleSaveSection = async () => {
    if (!editingSection) return;

    try {
      const formData = new FormData();
      formData.append("title", editingSection.title || "");
      formData.append("subtitle", editingSection.subtitle || "");
      formData.append("content", editingSection.content || "");
      formData.append("button_text", editingSection.button_text || "");
      formData.append("button_link", editingSection.button_link || "");

      // Only add badge for hero and cta sections
      if (sectionFieldConfig[editingSection.section]?.badge) {
        formData.append("badge", editingSection.badge || "");
      }

      if (editingSection.imageFile) {
        formData.append("image", editingSection.imageFile);
      }

      const updated = await homepageApi.updateSection(
        editingSection.section,
        formData
      );

      setSectionsData((prev) => {
        const exists = prev.find((c) => c.section === updated.section);
        if (exists) {
          return prev.map((c) =>
            c.section === updated.section ? updated : c
          );
        }
        return [...prev, updated];
      });

      setEditingSection(null);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save section. Please try again.");
    }
  };

  const handleDeleteStat = async (id: string) => {
    try {
      await homepageApi.deleteStat(id);

      // update UI immediately
      setStats(prev => prev.filter(stat => stat.id !== id));
    } catch (error) {
      console.error("Delete stat failed:", error);
      alert("Failed to delete stat");
    }
  };


  // Feature CRUD - FIXED: Remove id field for new items
  const handleSaveFeature = async () => {
    if (!editingFeature) return;

    try {
      let updated;
      if (editingFeature.id) {
        // Update existing feature
        updated = await homepageApi.updateFeature(editingFeature.id, editingFeature);
        setFeatures((prev) =>
          prev.map((f) => (f.id === updated.id ? updated : f))
        );
      } else {
        // Create new feature - remove id field
        const { id, ...featureData } = editingFeature;
        updated = await homepageApi.createFeature(featureData);
        setFeatures((prev) => [...prev, updated]);
      }
      setEditingFeature(null);
    } catch (error) {
      console.error("Save feature failed:", error);
      alert("Failed to save feature. Please try again.");
    }
  };

  const handleDeleteFeature = async (id: string) => {
    try {
      await homepageApi.deleteFeature(id);
      setFeatures((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Delete feature failed:", error);
      alert("Failed to delete feature. Please try again.");
    }
  };

  const handleReorder = async (
    type: 'stat' | 'feature' | 'journey' | 'origin' | 'certification',
    id: string | undefined,
    direction: 'up' | 'down'
  ) => {
    try {
      if (!id) return;

      const apiMap = {
        stats: homepageApi.reorderStat,
        feature: homepageApi.reorderFeature,
        journey: homepageApi.reorderJourney,
        origin: homepageApi.reorderOrigin,
        certification: homepageApi.reorderCertification,
      };

      await apiMap[type](id, direction);
      await loadData();
    } catch (error) {
      console.error("Reorder failed:", error);
    }
  };



  // Journey Step CRUD - TEMPORARY WORKAROUND
  const handleSaveJourney = async () => {
    if (!editingJourney) return;

    try {
      const formData = new FormData();
      formData.append("title", editingJourney.title || "");
      formData.append("description", editingJourney.description || "");
      formData.append("icon", editingJourney.icon || "Leaf");
      formData.append("sort_order", editingJourney.sort_order?.toString() || (journey.length + 1).toString());
      
      // ALWAYS provide an image - either file or URL
      if (editingJourney.imageFile) {
        formData.append("image", editingJourney.imageFile);
      } else {
        // Use the default image URL
        formData.append("image", editingJourney.image || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400");
      }

      let updated: JourneyStep;
      if (editingJourney.id) {
        // Update existing journey step
        updated = await homepageApi.updateJourney(editingJourney.id, formData);
        setJourney((prev) =>
          prev.map((j) => (j.id === updated.id ? updated : j))
        );
      } else {
        // Create new journey step
        updated = await homepageApi.createJourney(formData);
        setJourney((prev) => [...prev, updated]);
      }
      setEditingJourney(null);
    } catch (error) {
      console.error("Save journey failed:", error);
      alert("Failed to save journey step. Please check that all required fields are filled and try again.");
    }
  };

  const handleDeleteJourney = async (id: string) => {
    try {
      await homepageApi.deleteJourney(id);
      setJourney((prev) => prev.filter((j) => j.id !== id));
    } catch (error) {
      console.error("Delete journey failed:", error);
      alert("Failed to delete journey step. Please try again.");
    }
  };

  // Origin CRUD - FIXED: Remove id field for new items
  const handleSaveOrigin = async () => {
    if (!editingOrigin) return;

    try {
      let updated;
      if (editingOrigin.id) {
        // Update existing origin
        updated = await homepageApi.updateOrigin(editingOrigin.id, {
          ...editingOrigin,
          spices: editingOrigin.spices || [],
        });
        setOrigins((prev) =>
          prev.map((o) => (o.id === updated.id ? updated : o))
        );
      } else {
        // Create new origin - remove id field
        const { id, ...originData } = editingOrigin;
        updated = await homepageApi.createOrigin({
          ...originData,
          spices: editingOrigin.spices || [],
        });
        setOrigins((prev) => [...prev, updated]);
      }
      setEditingOrigin(null);
    } catch (error) {
      console.error("Save origin failed:", error);
      alert("Failed to save origin. Please try again.");
    }
  };

  const handleDeleteOrigin = async (id: string) => {
    try {
      await homepageApi.deleteOrigin(id);
      setOrigins((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Delete origin failed:", error);
      alert("Failed to delete origin. Please try again.");
    }
  };

  // Certification CRUD - FIXED: Remove id field for new items
  const handleSaveCertification = async () => {
    if (!editingCert) return;

    try {
      let updated;
      if (editingCert.id) {
        // Update existing certification
        updated = await homepageApi.updateCertification(editingCert.id, editingCert);
        setCertifications((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      } else {
        // Create new certification - remove id field
        const { id, ...certData } = editingCert;
        updated = await homepageApi.createCertification(certData);
        setCertifications((prev) => [...prev, updated]);
      }
      setEditingCert(null);
    } catch (error) {
      console.error("Save certification failed:", error);
      alert("Failed to save certification. Please try again.");
    }
  };

  const handleDeleteCertification = async (id: string) => {
    try {
      await homepageApi.deleteCertification(id);
      setCertifications((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Delete certification failed:", error);
      alert("Failed to delete certification. Please try again.");
    }
  };


  const addSpice = () => {
  if (!spiceInput.trim() || !editingOrigin) return;

  if (!editingOrigin.spices?.includes(spiceInput.trim())) {
    setEditingOrigin({
      ...editingOrigin,
      spices: [...(editingOrigin.spices || []), spiceInput.trim()],
    });
  }

  setSpiceInput("");
};

const removeSpice = (spice: string) => {
  if (!editingOrigin) return;

  setEditingOrigin({
    ...editingOrigin,
    spices: editingOrigin.spices.filter(s => s !== spice),
  });
};



/* ===============================
   TESTIMONIAL CRUD
================================ */

const handleSaveTestimonial = async () => {
  if (!editingTestimonial) return;

  try {
    let updated;

    if (editingTestimonial.id) {
      updated = await testimonialsApi.update(
        editingTestimonial.id,
        editingTestimonial
      );

      setTestimonials((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } else {
      const { id, ...data } = editingTestimonial;
      updated = await testimonialsApi.create(data);
      setTestimonials((prev) => [...prev, updated]);
    }

    setEditingTestimonial(null);
  } catch (err) {
    console.error(err);
    alert("Failed to save testimonial");
  }
};

const handleDeleteTestimonial = async (id: string) => {
  try {
    await testimonialsApi.delete(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  } catch (err) {
    console.error(err);
    alert("Failed to delete testimonial");
  }
};



  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Homepage Content Management</h1>
          <Button onClick={loadData} variant="outline">
            Refresh Data
          </Button>
        </div>

        {/* Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Page Sections</CardTitle>
            <CardDescription>Edit main content sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section) => {
                const data = getSectionData(section.id);
                return (
                  <div key={section.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {data?.title || "No content yet"}
                        </p>
                        {sectionFieldConfig[section.id]?.badge && data?.badge && (
                          <p className="text-xs text-blue-600 mt-1">
                            Badge: {data.badge}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() =>
                          setEditingSection({
                            section: section.id,
                            title: data?.title || "",
                            badge: data?.badge || "",
                            subtitle: data?.subtitle || "",
                            content: data?.content || "",
                            image: data?.image || "",
                            button_text: data?.button_text || "",
                            button_link: data?.button_link || "",
                          })
                        }
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        {/* Stats - FIXED: Remove id field for new items */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Hero Stats</CardTitle>
              <CardDescription>
                Numbers displayed in hero section
              </CardDescription>
            </div>

            <Button
              onClick={() =>
                setEditingStat({
                  value: "",
                  label: "",
                  suffix: "+",
                  sort_order: stats.length + 1,
                } as any)
              }
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Stat
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {stats
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((stat, index) => (
                  <div
                    key={stat.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleReorder("stat", stat.id, "up")
                          }
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleReorder("stat", stat.id, "down")
                          }
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>

                      <div>
                        <p className="font-semibold text-lg">
                          {stat.value}{stat.icon}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingStat(stat)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteStat(stat.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>


        {/* Features - FIXED: Remove id field for new items */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Features</CardTitle>
              <CardDescription>Why Firehawk feature cards</CardDescription>
            </div>
            <Button onClick={() => setEditingFeature({
              // REMOVED id field for new items
              title: "",
              description: "",
              icon: "Leaf",
              sort_order: features.length + 1,
            })}>
              <Plus className="w-4 h-4 mr-1" />
              Add Feature
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((feature, index) => (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder('feature', feature.id, 'up')}
                          // disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder('feature', feature.id, 'down')}
                          // disabled={index === features.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <Badge variant="outline">{feature.icon}</Badge>
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingFeature(feature)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteFeature(feature.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Journey Steps - FIXED: Remove id field for new items */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Journey Steps</CardTitle>
              <CardDescription>Farm → Processing → Packaging → Export</CardDescription>
            </div>
            <Button onClick={() => setEditingJourney({
              title: "",
              description: "",
              icon: "Leaf",
              image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400", // Always include default image
              sort_order: journey.length + 1,
            })}>
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {journey
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder('journey', step.id, 'up')}
                          // disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder('journey', step.id, 'down')}
                          // disabled={index === journey.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{step.icon}</Badge>
                          <p className="font-medium">{step.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingJourney({
                          ...step,
                          imageFile: undefined,
                        })}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteJourney(step.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Origins - FIXED: Remove id field for new items */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Origins</CardTitle>
              <CardDescription>Kerala / Karnataka sourcing regions</CardDescription>
            </div>
            <Button onClick={() => setEditingOrigin({
              // REMOVED id field for new items
              name: "",
              region: "",
              description: "",
              spices: [],
              sort_order: origins.length + 1,
            })}>
              <Plus className="w-4 h-4 mr-1" />
              Add Origin
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {origins
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((origin, index) => (
                  <div
                    key={origin.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => origin.id && handleReorder('origin', origin.id, 'up')}
                          // disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder('origin', origin.id, 'down')}
                          // disabled={index === origins.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{origin.name}</p>
                          <Badge variant="outline">{origin.region}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {origin.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {origin.spices.map((spice, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {spice}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingOrigin(origin)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => origin.id && handleDeleteOrigin(origin.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications - FIXED: Remove id field for new items */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Quality standards and certifications</CardDescription>
            </div>
            <Button onClick={() => setEditingCert({
              // REMOVED id field for new items
              name: "",
              sort_order: certifications.length + 1,
            })}>
              <Plus className="w-4 h-4 mr-1" />
              Add Certification
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {certifications
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((cert, index) => (
                  <div
                    key={cert.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            cert.id && handleReorder('certification', cert.id, 'up')
                          }
                          // disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            cert.id && handleReorder('certification', cert.id, 'down')
                          }
                          // disabled={index === certifications.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-medium">{cert.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingCert(cert)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCertification(cert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* ===============================
          TESTIMONIALS
        ================================ */}

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>
                Customer feedback and reviews
              </CardDescription>
            </div>

            <Button
              onClick={() =>
                setEditingTestimonial({
                  name: "",
                  company: "",
                  country: "",
                  content: "",
                  rating: 5,
                  is_featured: false,
                })
              }
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Testimonial
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between border rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.company} • {t.country}
                    </p>
                    <p className="text-sm mt-1">{t.content}</p>
                    <Badge className="mt-2">⭐ {t.rating}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingTestimonial(t)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTestimonial(t.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Edit Modals */}
        {/* Section Edit Modal */}
        {editingSection && (() => {
          const config = sectionFieldConfig[editingSection.section];

          return (
            <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit {editingSection.section} Section</DialogTitle>
                <DialogDescription>
                  Update the content for this homepage section
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {config?.title && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Title</p>
                  <Input
                    placeholder="Title"
                    value={editingSection.title || ""}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, title: e.target.value })
                    }
                  />
                </div>
                )}
                
                {/* Only show badge field for hero and cta sections */}
                {config?.badge && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Badge</p>
                    <Input
                      placeholder="Small label above title (e.g. Premium Spice Exporters)"
                      value={editingSection.badge || ""}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          badge: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                
                {config?.subtitle && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Subtitle</p>
                    <Input
                      placeholder="Subtitle"
                      value={editingSection.subtitle || ""}
                      onChange={(e) =>
                        setEditingSection({ ...editingSection, subtitle: e.target.value })
                      }
                    />
                  </div>
                )}

                {config?.content && ( 
                <div className="space-y-2">
                  <p className="text-sm font-medium">Content</p>
                  <Textarea
                    placeholder="Content"
                    value={editingSection.content || ""}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, content: e.target.value })
                    }
                  />
                </div>
                )}

                {config?.button && (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Button Text</p>
                      <Input
                        value={editingSection.button_text || ""}
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            button_text: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Button Link</p>
                      <Input
                        value={editingSection.button_link || ""}
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            button_link: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}


                {config?.image && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Section Image</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          imageFile: e.target.files?.[0],
                        })
                      }
                    />
                  </div>
                )}
                {config?.image && editingSection.image && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-2">Current Image:</p>
                    <img
                      src={editingSection.image}
                      className="w-full h-40 object-cover rounded"
                      alt="Current"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" onClick={() => setEditingSection(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSection}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
            );
        })()}
        {/* StatsEdit Modal */}
        {editingStat && (
          <Dialog open onOpenChange={() => setEditingStat(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingStat.id ? "Edit" : "Add"} Stat
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Value (15)"
                  value={editingStat.value}
                  onChange={(e) =>
                    setEditingStat({
                      ...editingStat,
                      value: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Label (Export Countries)"
                  value={editingStat.label}
                  onChange={(e) =>
                    setEditingStat({
                      ...editingStat,
                      label: e.target.value,
                    })
                  }
                />

                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setEditingStat(null)}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={async () => {
                      if (editingStat.id) {
                        await homepageApi.updateStat(
                          editingStat.id,
                          editingStat
                        );
                      } else {
                        await homepageApi.createStat({
                          value: editingStat.value,
                          label: editingStat.label,
                          page: "home", 
                        });
                      }

                      await loadData();
                      setEditingStat(null);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Feature Edit Modal */}
        {editingFeature && (
          <Dialog open={!!editingFeature} onOpenChange={() => setEditingFeature(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingFeature.id ? "Edit" : "Add"} Feature
                </DialogTitle>
                <DialogDescription>
                  {editingFeature.id ? "Update" : "Add new"} feature card
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Title</p>
                  <Input
                    placeholder="Title"
                    value={editingFeature.title}
                    onChange={(e) =>
                      setEditingFeature({ ...editingFeature, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Description</p>
                  <Textarea
                    placeholder="Description"
                    value={editingFeature.description}
                    onChange={(e) =>
                      setEditingFeature({ ...editingFeature, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Icon</p>
                  <Select
                    value={editingFeature.icon}
                    onValueChange={(value: IconType) =>
                      setEditingFeature({ ...editingFeature, icon: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" onClick={() => setEditingFeature(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveFeature}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Journey Edit Modal */}
        {editingJourney && (
          <Dialog open={!!editingJourney} onOpenChange={() => setEditingJourney(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingJourney.id ? "Edit" : "Add"} Journey Step
                </DialogTitle>
                <DialogDescription>
                  {editingJourney.id ? "Update" : "Add new"} journey step
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Title</p>
                  <Input
                    placeholder="Title"
                    value={editingJourney.title}
                    onChange={(e) =>
                      setEditingJourney({ ...editingJourney, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Description</p>
                  <Textarea
                    placeholder="Description"
                    value={editingJourney.description}
                    onChange={(e) =>
                      setEditingJourney({ ...editingJourney, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Icon</p>
                  <Select
                    value={editingJourney.icon}
                    onValueChange={(value: IconType) =>
                      setEditingJourney({ ...editingJourney, icon: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Step Image</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditingJourney({
                        ...editingJourney,
                        imageFile: e.target.files?.[0],
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 400x300px. Leave empty to keep current image.
                  </p>
                </div>
                {editingJourney.image && !editingJourney.imageFile && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-2">Current Image:</p>
                    <img
                      src={editingJourney.image}
                      className="w-full h-32 object-cover rounded"
                      alt="Current"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" onClick={() => setEditingJourney(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveJourney}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Origin Edit Modal */}
        {editingOrigin && (
          <Dialog open={!!editingOrigin} onOpenChange={() => setEditingOrigin(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingOrigin.id ? "Edit" : "Add"} Origin
                </DialogTitle>
                <DialogDescription>
                  {editingOrigin.id ? "Update" : "Add new"} spice origin region
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Name</p>
                  <Input
                    placeholder="Name (e.g., Kerala)"
                    value={editingOrigin.name}
                    onChange={(e) =>
                      setEditingOrigin({ ...editingOrigin, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Region</p>
                  <Input
                    placeholder="Region (e.g., Malabar Coast)"
                    value={editingOrigin.region}
                    onChange={(e) =>
                      setEditingOrigin({ ...editingOrigin, region: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Description</p>
                  <Textarea
                    placeholder="Description"
                    value={editingOrigin.description}
                    onChange={(e) =>
                      setEditingOrigin({ ...editingOrigin, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Spices</p>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type spice and press Enter"
                      value={spiceInput}
                      onChange={(e) => setSpiceInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSpice();
                        }
                      }}
                    />
                    <Button type="button" onClick={addSpice}>
                      Add
                    </Button>
                  </div>

                  {/* Added spices */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingOrigin.spices?.map((spice) => (
                      <Badge
                        key={spice}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        {spice}
                        <button
                          type="button"
                          onClick={() => removeSpice(spice)}
                          className="ml-1 text-xs"
                        >
                          ✕
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" onClick={() => setEditingOrigin(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveOrigin}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Certification Edit Modal */}
        {editingCert && (
          <Dialog open={!!editingCert} onOpenChange={() => setEditingCert(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCert.id ? "Edit" : "Add"} Certification
                </DialogTitle>
                <DialogDescription>
                  {editingCert.id ? "Update" : "Add new"} certification
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Certification Name</p>
                  <Input
                    placeholder="Certification Name"
                    value={editingCert.name}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="ghost" onClick={() => setEditingCert(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCertification}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Testimonial Edit Modal */}
        {editingTestimonial && (
          <Dialog
            open={!!editingTestimonial}
            onOpenChange={() => setEditingTestimonial(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial.id ? "Edit" : "Add"} Testimonial
                </DialogTitle>
                <DialogDescription>
                  Customer testimonial details
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={editingTestimonial.name}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      name: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Company"
                  value={editingTestimonial.company || ""}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      company: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Country"
                  value={editingTestimonial.country || ""}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      country: e.target.value,
                    })
                  }
                />

                <Textarea
                  placeholder="Testimonial content"
                  value={editingTestimonial.content}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      content: e.target.value,
                    })
                  }
                />

                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={editingTestimonial.rating}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      rating: Number(e.target.value),
                    })
                  }
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setEditingTestimonial(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTestimonial}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}


      </div>
    </AdminLayout>
  );
}