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
import { Edit, Image, Type, Save, X } from "lucide-react";
import { homepageApi } from "@/services/api";
import {
  HomepageContent,
  HomepageEditForm,
  HomepageSection,
} from "@/types";

/* =========================================
   HOMEPAGE SECTIONS
========================================= */

const sections: {
  id: HomepageSection;
  title: string;
  icon: any;
}[] = [
  { id: "hero", title: "Hero Section", icon: Image },
  { id: "intro", title: "Introduction", icon: Type },
  { id: "quality", title: "Quality Section", icon: Type },
  { id: "why_choose", title: "Why Choose Us", icon: Type },
  { id: "cta", title: "CTA Section", icon: Type },
];

export default function AdminHomepage() {
  const [content, setContent] = useState<HomepageContent[]>([]);
  const [editing, setEditing] = useState<HomepageEditForm | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================================
     LOAD HOMEPAGE CONTENT
  ========================================= */

  useEffect(() => {
    async function load() {
      try {
        const data = await homepageApi.getAll();
        setContent(data);
      } catch (err) {
        console.error("Homepage fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* =========================================
     GET EXISTING SECTION DATA
  ========================================= */

  const getSectionData = (section: HomepageSection) =>
    content.find((c) => c.section === section);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSave = async () => {
    if (!editing) return;

    try {
      const formData = new FormData();

      formData.append("title", editing.title || "");
      formData.append("subtitle", editing.subtitle || "");
      formData.append("content", editing.content || "");
      formData.append("button_text", editing.button_text || "");
      formData.append("button_link", editing.button_link || "");

      if (editing.imageFile) {
        formData.append("image", editing.imageFile);
      }

      const updated = await homepageApi.update(
        editing.section,
        formData
      );

      // update local state
      setContent((prev) => {
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

      setEditing(null);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Homepage Content
        </h1>

        {/* SECTION CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const data = getSectionData(section.id);

            return (
              <Card key={section.id}>
                <CardHeader className="flex flex-row justify-between">
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>
                      Edit homepage content
                    </CardDescription>
                  </div>

                  <Button
                    variant="outline"
                    disabled={loading}
                    onClick={() =>
                      setEditing({
                        section: section.id,
                        title: data?.title ?? "",
                        subtitle: data?.subtitle ?? "",
                        content: data?.content ?? "",
                        image: data?.image ?? "",
                        button_text: data?.button_text ?? "",
                        button_link: data?.button_link ?? "",
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

        {/* =========================================
           EDIT MODAL
        ========================================= */}

        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-xl space-y-4">
              <h2 className="text-lg font-semibold">
                Edit {editing.section}
              </h2>

              <Input
                placeholder="Title"
                value={editing.title || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                  })
                }
              />

              <Input
                placeholder="Subtitle"
                value={editing.subtitle || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    subtitle: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Content"
                value={editing.content || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    content: e.target.value,
                  })
                }
              />

              {/* IMAGE UPLOAD */}
              <Input
                type="file"
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    imageFile: e.target.files?.[0],
                  })
                }
              />

              {/* OLD IMAGE PREVIEW */}
              {editing.image && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Current Image
                  </p>
                  <img
                    src={editing.image}
                    alt="Current"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setEditing(null)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>

                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
