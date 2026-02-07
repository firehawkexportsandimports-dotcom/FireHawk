import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, FolderTree, MessageSquare, Star, TrendingUp, ArrowUpRight, Flame } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboardApi } from '@/services/api';
import { DashboardStats } from '@/types';
import { cn } from '@/lib/utils';

const statCards = [
  { key: 'total_products', label: 'Total Products', icon: Package, color: 'from-ember to-burnt-orange' },
  { key: 'total_categories', label: 'Categories', icon: FolderTree, color: 'from-saffron to-gold' },
  { key: 'total_enquiries', label: 'Total Enquiries', icon: MessageSquare, color: 'from-charcoal to-charcoal-light' },
  { key: 'featured_products', label: 'Featured Products', icon: Star, color: 'from-burnt-orange to-saffron' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await dashboardApi.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your spice business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.key} className="border-border/30 shadow-soft bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-4xl font-display font-bold text-foreground mt-1">
                      {loading ? '—' : (stat.key === 'total_products' ? stats?.total_products : stat.key === 'total_categories' ? stats?.total_categories : stat.key === 'total_enquiries' ? stats?.total_enquiries : stats?.featured_products) || 0}
                    </p>
                  </div>
                  <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-md', stat.color)}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Enquiries & Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border/30 shadow-soft bg-white rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl">Recent Enquiries</CardTitle>
                <CardDescription>Latest product and general enquiries</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link to="/admin/messages">
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-sand rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : stats?.recent_enquiries && stats.recent_enquiries.length > 0 ? (
                <div className="space-y-3">
                  {stats.recent_enquiries.slice(0, 5).map((enquiry) => (
                    <div 
                      key={enquiry.id} 
                      className="flex items-start gap-4 p-4 rounded-xl bg-sand hover:bg-sand/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember to-saffron flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">
                          {enquiry.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">{enquiry.name}</p>
                          {enquiry.status === 'unread' && (
                            <Badge className="bg-ember text-white text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {enquiry.type === 'product' && enquiry.product 
                            ? `Re: ${enquiry.product.name}`
                            : enquiry.message.slice(0, 50) + '...'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No enquiries yet</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/30 shadow-soft bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
              <CardDescription>Manage your spice business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/admin/products"
                  className="p-5 rounded-2xl bg-sand hover:bg-sand/80 transition-colors text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-ember to-burnt-orange flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-foreground">Add Product</p>
                </Link>
                <Link 
                  to="/admin/categories"
                  className="p-5 rounded-2xl bg-sand hover:bg-sand/80 transition-colors text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <FolderTree className="w-6 h-6 text-charcoal" />
                  </div>
                  <p className="font-medium text-foreground">Manage Categories</p>
                </Link>
                <Link 
                  to="/admin/homepage"
                  className="p-5 rounded-2xl bg-sand hover:bg-sand/80 transition-colors text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-burnt-orange to-saffron flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-foreground">Edit Homepage</p>
                </Link>
                <Link 
                  to="/admin/messages"
                  className="p-5 rounded-2xl bg-sand hover:bg-sand/80 transition-colors text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-charcoal flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-foreground">View Messages</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unread Count Alert */}
        {stats?.unread_enquiries && stats.unread_enquiries > 0 && (
          <Card className="border-ember/30 bg-ember/5 rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ember to-saffron flex items-center justify-center shadow-md">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    You have {stats.unread_enquiries} unread {stats.unread_enquiries === 1 ? 'enquiry' : 'enquiries'}
                  </p>
                  <p className="text-sm text-muted-foreground">Respond promptly to build customer trust</p>
                </div>
              </div>
              <Button asChild variant="ember">
                <Link to="/admin/messages">View Now</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
