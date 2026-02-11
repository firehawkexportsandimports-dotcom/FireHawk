import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contentApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  Sparkles,
  Save,
  Loader2,
  Eye,
  CheckCircle2
} from "lucide-react";

export default function AdminContactContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [form, setForm] = useState({
    badge: "",
    title: "",
    description: "",
    company_description: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    working_hours: "",
    map_embed: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await contentApi.getContact();
        setForm({
          badge: data.badge || "Contact Us",
          title: data.title || "Get in Touch",
          description: data.description || "",
          company_description: data.company_description || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          phone: data.phone || "",
          email: data.email || "",
          working_hours: data.working_hours || "Mon-Fri: 9:00 AM - 6:00 PM",
          map_embed: data.map_embed || "",
        });
      } catch (err) {
        console.error(err);
        toast({
          title: "Error loading content",
          description: "Failed to load contact page content",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await contentApi.updateContact(formData);

      toast({
        title: "Success!",
        description: "Contact page content has been updated successfully",
        variant: "default",
        action: (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ),
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading contact content...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Contact Page</h1>
            <p className="text-muted-foreground">
              Manage your contact page content and information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {previewMode ? "Edit Mode" : "Preview"}
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gap-2"
              size="lg"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>
                  Navigate through different content sections
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] px-4 pb-4">
                  <div className="space-y-1">
                    <Button
                      variant={activeTab === "hero" ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("hero")}
                    >
                      <Sparkles className="h-4 w-4" />
                      Hero Section
                      {form.badge && <Badge variant="secondary" className="ml-auto">Active</Badge>}
                    </Button>
                    <Button
                      variant={activeTab === "company" ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("company")}
                    >
                      <Building2 className="h-4 w-4" />
                      Company Info
                    </Button>
                    <Button
                      variant={activeTab === "address" ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("address")}
                    >
                      <MapPin className="h-4 w-4" />
                      Address & Location
                    </Button>
                    <Button
                      variant={activeTab === "contact" ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("contact")}
                    >
                      <Phone className="h-4 w-4" />
                      Contact Details
                    </Button>
                    <Button
                      variant={activeTab === "map" ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("map")}
                    >
                      <MapPin className="h-4 w-4" />
                      Google Map
                    </Button>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle>
                  {activeTab === "hero" && "Hero Section Content"}
                  {activeTab === "company" && "Company Information"}
                  {activeTab === "address" && "Address & Location Details"}
                  {activeTab === "contact" && "Contact Details"}
                  {activeTab === "map" && "Google Map Configuration"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "hero" && "Customize the hero section of your contact page"}
                  {activeTab === "company" && "Edit your company description and information"}
                  {activeTab === "address" && "Manage your physical address and location"}
                  {activeTab === "contact" && "Update your contact information"}
                  {activeTab === "map" && "Configure your Google Map embed settings"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero Section */}
                {activeTab === "hero" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="badge" className="text-sm font-medium">
                          Badge Text
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          Optional
                        </Badge>
                      </div>
                      <Input
                        id="badge"
                        value={form.badge}
                        onChange={(e) => handleChange("badge", e.target.value)}
                        placeholder="e.g., Contact Us, Get in Touch"
                        className="max-w-md"
                      />
                      <p className="text-xs text-muted-foreground">
                        Small label displayed above the main title
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Page Title
                      </Label>
                      <Input
                        id="title"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Enter page title"
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Enter a brief description for the hero section"
                        rows={4}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended: 2-3 sentences summarizing your contact page
                      </p>
                    </div>
                  </div>
                )}

                {/* Company Information */}
                {activeTab === "company" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="company_description" className="text-sm font-medium">
                        Company Description
                      </Label>
                      <Textarea
                        id="company_description"
                        value={form.company_description}
                        onChange={(e) => handleChange("company_description", e.target.value)}
                        placeholder="Tell visitors about your company..."
                        rows={6}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        This description appears in the about section of your contact page
                      </p>
                    </div>
                  </div>
                )}

                {/* Address & Location */}
                {activeTab === "address" && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium">
                          Street Address
                        </Label>
                        <Input
                          id="address"
                          value={form.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          placeholder="New York"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={form.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        placeholder="United States"
                        className="max-w-md"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Details */}
                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="contact@example.com"
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="working_hours" className="text-sm font-medium">
                        Working Hours
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="working_hours"
                          value={form.working_hours}
                          onChange={(e) => handleChange("working_hours", e.target.value)}
                          placeholder="Mon-Fri: 9:00 AM - 6:00 PM"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Google Map */}
                {activeTab === "map" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="map_embed" className="text-sm font-medium">
                        Google Maps Embed URL
                      </Label>
                      <Textarea
                        id="map_embed"
                        value={form.map_embed}
                        onChange={(e) => handleChange("map_embed", e.target.value)}
                        placeholder="Paste your Google Maps embed URL here..."
                        rows={4}
                        className="font-mono text-sm"
                      />
                      <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                          Get your embed URL from Google Maps: Search for your location, 
                          click "Share", then "Embed a map", and copy the iframe src URL.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview Card */}
            {previewMode && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-card p-6">
                    <div className="space-y-4">
                      <Badge variant="secondary">{form.badge}</Badge>
                      <h2 className="text-2xl font-bold">{form.title}</h2>
                      <p className="text-muted-foreground">{form.description}</p>
                      
                      <div className="grid gap-4 pt-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-sm text-muted-foreground">
                              {form.address}, {form.city}, {form.country}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{form.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{form.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Working Hours</p>
                            <p className="text-sm text-muted-foreground">{form.working_hours}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}