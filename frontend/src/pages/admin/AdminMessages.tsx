import { useEffect, useState } from 'react';
import { Mail, Package, Eye, Trash2, MoreHorizontal, CheckCheck } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { enquiriesApi } from '@/services/api';
import { Enquiry } from '@/types';
import { cn } from '@/lib/utils';

export default function AdminMessages() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filter, setFilter] = useState<'all' | 'product' | 'general'>('all');

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const data = await enquiriesApi.getAll();
        setEnquiries(data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter(e => 
    filter === 'all' ? true : e.type === filter
  );

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive">Unread</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'replied':
        return <Badge className="bg-cardamom text-white">Replied</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">Product enquiries and contact form submissions</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">
              All Messages ({enquiries.length})
            </TabsTrigger>
            <TabsTrigger value="product">
              Product Enquiries ({enquiries.filter(e => e.type === 'product').length})
            </TabsTrigger>
            <TabsTrigger value="general">
              General ({enquiries.filter(e => e.type === 'general').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={6}>
                            <div className="h-12 bg-muted rounded animate-pulse" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : filteredEnquiries.length > 0 ? (
                      filteredEnquiries.map((enquiry) => (
                        <TableRow 
                          key={enquiry.id}
                          className={cn(enquiry.status === 'unread' && 'bg-primary/5')}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {enquiry.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <p className={cn(
                                  'font-medium',
                                  enquiry.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'
                                )}>
                                  {enquiry.name}
                                </p>
                                <p className="text-xs text-muted-foreground">{enquiry.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {enquiry.type === 'product' ? (
                              <Badge variant="outline" className="text-primary border-primary">
                                <Package className="w-3 h-3 mr-1" />
                                Product
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                <Mail className="w-3 h-3 mr-1" />
                                General
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <p className="text-muted-foreground truncate max-w-[200px]">
                              {enquiry.type === 'product' && enquiry.product
                                ? `Re: ${enquiry.product.name}`
                                : enquiry.message.slice(0, 50) + '...'}
                            </p>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(enquiry.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedEnquiry(enquiry)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCheck className="w-4 h-4 mr-2" />
                                  Mark as Read
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No messages found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Message Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Message Details</DialogTitle>
            <DialogDescription>
              From {selectedEnquiry?.name} on {selectedEnquiry && new Date(selectedEnquiry.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedEnquiry.email}</p>
                </div>
                {selectedEnquiry.phone && (
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedEnquiry.phone}</p>
                  </div>
                )}
                {selectedEnquiry.company && (
                  <div>
                    <p className="text-muted-foreground">Company</p>
                    <p className="font-medium">{selectedEnquiry.company}</p>
                  </div>
                )}
                {selectedEnquiry.product && (
                  <div>
                    <p className="text-muted-foreground">Product</p>
                    <p className="font-medium">{selectedEnquiry.product.name}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Message</p>
                <p className="bg-muted p-4 rounded-lg text-foreground">
                  {selectedEnquiry.message}
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>
                  Close
                </Button>
                <Button className="bg-gradient-hero hover:opacity-90 text-white">
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
