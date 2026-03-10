import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Scroll-aware header shadow/blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ── Top bar ── */}
      <div className="bg-charcoal text-white/70 text-xs py-2 hidden sm:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="tel:+914842345678"
              className="flex items-center gap-1.5 hover:text-saffron transition-colors"
            >
              <Phone className="w-3 h-3" />
              +91 484 2345678
            </a>
            <a
              href="mailto:exports@firehawkspices.com"
              className="flex items-center gap-1.5 hover:text-saffron transition-colors"
            >
              <Mail className="w-3 h-3" />
              exports@firehawkspices.com
            </a>
          </div>
          <span className="text-white/40 text-[11px] tracking-wide uppercase">
            Premium Spices · Kerala &amp; Karnataka
          </span>
        </div>
      </div>

      {/* ── Sticky header ── */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-warm-beige/95 backdrop-blur-md border-b transition-all duration-300',
          scrolled
            ? 'border-border/60 shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : 'border-transparent shadow-none'
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded">
              <img
                src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
                alt="Firehawk Imports and Exports"
                className="h-12 w-auto object-contain"
                loading="eager"
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 group',
                      active
                        ? 'text-ember'
                        : 'text-muted-foreground hover:text-ember hover:bg-ember/5'
                    )}
                  >
                    {item.name}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        'absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-ember to-saffron transition-transform duration-300 origin-left',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild variant="fire" size="sm" className="font-medium">
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-ember/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-warm-beige shadow-2xl md:hidden',
          'flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-border/40">
          <img
            src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
            alt="Firehawk"
            className="h-10 w-auto object-contain"
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-ember/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 pt-4 gap-1 flex-1">
          {navigation.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center justify-between px-4 py-3.5 rounded-lg text-base font-medium transition-colors',
                  active
                    ? 'bg-ember/10 text-ember'
                    : 'text-foreground hover:bg-ember/5 hover:text-ember'
                )}
              >
                {item.name}
                <ChevronRight className={cn('w-4 h-4 opacity-40', active && 'opacity-100')} />
              </Link>
            );
          })}

          <div className="mt-4 px-4">
            <Button asChild variant="fire" className="w-full font-medium">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>
        </nav>

        {/* Panel footer */}
        <div className="px-6 py-5 border-t border-border/40 text-xs text-muted-foreground space-y-2">
          <a href="tel:+914842345678" className="flex items-center gap-2 hover:text-ember transition-colors">
            <Phone className="w-3.5 h-3.5" /> +91 484 2345678
          </a>
          <a href="mailto:exports@firehawkspices.com" className="flex items-center gap-2 hover:text-ember transition-colors">
            <Mail className="w-3.5 h-3.5" /> exports@firehawkspices.com
          </a>
        </div>
      </div>
    </>
  );
}