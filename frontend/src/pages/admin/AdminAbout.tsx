import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Image, Type } from 'lucide-react';

const sections = [
  {
    id: 'story',
    title: 'Our Story',
    description: 'Company history and founding story',
    icon: Type,
  },
  {
    id: 'heritage',
    title: 'Kerala & Karnataka Heritage',
    description: 'Regional spice heritage section',
    icon: Image,
  },
  {
    id: 'sourcing',
    title: 'Sourcing & Quality',
    description: 'Quality process and supply chain',
    icon: Type,
  },
  {
    id: 'mission',
    title: 'Mission & Vision',
    description: 'Company mission and vision statements',
    icon: Type,
  },
  {
    id: 'export',
    title: 'Global Presence',
    description: 'Export destinations and capabilities',
    icon: Image,
  },
];

export default function AdminAbout() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">About Page Content</h1>
          <p className="text-muted-foreground mt-1">Manage your company story and information</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Card key={section.id} className="border-border/50">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cardamom flex items-center justify-center">
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
      </div>
    </AdminLayout>
  );
}
