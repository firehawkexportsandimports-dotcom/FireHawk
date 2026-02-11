import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Save, Flame } from "lucide-react";

import { productsContentApi } from "@/services/api";

interface ProductsContent {
  section: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
}

export default function AdminProductsContent() {
  const [content, setContent] = useState<ProductsContent[]>([]);
  const [editing, setEditing] =
    useState<ProductsContent | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await productsContentApi.getAll();
    setContent(data);
  };

    const heroContent =
    content.find((c) => c.section === "hero") as
    | ProductsContent
    | undefined;


  const handleSave = async () => {
    if (!editing) return;

    const formData = new FormData();
    formData.append("title", editing.title || "");
    formData.append("subtitle", editing.subtitle || "");
    formData.append("badge", editing.badge || "");
    formData.append("content", editing.content || "");

    const updated =
      await productsContentApi.updateSection(
        "hero",
        formData
      );

    setContent([updated]);
    setEditing(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-display font-bold">
            Products Page Content
          </h1>
          <p className="text-muted-foreground">
            Manage products page hero section
          </p>
        </div>

        {/* HERO CARD */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-ember" />
              <CardTitle>Products Hero Section</CardTitle>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setEditing({
                  section: "hero",
                  title: heroContent.title || "",
                  subtitle: heroContent.subtitle || "",
                  badge: heroContent.badge || "",
                  content: heroContent.content || "",
                })
              }
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardHeader>
        </Card>

        {/* EDIT MODAL */}
        {editing && (
          <Dialog open onOpenChange={() => setEditing(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Products Hero</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Badge"
                  value={editing.badge || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      badge: e.target.value,
                    })
                  }
                />

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
                  rows={4}
                  placeholder="Description"
                  value={editing.content || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      content: e.target.value,
                    })
                  }
                />

                <div className="flex justify-end">
                  <Button onClick={handleSave}>
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
