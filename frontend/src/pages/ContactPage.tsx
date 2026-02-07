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

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await contentApi.getContact();
        setContactInfo(info);
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

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-ember/20 via-saffron/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/20 border border-saffron/30 mb-6">
            <Flame className="w-4 h-4 text-saffron" />
            <span className="text-sm font-medium text-saffron">Get in Touch</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact <span className="text-gradient-fire">Us</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have questions about our spices or interested in bulk orders? We'd love to hear from you.
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
                Whether you're looking for bulk spice orders, custom packaging, or want to become a distributor, our team is here to help.
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

              {/* Map Placeholder */}
              <div className="mt-10 aspect-video bg-white rounded-3xl overflow-hidden shadow-soft border border-border/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251483.6296414088!2d76.1333!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5f3f59b!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Firehawk Location"
                />
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
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl h-12"
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
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your requirements, preferred products, order quantity, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="rounded-xl resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="fire"
                  size="xl"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
