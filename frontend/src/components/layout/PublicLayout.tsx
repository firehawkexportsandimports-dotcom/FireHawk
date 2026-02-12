import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface PublicLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-charcoal text-white/80 text-sm py-2.5">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+914842345678" className="flex items-center gap-2 hover:text-saffron transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+91 484 2345678</span>
            </a>
            <a href="mailto:exports@firehawkspices.com" className="flex items-center gap-2 hover:text-saffron transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">exports@firehawkspices.com</span>
            </a>
          </div>
          <div className="text-white/50">
            <span className="hidden md:inline">Premium Spices from Kerala & Karnataka</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-warm-beige/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            {/* Logo - Company Image */}
            <Link to="/" className="flex items-center group">
              <img 
                src="https://res.cloudinary.com/dxziofxst/image/upload/v1770913924/Frame_1597882146_nckozm.png"
                alt="Firehawk Imports and Exports"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors relative py-2',
                    location.pathname === item.href
                      ? 'text-ember'
                      : 'text-muted-foreground hover:text-ember',
                    'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-ember after:to-saffron after:scale-x-0 after:transition-transform after:duration-300',
                    location.pathname === item.href && 'after:scale-x-100'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="fire">
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-warm-beige">
                <div className="flex flex-col gap-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors',
                        location.pathname === item.href
                          ? 'text-ember'
                          : 'text-foreground hover:text-ember'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button asChild variant="fire" className="mt-4">
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white/80 relative overflow-hidden">
        {/* Fire glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-ember/10 rounded-full blur-[100px]" />
        
        <div className="container py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand - Footer Logo */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <img 
                  src="https://res.cloudinary.com/dxziofxst/image/upload/v1770913924/Frame_1597882146_nckozm.png"
                  alt="Firehawk Imports and Exports"
                  className="h-12 w-auto object-contain brightness-0 invert" // Makes logo white for dark footer
                />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium spice exporters bringing the authentic flavors of Kerala and Karnataka to the world since 1998.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-lg text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-white/60 hover:text-saffron transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-display font-semibold text-lg text-white mb-4">Our Spices</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Black Pepper</li>
                <li>Green Cardamom</li>
                <li>Ceylon Cinnamon</li>
                <li>Turmeric</li>
                <li>Spice Blends</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-lg text-white mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>123 Spice Trade Center, MG Road</li>
                <li>Kochi, Kerala 682001, India</li>
                <li className="pt-2">
                  <a href="tel:+914842345678" className="hover:text-saffron transition-colors">
                    +91 484 2345678
                  </a>
                </li>
                <li>
                  <a href="mailto:exports@firehawkspices.com" className="hover:text-saffron transition-colors">
                    exports@firehawkspices.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Firehawk Imports and Exports. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-saffron transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-saffron transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}