import { Category, Product, Testimonial, HomepageContent, AboutContent, ContactInfo, Enquiry, User, DashboardStats } from '@/types';

// ============================================
// CATEGORIES
// ============================================
export const categories: Category[] = [
  {
    id: 'cat-001',
    name: 'Whole Spices',
    slug: 'whole-spices',
    description: 'Premium whole spices sourced directly from Kerala and Karnataka plantations',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
    product_count: 8,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'cat-002',
    name: 'Ground Spices',
    slug: 'ground-spices',
    description: 'Freshly ground spices with authentic aroma and flavor',
    image: 'https://images.unsplash.com/photo-1599909533666-39d0ae3b9597?w=800',
    product_count: 6,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'cat-003',
    name: 'Spice Blends',
    slug: 'spice-blends',
    description: 'Traditional South Indian spice blends for authentic cooking',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800',
    product_count: 5,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'cat-004',
    name: 'Premium Exports',
    slug: 'premium-exports',
    description: 'Export-grade premium spices for international markets',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800',
    product_count: 4,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  }
];

// ============================================
// PRODUCTS
// ============================================
export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Malabar Black Pepper',
    slug: 'malabar-black-pepper',
    description: 'The King of Spices from the hills of Malabar, Kerala. Our Malabar Black Pepper is renowned worldwide for its bold, pungent flavor and exceptional quality. Hand-picked from traditional plantations, each peppercorn is sun-dried to perfection, preserving its essential oils and distinctive heat.',
    short_description: 'Premium black pepper from the Malabar hills, known for its bold flavor',
    category_id: 'cat-001',
    origin: 'Malabar, Kerala',
    packaging: ['50g Pack', '100g Pack', '250g Pack', '500g Pack', '1kg Bulk', '25kg Export'],
    images: [
      { id: 'img-001', product_id: 'prod-001', url: 'https://images.unsplash.com/photo-1599909533666-39d0ae3b9597?w=800', alt: 'Malabar Black Pepper', is_primary: true, order: 1 },
      { id: 'img-002', product_id: 'prod-001', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800', alt: 'Black Pepper Close-up', is_primary: false, order: 2 }
    ],
    is_featured: true,
    is_export_ready: true,
    price_range: 'Premium',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    id: 'prod-002',
    name: 'Kerala Green Cardamom',
    slug: 'kerala-green-cardamom',
    description: 'The Queen of Spices, our Elettaria cardamomum comes from the lush Cardamom Hills of Kerala. These vibrant green pods are packed with aromatic seeds that release a sweet, floral, and slightly minty flavor. Perfect for both savory dishes and desserts.',
    short_description: 'Aromatic green cardamom pods from the Cardamom Hills',
    category_id: 'cat-001',
    origin: 'Idukki, Kerala',
    packaging: ['25g Pack', '50g Pack', '100g Pack', '250g Pack', '500g Bulk'],
    images: [
      { id: 'img-003', product_id: 'prod-002', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800', alt: 'Green Cardamom', is_primary: true, order: 1 }
    ],
    is_featured: true,
    is_export_ready: true,
    price_range: 'Premium',
    created_at: '2024-01-21T00:00:00Z',
    updated_at: '2024-01-21T00:00:00Z'
  },
  {
    id: 'prod-003',
    name: 'Ceylon Cinnamon Quills',
    slug: 'ceylon-cinnamon-quills',
    description: 'True Ceylon cinnamon (Cinnamomum verum) with a delicate, sweet flavor. Our cinnamon quills are hand-rolled and sun-dried, creating the characteristic paper-thin layers. Ideal for desserts, beverages, and health-conscious cooking.',
    short_description: 'Authentic Ceylon cinnamon with delicate, sweet flavor',
    category_id: 'cat-001',
    origin: 'Karnataka',
    packaging: ['50g Pack', '100g Pack', '250g Pack', '500g Bulk'],
    images: [
      { id: 'img-004', product_id: 'prod-003', url: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=800', alt: 'Cinnamon Quills', is_primary: true, order: 1 }
    ],
    is_featured: true,
    is_export_ready: true,
    price_range: 'Premium',
    created_at: '2024-01-22T00:00:00Z',
    updated_at: '2024-01-22T00:00:00Z'
  },
  {
    id: 'prod-004',
    name: 'Wayanad Turmeric',
    slug: 'wayanad-turmeric',
    description: 'Golden turmeric from the pristine hills of Wayanad, known for its high curcumin content. Our turmeric fingers are organically grown and processed to retain maximum potency. Used in cooking, traditional medicine, and wellness products worldwide.',
    short_description: 'High-curcumin turmeric from Wayanad hills',
    category_id: 'cat-001',
    origin: 'Wayanad, Kerala',
    packaging: ['100g Pack', '250g Pack', '500g Pack', '1kg Bulk', '25kg Export'],
    images: [
      { id: 'img-005', product_id: 'prod-004', url: 'https://images.unsplash.com/photo-1615485290398-6f512f35d2f0?w=800', alt: 'Turmeric', is_primary: true, order: 1 }
    ],
    is_featured: true,
    is_export_ready: true,
    price_range: 'Standard',
    created_at: '2024-01-23T00:00:00Z',
    updated_at: '2024-01-23T00:00:00Z'
  },
  {
    id: 'prod-005',
    name: 'Star Anise',
    slug: 'star-anise',
    description: 'Beautiful star-shaped spice with a distinctive licorice-like flavor. Our Star Anise is carefully selected for perfect shape and potent aroma. Essential for Asian cuisines and spice blends.',
    short_description: 'Premium star-shaped spice with licorice flavor',
    category_id: 'cat-001',
    origin: 'Karnataka',
    packaging: ['25g Pack', '50g Pack', '100g Pack', '250g Bulk'],
    images: [
      { id: 'img-006', product_id: 'prod-005', url: 'https://images.unsplash.com/photo-1608198093002-ad4e005f00de?w=800', alt: 'Star Anise', is_primary: true, order: 1 }
    ],
    is_featured: false,
    is_export_ready: true,
    price_range: 'Standard',
    created_at: '2024-01-24T00:00:00Z',
    updated_at: '2024-01-24T00:00:00Z'
  },
  {
    id: 'prod-006',
    name: 'Cloves',
    slug: 'cloves',
    description: 'Intensely aromatic cloves from the spice gardens of Kerala. These dried flower buds pack a powerful punch of flavor, essential for spice blends, meat dishes, and desserts.',
    short_description: 'Aromatic dried flower buds from Kerala gardens',
    category_id: 'cat-001',
    origin: 'Kerala',
    packaging: ['25g Pack', '50g Pack', '100g Pack', '250g Bulk'],
    images: [
      { id: 'img-007', product_id: 'prod-006', url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800', alt: 'Cloves', is_primary: true, order: 1 }
    ],
    is_featured: false,
    is_export_ready: true,
    price_range: 'Standard',
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2024-01-25T00:00:00Z'
  },
  {
    id: 'prod-007',
    name: 'Ground Turmeric Powder',
    slug: 'ground-turmeric-powder',
    description: 'Finely ground turmeric powder with vibrant golden color and earthy aroma. Made from premium Wayanad turmeric roots, perfect for everyday cooking and health drinks.',
    short_description: 'Vibrant golden turmeric powder for cooking',
    category_id: 'cat-002',
    origin: 'Wayanad, Kerala',
    packaging: ['100g Pack', '250g Pack', '500g Pack', '1kg Bulk'],
    images: [
      { id: 'img-008', product_id: 'prod-007', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800', alt: 'Turmeric Powder', is_primary: true, order: 1 }
    ],
    is_featured: false,
    is_export_ready: true,
    price_range: 'Standard',
    created_at: '2024-01-26T00:00:00Z',
    updated_at: '2024-01-26T00:00:00Z'
  },
  {
    id: 'prod-008',
    name: 'Garam Masala Blend',
    slug: 'garam-masala-blend',
    description: 'Traditional North Indian spice blend made with premium whole spices. Our Garam Masala includes cardamom, cinnamon, cloves, cumin, and black pepper, perfectly balanced for authentic Indian cooking.',
    short_description: 'Traditional aromatic spice blend for Indian cuisine',
    category_id: 'cat-003',
    origin: 'Karnataka',
    packaging: ['50g Pack', '100g Pack', '250g Pack'],
    images: [
      { id: 'img-009', product_id: 'prod-008', url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800', alt: 'Garam Masala', is_primary: true, order: 1 }
    ],
    is_featured: true,
    is_export_ready: true,
    price_range: 'Premium',
    created_at: '2024-01-27T00:00:00Z',
    updated_at: '2024-01-27T00:00:00Z'
  }
];

// ============================================
// TESTIMONIALS
// ============================================
export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Hans Mueller',
    company: 'Gewürz Importhaus GmbH',
    country: 'Germany',
    content: 'Firehawk consistently delivers exceptional quality spices. Their Malabar pepper is the best we\'ve sourced in 20 years of importing. The packaging meets all EU standards perfectly.',
    rating: 5,
    is_featured: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: 'test-002',
    name: 'Marie Dubois',
    company: 'Épices du Monde',
    country: 'France',
    content: 'The cardamom from Firehawk has transformed our pastry line. Our customers can taste the difference. Reliable delivery and excellent documentation for imports.',
    rating: 5,
    is_featured: true,
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z'
  },
  {
    id: 'test-003',
    name: 'James Richardson',
    company: 'Spice Masters UK',
    country: 'United Kingdom',
    content: 'Working with Firehawk has streamlined our spice sourcing. Their export documentation is impeccable, and the quality control is outstanding. Highly recommended.',
    rating: 5,
    is_featured: true,
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  },
  {
    id: 'test-004',
    name: 'Sofia Andersson',
    company: 'Nordic Spices AB',
    country: 'Sweden',
    content: 'The turmeric and cinnamon quality exceeds all our expectations. Firehawk understands the premium market and delivers accordingly.',
    rating: 5,
    is_featured: false,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  }
];

// ============================================
// HOMEPAGE CONTENT
// ============================================
export const homepageContent: HomepageContent[] = [
  {
    id: 'home-001',
    section: 'hero',
    title: 'Authentic Spices from the Heart of India',
    subtitle: 'Premium spices sourced from Kerala & Karnataka, delivered worldwide',
    content: 'Experience the rich heritage of South Indian spices with Firehawk Imports and Exports',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920',
    button_text: 'Explore Our Spices',
    button_link: '/products',
    order: 1,
    is_active: true,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'home-002',
    section: 'intro',
    title: 'The Finest Spices, Globally Delivered',
    subtitle: 'From Farm to Your Kitchen',
    content: 'At Firehawk, we bridge the gap between traditional Indian spice farmers and global markets. Every spice we export carries the authentic flavors of Kerala and Karnataka, processed with care to meet international quality standards.',
    order: 2,
    is_active: true,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'home-003',
    section: 'quality',
    title: 'Export-Grade Quality Assurance',
    subtitle: 'Certified Excellence',
    content: 'All our products undergo rigorous quality testing to ensure they meet EU, US, and international food safety standards. From cultivation to packaging, we maintain complete traceability.',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800',
    order: 3,
    is_active: true,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'home-004',
    section: 'cta',
    title: 'Ready to Source Premium Spices?',
    subtitle: 'Partner with Firehawk',
    content: 'Whether you\'re a distributor, manufacturer, or retailer, we offer flexible packaging and competitive pricing for bulk orders.',
    button_text: 'Get in Touch',
    button_link: '/contact',
    order: 4,
    is_active: true,
    updated_at: '2024-01-15T00:00:00Z'
  }
];

// ============================================
// ABOUT CONTENT
// ============================================
export const aboutContent: AboutContent[] = [
  {
    id: 'about-001',
    section: 'story',
    title: 'Our Story',
    content: 'Founded with a passion for authentic Indian spices, Firehawk Imports and Exports emerged from a simple belief: the world deserves access to the finest spices that Kerala and Karnataka have to offer. Our journey began in the spice plantations of Malabar, where generations of farmers have perfected the art of growing and harvesting premium spices.',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800',
    order: 1,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'about-002',
    section: 'heritage',
    title: 'Kerala & Karnataka Heritage',
    content: 'The Western Ghats of Kerala and Karnataka form one of the world\'s most bio-diverse regions, blessed with the perfect climate for growing exceptional spices. From the Malabar coast\'s legendary black pepper to the Cardamom Hills\' aromatic green cardamom, our sourcing network spans the finest growing regions of South India.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800',
    order: 2,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'about-003',
    section: 'sourcing',
    title: 'Sourcing & Quality',
    content: 'We work directly with farmers and cooperatives, ensuring fair prices for growers while maintaining complete supply chain transparency. Every batch is tested for purity, moisture content, and essential oil levels before export. Our state-of-the-art processing facility ensures hygiene standards that exceed international requirements.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    order: 3,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'about-004',
    section: 'mission',
    title: 'Our Mission',
    content: 'To be the trusted bridge between South India\'s spice heritage and the global marketplace, delivering uncompromising quality while supporting sustainable farming practices and fair trade.',
    order: 4,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'about-005',
    section: 'vision',
    title: 'Our Vision',
    content: 'To make authentic Indian spices accessible to every kitchen worldwide, while preserving traditional cultivation methods and empowering local farming communities.',
    order: 5,
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'about-006',
    section: 'export',
    title: 'Global Presence',
    content: 'Firehawk exports to over 15 countries across Europe, Middle East, and North America. Our logistics partners ensure timely delivery with proper documentation for seamless customs clearance. We\'re certified to meet EU, FDA, and other international food safety standards.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
    order: 6,
    updated_at: '2024-01-15T00:00:00Z'
  }
];

// ============================================
// CONTACT INFO
// ============================================
export const contactInfo: ContactInfo = {
  id: 'contact-001',
  address: '123 Spice Trade Center, MG Road',
  city: 'Kochi, Kerala 682001',
  country: 'India',
  phone: '+91 484 2345678',
  email: 'exports@firehawkspices.com',
  working_hours: 'Monday - Saturday: 9:00 AM - 6:00 PM IST',
  updated_at: '2024-01-15T00:00:00Z'
};

// ============================================
// MOCK ENQUIRIES
// ============================================
export const enquiries: Enquiry[] = [
  {
    id: 'enq-001',
    type: 'product',
    product_id: 'prod-001',
    name: 'John Smith',
    email: 'john@example.com',
    company: 'European Foods Ltd',
    message: 'Interested in bulk order of Malabar Black Pepper. Please share pricing for 500kg.',
    status: 'unread',
    created_at: '2024-02-01T10:30:00Z',
    updated_at: '2024-02-01T10:30:00Z'
  },
  {
    id: 'enq-002',
    type: 'general',
    name: 'Anna Weber',
    email: 'anna@spiceshop.de',
    phone: '+49 123 456789',
    company: 'Spice Shop Berlin',
    message: 'Would like to discuss becoming a distributor in Germany. Please contact me.',
    status: 'read',
    created_at: '2024-01-28T14:15:00Z',
    updated_at: '2024-01-29T09:00:00Z'
  },
  {
    id: 'enq-003',
    type: 'product',
    product_id: 'prod-002',
    name: 'Pierre Laurent',
    email: 'pierre@patisserie.fr',
    company: 'Patisserie Laurent',
    message: 'Need premium cardamom for our pastry line. What grades do you offer?',
    status: 'replied',
    created_at: '2024-01-25T11:00:00Z',
    updated_at: '2024-01-26T16:30:00Z'
  }
];

// ============================================
// MOCK USERS
// ============================================
export const users: User[] = [
  {
    id: 'user-001',
    email: 'admin@firehawkspices.com',
    name: 'Rahul Kumar',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'user-002',
    email: 'editor@firehawkspices.com',
    name: 'Priya Sharma',
    role: 'editor',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  }
];

// ============================================
// DASHBOARD STATS HELPER
// ============================================
export const getDashboardStats = (): DashboardStats => ({
  total_products: products.length,
  total_categories: categories.length,
  total_enquiries: enquiries.length,
  unread_enquiries: enquiries.filter(e => e.status === 'unread').length,
  featured_products: products.filter(p => p.is_featured).length,
  recent_enquiries: enquiries.slice(0, 5)
});

// Helper to get product with category
export const getProductWithCategory = (productId: string): Product | undefined => {
  const product = products.find(p => p.id === productId);
  if (product) {
    const category = categories.find(c => c.id === product.category_id);
    return { ...product, category };
  }
  return undefined;
};

// Helper to get products by category
export const getProductsByCategory = (categorySlug: string): Product[] => {
  const category = categories.find(c => c.slug === categorySlug);
  if (category) {
    return products.filter(p => p.category_id === category.id);
  }
  return [];
};

// Helper to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.is_featured);
};

// Helper to get featured testimonials
export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter(t => t.is_featured);
};
