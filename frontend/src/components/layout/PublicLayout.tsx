import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar'; // adjust path if needed

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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4 inline-block bg-warm-beige/95 rounded-xl px-4 py-2.5 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
                <img
                  src="https://res.cloudinary.com/ddmqz9gk0/image/upload/v1773163189/LOGO_1_veo5dy.png"
                  alt="Firehawk Imports and Exports"
                  className="h-12 lg:h-16 w-auto object-contain"
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