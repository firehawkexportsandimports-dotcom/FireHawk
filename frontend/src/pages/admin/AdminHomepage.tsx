import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Image, Type } from 'lucide-react';

const sections = [
  {
    id: 'hero',
    title: 'Hero Section',
    description: 'Main banner with headline and call-to-action',
    icon: Image,
  },
  {
    id: 'intro',
    title: 'Introduction',
    description: 'Company introduction and value proposition',
    icon: Type,
  },
  {
    id: 'featured',
    title: 'Featured Products',
    description: 'Showcase your best spices',
    icon: Image,
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'Customer reviews and feedback',
    icon: Type,
  },
  {
    id: 'cta',
    title: 'Call to Action',
    description: 'Contact prompt section',
    icon: Type,
  },
];

export default function AdminHomepage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Homepage Content</h1>
          <p className="text-muted-foreground mt-1">Manage your homepage sections and content</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Card key={section.id} className="border-border/50">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Preview Note */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Image className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Preview Changes</p>
              <p className="text-sm text-muted-foreground">
                Visit the homepage to see how your changes will appear to visitors.
              </p>
            </div>
            <Button variant="outline" className="ml-auto">
              View Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
