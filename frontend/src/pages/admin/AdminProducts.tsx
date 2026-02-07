import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Star,
  Globe,
  Image as ImageIcon,
  X,
} from "lucide-react";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { productsApi, categoriesApi } from "@/services/api";
import { Product, Category } from "@/types";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const [packagingInput, setPackagingInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    short_description: "",
    origin: "",
    category_id: "",
    packaging: [] as string[],
    price_range: "",
    is_featured: false,
    is_export_ready: true,
  });

  /* ================= FETCH ================= */

  const fetchData = async () => {
    const [prods, cats] = await Promise.all([
      productsApi.getAll(),
      categoriesApi.getAll(),
    ]);
    setProducts(prods);
    setCategories(cats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= OPEN CREATE ================= */

  const openCreate = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      short_description: "",
      origin: "",
      category_id: "",
      packaging: [],
      price_range: "",
      is_featured: false,
      is_export_ready: true,
    });
    setImages([]);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */

  const openEdit = (product: Product) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      short_description: product.short_description || "",
      origin: product.origin || "",
      category_id: product.category_id || "",
      packaging: product.packaging || [],
      price_range: product.price_range || "",
      is_featured: product.is_featured,
      is_export_ready: product.is_export_ready,
    });

    setImages([]);
    setOpen(true);
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "packaging") return;
        fd.append(key, String(value));
      });

      form.packaging.forEach((p) =>
        fd.append("packaging", p)
      );

      images.forEach((img) =>
        fd.append("images", img)
      );

      if (editingProduct) {
        await productsApi.update(editingProduct.id, fd);
      } else {
        await productsApi.create(fd);
      }

      setOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return;
    await productsApi.delete(id);
    fetchData();
  };

  /* ================= UI ================= */

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.origin}</TableCell>

                    <TableCell className="flex gap-2">
                      {p.is_featured && (
                        <Badge>
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {p.is_export_ready && (
                        <Badge>
                          <Globe className="w-3 h-3 mr-1" />
                          Export
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => openEdit(p)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct
                  ? "Edit Product"
                  : "Add Product"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5">

              {/* BASIC */}
              <Input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                placeholder="Slug"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
              />

              <Textarea
                placeholder="Short Description"
                value={form.short_description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    short_description: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

              {/* CATEGORY */}
              <select
                className="w-full border rounded-lg p-2"
                value={form.category_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category_id: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* PACKAGING */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add packaging"
                    value={packagingInput}
                    onChange={(e) =>
                      setPackagingInput(e.target.value)
                    }
                  />
                  <Button
                    onClick={() => {
                      if (!packagingInput) return;
                      setForm({
                        ...form,
                        packaging: [
                          ...form.packaging,
                          packagingInput,
                        ],
                      });
                      setPackagingInput("");
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.packaging.map((p, i) => (
                    <Badge key={i} className="flex gap-1">
                      {p}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          setForm({
                            ...form,
                            packaging:
                              form.packaging.filter(
                                (_, idx) => idx !== i
                              ),
                          })
                        }
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* EXISTING IMAGES */}
              {editingProduct?.images?.length > 0 && (
                <div>
                  <p className="font-medium mb-2">
                    Existing Images
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {editingProduct.images.map((img) => (
                      <img
                        key={img.id}
                        src={img.url}
                        className="h-20 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* NEW IMAGES */}
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setImages(
                    Array.from(e.target.files || [])
                  )
                }
              />

              {/* FLAGS */}
              <div className="flex gap-6">
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        is_featured: e.target.checked,
                      })
                    }
                  />
                  Featured
                </label>

                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_export_ready}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        is_export_ready: e.target.checked,
                      })
                    }
                  />
                  Export Ready
                </label>
              </div>

              <Button onClick={handleSubmit}>
                {editingProduct
                  ? "Update Product"
                  : "Create Product"}
              </Button>

            </div>
          </DialogContent>
        </Dialog>

      </div>
    </AdminLayout>
  );
}
