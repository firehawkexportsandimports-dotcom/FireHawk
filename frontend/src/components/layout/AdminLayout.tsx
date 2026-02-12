import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  FileText,
  Package,
  FolderTree,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Flame,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { 
    name: 'Content', 
    icon: FileText,
    children: [
        { name: 'Homepage', href: '/admin/homepage' },
        { name: 'About Page', href: '/admin/about' },
        { name: 'Products Page', href: '/admin/products-content' },
        { name: 'Contact Page', href: '/admin/contact-content' },
    ]
  },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Users', href: '/admin/users', icon: Users },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const displayName =
    currentUser?.name ||
    currentUser?.email?.split("@")[0] ||
    "Admin";

  const roleLabel =
    currentUser?.role?.replace("_", " ") || "Administrator";

  // Close sidebar when navigating on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-sand relative">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-charcoal text-white shadow-lg hover:bg-charcoal-light transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Sidebar Overlay - Mobile only */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-charcoal border-r border-charcoal-light flex flex-col transition-all duration-300 ease-in-out",
          isMobile
            ? "fixed inset-y-0 left-0 z-50 w-64 transform"
            : "w-64 relative",
          isMobile && !isSidebarOpen && "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-charcoal-light/50">
          <Link 
            to="/admin" 
            className="flex items-center gap-3"
            onClick={handleLinkClick}
          >
            <img
              src="https://res.cloudinary.com/dxziofxst/image/upload/v1770913924/Frame_1597882146_nckozm.png"
              alt="Firehawk Imports and Exports"
              className="h-9 w-auto object-contain invert"
            />
            <span className="font-display font-semibold text-white">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            if (item.children) {
              return (
                <Collapsible key={item.name} defaultOpen>
                  <CollapsibleTrigger className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-charcoal-light rounded-xl transition-colors">
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1 text-left truncate">{item.name}</span>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'block px-3 py-2 text-sm rounded-xl transition-colors truncate',
                          location.pathname === child.href
                            ? 'bg-gradient-to-r from-ember to-saffron text-white'
                            : 'text-white/60 hover:text-white hover:bg-charcoal-light'
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href!}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors',
                  location.pathname === item.href
                    ? 'bg-gradient-to-r from-ember to-saffron text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-charcoal-light'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-charcoal-light/50 space-y-1">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-charcoal-light rounded-xl transition-colors"
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className="truncate">View Website</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-charcoal-light rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isMobile && "w-full"
      )}>
        {/* Top Bar */}
        <header className={cn(
          "h-16 bg-white border-b border-border/50 px-6 flex items-center justify-between shadow-sm",
          isMobile && "pl-16" // Make room for mobile menu button
        )}>
          <h1 className="text-lg font-display font-semibold text-foreground truncate">
            {sidebarItems.find(item => 
              item.href === location.pathname || 
              item.children?.some(c => c.href === location.pathname)
            )?.name || 'Admin'}
          </h1>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground capitalize">
                {displayName}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {roleLabel}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember to-saffron flex items-center justify-center shadow-md shrink-0">
              <span className="text-white font-semibold text-sm">
                {displayName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}