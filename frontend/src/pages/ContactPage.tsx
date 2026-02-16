import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Flame } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { contentApi, enquiriesApi } from '@/services/api';
import { ContactInfo } from '@/types';
import { HighlightText } from '@/components/ui/HighlightText';

export default function ContactPage() {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await contentApi.getContact();
        setContactInfo(info);
        setMapError(false);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await enquiriesApi.create({
        type: 'general',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });
      toast({
        title: 'Message Sent!',
        description: "Thank you for reaching out. We'll respond within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Extract embed URL from various Google Maps formats
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // Handle iframe embed code
    const iframeMatch = url.match(/src="([^"]+)"/);
    if (iframeMatch) return iframeMatch[1];
    
    // Handle direct embed URLs
    if (url.includes('google.com/maps/embed')) return url;
    
    // Handle regular Google Maps URLs
    if (url.includes('google.com/maps')) {
      // Extract coordinates or place ID
      const placeMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      const placeIdMatch = url.match(/place\/([^/?]+)/);
      
      if (placeMatch) {
        const [, lat, lng] = placeMatch;
        // You can add your Google Maps API key in env variables
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (apiKey) {
          return `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=15`;
        }
        // Fallback to basic embed if no API key
        return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1234567890`;
      }
      
      if (placeIdMatch) {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (apiKey) {
          return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeIdMatch[1]}`;
        }
      }
    }
    
    // Assume it's already an embed URL or return as is
    return url;
  };

  const embedUrl = contactInfo?.map_embed ? getEmbedUrl(contactInfo.map_embed) : null;

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Address',
      value: contactInfo ? `${contactInfo.address}\n${contactInfo.city}\n${contactInfo.country}` : '',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo?.phone || '',
      href: `tel:${contactInfo?.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo?.email || '',
      href: `mailto:${contactInfo?.email}`,
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: contactInfo?.working_hours || '',
    },
  ];

  if (loading) {
    return (
      <PublicLayout>
        <div className="py-20 bg-charcoal">
          <div className="container text-center">
            <div className="animate-pulse">
              <div className="h-10 w-48 bg-white/10 rounded-full mx-auto mb-6" />
              <div className="h-16 w-96 bg-white/10 rounded-lg mx-auto mb-6" />
              <div className="h-6 w-72 bg-white/10 rounded mx-auto" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-ember/20 via-saffron/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
            <Flame className="w-4 h-4 text-saffron" />
            <span className="text-sm font-medium text-saffron">{contactInfo?.badge || 'Contact Us'}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <HighlightText
              text={contactInfo?.title || "Contact {Us}"}
            />
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {contactInfo?.description || "Get in touch with our team"}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-warm">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Firehawk Imports and Exports
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                {contactInfo?.company_description || "Get in Touch with Us"}
              </p>

              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ember to-saffron flex items-center justify-center flex-shrink-0 shadow-md">
                      <detail.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a 
                          href={detail.href}
                          className="text-foreground hover:text-ember transition-colors whitespace-pre-line text-lg"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-foreground whitespace-pre-line text-lg">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Map */}
              <div className="mt-10">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-saffron" />
                  Our Location
                </h3>
                <div className="aspect-video bg-white rounded-3xl overflow-hidden shadow-soft border border-border/30">
                  {embedUrl && !mapError ? (
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Firehawk Location"
                      onError={() => setMapError(true)}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 text-center">
                      <MapPin className="w-12 h-12 text-saffron/50 mb-3" />
                      <p className="text-foreground/70 font-medium mb-1">
                        {contactInfo?.address || 'Firehawk Headquarters'}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo?.city && contactInfo?.country 
                          ? `${contactInfo.city}, ${contactInfo.country}`
                          : 'Location map will appear here'}
                      </p>
                      {contactInfo?.address && contactInfo?.city && contactInfo?.country ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${contactInfo.address} ${contactInfo.city} ${contactInfo.country}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 text-sm text-saffron hover:text-ember transition-colors flex items-center gap-1"
                        >
                          <MapPin className="w-4 h-4" />
                          Open in Google Maps
                        </a>
                      ) : (
                        <p className="mt-4 text-sm text-muted-foreground">
                          Add map embed URL in admin panel
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-10 border border-border/30 shadow-medium">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-ember to-saffron flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  Send us a Message
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Your Name <span className="text-saffron">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl h-12 focus:ring-saffron/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-saffron">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl h-12 focus:ring-saffron/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl h-12 focus:ring-saffron/20"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="rounded-xl h-12 focus:ring-saffron/20"
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Your Message <span className="text-saffron">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your requirements, preferred products, order quantity, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="rounded-xl resize-none focus:ring-saffron/20"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="fire"
                  size="xl"
                  className="w-full group"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-saffron hover:text-ember transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}