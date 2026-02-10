import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit, Image, Type, Save, Flame } from "lucide-react";

import { contentApi } from "@/services/api";
import { AboutContent, AboutSection } from "@/types";

/* =====================================================
   SECTION CONFIG
===================================================== */

const sections: {
  id: AboutSection;
  title: string;
  description: string;
  icon: any;
}[] = [
  {
    id: "hero",
    title: "Hero Section",
    description: "About page hero title and description",
    icon: Flame,
  },
  {
    id: "story",
    title: "Our Story",
    description: "Company history and founding story",
    icon: Type,
  },
  {
    id: "heritage",
    title: "Kerala & Karnataka Heritage",
    description: "Regional spice heritage section",
    icon: Image,
  },
  {
    id: "sourcing",
    title: "Sourcing & Quality",
    description: "Quality process and supply chain",
    icon: Type,
  },
  {
    id: "mission",
    title: "Mission",
    description: "Company mission statement",
    icon: Type,
  },
  {
    id: "vision",
    title: "Vision",
    description: "Company vision statement",
    icon: Type,
  },
  {
    id: "export",
    title: "Global Presence",
    description: "Export destinations and capabilities",
    icon: Image,
  },
];

/* =====================================================
   EDIT FORM TYPE
===================================================== */

interface AboutEditForm {
  section: AboutSection;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  image?: string;
  countries?: string[];
  imageFile?: File;
}

/* =====================================================
   COMPONENT
===================================================== */

export default function AdminAbout() {
  const [sectionsData, setSectionsData] = useState<AboutContent[]>([]);
  const [editingSection, setEditingSection] =
    useState<AboutEditForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [countryInput, setCountryInput] = useState("");


  /* ===============================
     LOAD DATA
  =============================== */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await contentApi.getAbout();
      setSectionsData(data || []);
    } catch (err) {
      console.error("About fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSectionData = (section: AboutSection) =>
    sectionsData.find((s) => s.section === section);

  /* ===============================
     SAVE SECTION
  =============================== */

  const handleSaveSection = async () => {
    if (!editingSection) return;

    try {
      const formData = new FormData();
      formData.append("title", editingSection.title || "");
      formData.append("badge", editingSection.badge || "");
      formData.append("subtitle", editingSection.subtitle || "");
      formData.append("content", editingSection.content || "");
      formData.append("countries", JSON.stringify(editingSection.countries || []));



      if (editingSection.imageFile) {
        formData.append("image", editingSection.imageFile);
      }

      const updated = await contentApi.updateAboutSection(
        editingSection.section,
        formData
      );

      setSectionsData((prev) => {
        const exists = prev.find(
          (c) => c.section === updated.section
        );

        if (exists) {
          return prev.map((c) =>
            c.section === updated.section ? updated : c
          );
        }

        return [...prev, updated];
      });

      setEditingSection(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save section");
    }
  };

  /* ===============================
     LOADING STATE
  =============================== */

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  /* ===============================
     UI
  =============================== */

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold">
            About Page Content
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your company story and information
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const data = getSectionData(section.id);

            return (
              <Card key={section.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cardamom flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <CardTitle className="font-display text-lg">
                        {section.title}
                      </CardTitle>
                      <CardDescription>
                        {data?.title || section.description}
                      </CardDescription>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setEditingSection({
                        section: section.id,
                        title: data?.title || "",
                        subtitle: data?.subtitle || "",
                        badge: data?.badge || "",
                        content: data?.content || "",
                        image: data?.image || "",
                        countries: data?.countries || [],
                      })
                    }
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* ===============================
            EDIT MODAL
        =============================== */}
        {editingSection && (
          <Dialog
            open={true}
            onOpenChange={() => setEditingSection(null)}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  Edit {editingSection.section} Section
                </DialogTitle>
                <DialogDescription>
                  Update content for this about section
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Title</p>
                  <Input
                    value={editingSection.title || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        title: e.target.value,
                      })
                    }
                    placeholder="Use {word} for highlight"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Content</p>
                  <Textarea
                    rows={6}
                    value={editingSection.content || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                {/* EXPORT COUNTRIES (ONLY USED FOR EXPORT SECTION) */}
                {editingSection.section === "export" && (
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Export Countries
                    </p>

                    {/* COUNTRY TAGS */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(editingSection.countries || []).map((country, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted border text-sm"
                        >
                          <span>{country}</span>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-red-500"
                            onClick={() =>
                              setEditingSection({
                                ...editingSection,
                                countries: editingSection.countries?.filter(
                                  (_, i) => i !== index
                                ),
                              })
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* INPUT */}
                    <Input
                      placeholder="Type country and press Enter"
                      value={countryInput}
                      onChange={(e) => setCountryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();

                          if (!countryInput.trim()) return;

                          setEditingSection({
                            ...editingSection,
                            countries: [
                              ...(editingSection.countries || []),
                              countryInput.trim(),
                            ],
                          });

                          setCountryInput("");
                        }
                      }}
                    />

                    <p className="text-xs text-muted-foreground mt-1">
                      Press Enter to add country
                    </p>
                  </div>
                )}



                <div>
                  <p className="text-sm font-medium mb-1">Image</p>

                  <Input
                    placeholder="Badge"
                    value={editingSection.badge || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        badge: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Subtitle"
                    value={editingSection.subtitle || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        subtitle: e.target.value,
                      })
                    }
                  />

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

                {(editingSection.image ||
                  editingSection.imageFile) && (
                  <img
                    src={
                      editingSection.imageFile
                        ? URL.createObjectURL(
                            editingSection.imageFile
                          )
                        : editingSection.image
                    }
                    className="w-full h-40 object-cover rounded"
                  />
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setEditingSection(null)}
                  >
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
        )}
      </div>
    </AdminLayout>
  );
}
