import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Star,
  Globe,
  Image as ImageIcon,
  X,
  MoveUp,
  MoveDown,
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
import { Product, Category, ProductImage } from "@/types";

// Local type to track main image separately
interface LocalImage {
  file: File;
  preview: string;
  id?: string; // For existing images
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<LocalImage[]>([]);
  
  // Track main image separately - can be either existing image ID or new image index
  const [mainImageId, setMainImageId] = useState<string | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  
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
    setExistingImages([]);
    setNewImages([]);
    setImagesToDelete([]);
    setMainImageId(null);
    setMainImageIndex(null);
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

    // Set existing images
    setExistingImages(product.images || []);
    setNewImages([]);
    setImagesToDelete([]);
    
    // Find the primary image from existing images (using is_primary)
    const primaryImage = product.images?.find(img => img.is_primary);
    if (primaryImage) {
      setMainImageId(primaryImage.id);
    } else if (product.images && product.images.length > 0) {
      // If no primary image is set, use the first image as primary
      setMainImageId(product.images[0].id);
    } else {
      setMainImageId(null);
    }
    setMainImageIndex(null);
    
    setOpen(true);
  };

  /* ================= IMAGE MANAGEMENT ================= */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newLocalImages: LocalImage[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...newLocalImages]);
    
    // If this is the first image overall and no primary is set, make it primary
    if (existingImages.length === 0 && newImages.length === 0 && mainImageId === null && mainImageIndex === null) {
      setMainImageIndex(0);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview); // Clean up preview URL
      updated.splice(index, 1);
      return updated;
    });

    // Update primary image index if needed
    if (mainImageIndex === index) {
      // If the removed image was the primary, set first available as primary
      if (newImages.length > 1) {
        setMainImageIndex(0);
      } else if (existingImages.length > 0) {
        setMainImageIndex(null);
        setMainImageId(existingImages[0].id);
      } else {
        setMainImageIndex(null);
      }
    } else if (mainImageIndex !== null && mainImageIndex > index) {
      // Adjust index if primary image was after the removed one
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const setExistingAsPrimary = (imageId: string) => {
    setMainImageId(imageId);
    setMainImageIndex(null);
    
    // Update the existing images to reflect the new primary image
    setExistingImages(prev => 
      prev.map(img => ({
        ...img,
        is_primary: img.id === imageId
      }))
    );
  };

  const setNewAsPrimary = (index: number) => {
    setMainImageIndex(index);
    setMainImageId(null);
  };

  const deleteExistingImage = (imageId: string) => {
    if (confirm("Remove this image?")) {
      setImagesToDelete((prev) => [...prev, imageId]);
      setExistingImages((prev) => {
        const updated = prev.filter((img) => img.id !== imageId);
        
        // Update primary image if needed
        if (mainImageId === imageId) {
          if (updated.length > 0) {
            // Set the first remaining image as primary
            setMainImageId(updated[0].id);
            // Update is_primary for the new primary image
            setExistingImages(existing => 
              existing.map(img => ({
                ...img,
                is_primary: img.id === updated[0].id
              }))
            );
          } else if (newImages.length > 0) {
            setMainImageId(null);
            setMainImageIndex(0);
          } else {
            setMainImageId(null);
          }
        }
        
        return updated;
      });
    }
  };

  const moveNewImage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === newImages.length - 1)
    ) {
      return;
    }

    setNewImages((prev) => {
      const updated = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });

    // Update primary image index if it was moved
    if (mainImageIndex === index) {
      setMainImageIndex(direction === 'up' ? index - 1 : index + 1);
    } else if (mainImageIndex === (direction === 'up' ? index - 1 : index + 1)) {
      setMainImageIndex(index);
    }
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      // Add form fields
      Object.entries(form).forEach(([key, value]) => {
        if (key === "packaging") return;
        fd.append(key, String(value));
      });

      // Add packaging
      form.packaging.forEach((p) => fd.append("packaging", p));

      // Add images to delete
      imagesToDelete.forEach((id) => fd.append("delete_images", id));

      // Prepare existing images data with primary image flag
      const existingImagesData = existingImages.map(img => ({
        id: img.id,
        is_primary: img.id === mainImageId
      }));
      fd.append("existing_images", JSON.stringify(existingImagesData));

      // Add new images
      newImages.forEach((img, index) => {
        fd.append("images", img.file);
        // If this new image is the primary one, mark it
        if (mainImageIndex === index) {
          fd.append("new_primary_image_index", String(index));
        }
      });

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
    if (!confirm("Delete this product?")) return;
    await productsApi.delete(id);
    fetchData();
  };

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      newImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [newImages]);

  /* ================= UI ================= */

  const getPrimaryImage = () => {
    // Check new images first
    if (mainImageIndex !== null && newImages[mainImageIndex]) {
      return newImages[mainImageIndex].preview;
    }

    // Then check existing images
    if (mainImageId) {
      const primaryExisting = existingImages.find(img => img.id === mainImageId);
      if (primaryExisting) return primaryExisting.url;
    }

    // Return first image if no primary is set
    if (existingImages.length > 0) return existingImages[0].url;
    if (newImages.length > 0) return newImages[0].preview;

    return null;
  };

  const isImagePrimary = (imageId?: string, index?: number) => {
    if (imageId && mainImageId === imageId) return true;
    if (index !== undefined && mainImageIndex === index) return true;
    return false;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your spice catalog</p>
          </div>

          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* TABLE */}
        <Card className="rounded-2xl shadow-soft">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((p) => {
                  // Find the primary image for display in the table
                  const primaryImage = p.images?.find(img => img.is_primary) || p.images?.[0];
                  
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {primaryImage ? (
                            <img
                              src={primaryImage.url}
                              alt={p.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}

                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.slug}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{p.origin || "-"}</TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          {p.is_featured && (
                            <Badge>
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {p.is_export_ready && (
                            <Badge variant="secondary">
                              <Globe className="w-3 h-3 mr-1" />
                              Export Ready
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEdit(p)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(p.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {products.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products created yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* PRODUCT DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              {/* Primary Image Preview */}
              {getPrimaryImage() && (
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Primary Image</label>
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-primary">
                    <img
                      src={getPrimaryImage()!}
                      alt="Primary"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Primary
                    </Badge>
                  </div>
                </div>
              )}

              <Input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />

              <Input
                placeholder="Origin"
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
              />

              <Input
                placeholder="Price Range (e.g., $10 - $50)"
                value={form.price_range}
                onChange={(e) =>
                  setForm({ ...form, price_range: e.target.value })
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
                placeholder="Full Description"
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
                className="w-full border rounded-lg p-2 bg-background"
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
                <label className="text-sm font-medium">Packaging Options</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add packaging (e.g., 500g, 1kg)"
                    value={packagingInput}
                    onChange={(e) => setPackagingInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (!packagingInput.trim()) return;
                      setForm({
                        ...form,
                        packaging: [...form.packaging, packagingInput.trim()],
                      });
                      setPackagingInput("");
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {form.packaging.map((p, i) => (
                    <Badge key={i} variant="secondary" className="flex gap-1">
                      {p}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() =>
                          setForm({
                            ...form,
                            packaging: form.packaging.filter((_, idx) => idx !== i),
                          })
                        }
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* EXISTING IMAGES */}
              {existingImages.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Existing Images
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {existingImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt="Product"
                          className={`h-24 w-full rounded-lg object-cover ${
                            isImagePrimary(img.id) ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                        />
                        
                        {/* Image Actions Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                          {!isImagePrimary(img.id) && (
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8"
                              onClick={() => setExistingAsPrimary(img.id)}
                              title="Set as primary image"
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                          {isImagePrimary(img.id) && (
                            <Badge className="bg-primary">Primary</Badge>
                          )}
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => deleteExistingImage(img.id)}
                            title="Delete image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NEW IMAGES */}
              {newImages.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    New Images
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {newImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`New ${index + 1}`}
                          className={`h-24 w-full rounded-lg object-cover ${
                            isImagePrimary(undefined, index) ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                        />
                        
                        {/* Image Actions Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                          {!isImagePrimary(undefined, index) && (
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8"
                              onClick={() => setNewAsPrimary(index)}
                              title="Set as primary image"
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                          {isImagePrimary(undefined, index) && (
                            <Badge className="bg-primary">Primary</Badge>
                          )}
                          
                          {/* Move buttons */}
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            onClick={() => moveNewImage(index, 'up')}
                            disabled={index === 0}
                            title="Move up"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            onClick={() => moveNewImage(index, 'down')}
                            disabled={index === newImages.length - 1}
                            title="Move down"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            onClick={() => removeNewImage(index)}
                            title="Remove image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Add New Images
                </label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can upload multiple images. Click the star icon to set a primary image.
                </p>
              </div>

              {/* FLAGS */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        is_featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_export_ready}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        is_export_ready: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Export Ready</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSubmit} className="flex-1">
                  {editingProduct ? "Update Product" : "Create Product"}
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}