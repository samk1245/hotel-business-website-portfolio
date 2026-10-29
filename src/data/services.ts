import { HotelService } from "@/lib/types";

export const HOTEL_SERVICES: HotelService[] = [
  {
    id: "hotel-resort-web-dev",
    title: "Hotel & Resort Website Development",
    tagline: "Custom-architected digital flagships built to drive direct guest bookings.",
    description: "Full-scale custom website engineered specifically for hotels, resorts, boutique properties, and luxury villas. Built with responsive layouts, fast loading times, and intuitive guest booking journeys.",
    startingPrice: 17999,
    iconName: "Hotel",
    deliverables: [
      "Custom responsive design (Desktop, Tablet, Mobile)",
      "High-speed Next.js framework architecture",
      "Direct WhatsApp and click-to-call integration",
      "Interactive room cards and photo showcases",
      "SSL security and Google-compliant sitemaps"
    ],
    estimatedDays: "10-14 days"
  },
  {
    id: "luxury-3d-design",
    title: "Luxury 3D Website Design",
    tagline: "Immersive WebGL & Three.js spatial architectural experiences.",
    description: "Transform your hotel into an interactive digital landmark. Featuring 3D architectural models, floating geometric suites, ambient lighting, and cinematic camera paths that mesmerize luxury travelers.",
    startingPrice: 34999,
    iconName: "Cuboid",
    deliverables: [
      "Three.js / React Three Fiber interactive scene",
      "360° architectural model exploration",
      "Mobile-optimized GPU shaders with graceful fallback",
      "Luxury champagne-gold and midnight aesthetic",
      "Touch-controlled rotation and smooth zoom"
    ],
    estimatedDays: "18-24 days"
  },
  {
    id: "room-suite-showcase",
    title: "Room & Suite Showcase Pages",
    tagline: "High-converting editorial room presentation that justifies premium rates.",
    description: "Dedicated suite presentation pages highlighting bed specifications, square footage, panoramic balcony views, premium amenities, bathroom fixtures, and instant inquiry CTAs.",
    startingPrice: 1500,
    iconName: "BedDouble",
    deliverables: [
      "Individual room category detail pages",
      "High-resolution swipeable photo carousels",
      "Amenity icon grid (Wi-Fi, Jacuzzi, View, AC)",
      "Dynamic pricing badges & occupancy limits",
      "One-click 'Book This Suite' WhatsApp trigger"
    ],
    estimatedDays: "3-5 days"
  },
  {
    id: "photo-galleries-virtual-tours",
    title: "Interactive Photo Galleries & Virtual Tours",
    tagline: "Visual storytelling that immerses guests in your property before arrival.",
    description: "Filterable high-definition photo galleries and 360° virtual tour embeds (Matterport / Google Street View) allowing prospective guests to walk through suites, gardens, and banquet halls.",
    startingPrice: 5000,
    iconName: "Image",
    deliverables: [
      "Category filters: Rooms, Dining, Pool, Events, Spa",
      "Full-screen lightbox viewer with pinch-to-zoom",
      "360° Matterport / panoramic tour iframe embed",
      "Optimized WebP image delivery for ultra-fast loading",
      "Lazy-loading architecture to prevent bandwidth drain"
    ],
    estimatedDays: "4-6 days"
  },
  {
    id: "booking-enquiry-systems",
    title: "Booking Enquiry Systems",
    tagline: "Capture qualified guest reservation leads directly to your inbox & database.",
    description: "A tailored inquiry engine allowing guests to pick check-in and check-out dates, room tier, number of adults and children, and special requests without OTA commissions.",
    startingPrice: 2000,
    iconName: "CalendarCheck",
    deliverables: [
      "Interactive date-range calendar picker",
      "Room tier selector with auto-filled occupancy rules",
      "Instant email notification to hotel reservation desk",
      "Admin database lead storage and CSV export",
      "Automated WhatsApp inquiry trigger backup"
    ],
    estimatedDays: "3-5 days"
  },
  {
    id: "direct-online-booking",
    title: "Direct Online Booking Integration",
    tagline: "Eliminate 15-25% OTA commissions with live direct bookings.",
    description: "Seamless integration with hospitality booking engines (Sirvoy, Cloudbeds, eZee Absolute, Staah, Hotelogix, or custom booking engines) keeping inventory synchronized across platforms.",
    startingPrice: 8000,
    iconName: "CreditCard",
    deliverables: [
      "Booking engine widget custom-styled to hotel branding",
      "Live room availability and rate calendar lookup",
      "Multi-currency support for international travelers",
      "Instant confirmation email to guests and staff",
      "Channel manager synchronisation technical scoping"
    ],
    estimatedDays: "7-12 days"
  },
  {
    id: "online-payment-integration",
    title: "Online Payment Gateway Integration",
    tagline: "Collect advance deposits and room payments securely.",
    description: "Integration with leading payment gateways like Razorpay, Stripe, PhonePe, and PayPal. Securely accept credit/debit cards, net banking, UPI, and international cards with zero payment friction.",
    startingPrice: 5000,
    iconName: "ShieldCheck",
    deliverables: [
      "Razorpay, Stripe, or PhonePe payment gateway setup",
      "Direct bank settlement with zero studio commissions",
      "Instant payment receipts and confirmation SMS/email",
      "PCI-DSS compliant SSL checkout flow",
      "Webhook-driven reservation status updates"
    ],
    estimatedDays: "4-7 days"
  },
  {
    id: "whatsapp-booking-integration",
    title: "WhatsApp Booking Integration",
    tagline: "Turn high-intent visitors into direct bookings in under 60 seconds.",
    description: "In India and Asia, WhatsApp is the number one direct booking channel. We configure smart floating action buttons and pre-formatted message routing so guests can chat directly with your front desk.",
    startingPrice: 1000,
    iconName: "MessageCircle",
    deliverables: [
      "Floating luxury WhatsApp action bubble",
      "Pre-filled text with dates, room category & guest count",
      "Multi-agent or front-desk routing configuration",
      "Click-to-chat analytics event tracking in GA4",
      "Mobile-friendly touch interaction"
    ],
    estimatedDays: "1-2 days"
  },
  {
    id: "google-maps-location",
    title: "Google Maps & Location Integration",
    tagline: "Guide arriving guests effortlessly from airports, stations & highways.",
    description: "Interactive customized Google Maps integration with driving directions, distances from key transport hubs, landmarks, and downloadable route guides for seamless guest arrivals.",
    startingPrice: 1500,
    iconName: "MapPin",
    deliverables: [
      "Interactive styled Google Maps embed",
      "Distance calculator from Airport, Railway Station & Bus Stands",
      "Curated 'Nearby Attractions' interactive guide",
      "One-tap 'Open in Google Maps' navigation button",
      "Parking, valet, and arrival instructions"
    ],
    estimatedDays: "2-3 days"
  },
  {
    id: "local-technical-seo",
    title: "Local SEO & Technical SEO",
    tagline: "Rank on Page 1 when travelers search for luxury stays in your city.",
    description: "Deep hospitality search engine optimization. We implement Schema.org Hotel markup, Google Business Profile alignment, meta tags, and high-intent local keyword targeting.",
    startingPrice: 3000,
    iconName: "Search",
    deliverables: [
      "Structured JSON-LD schema (Hotel, LodgingBusiness, Offer)",
      "Targeting keywords (e.g. 'Best Luxury Hotel in Prayagraj')",
      "XML Sitemap generation and Google Search Console setup",
      "OpenGraph and Twitter Card social preview optimization",
      "Canonical URL structure to prevent duplicate content"
    ],
    estimatedDays: "4-6 days"
  },
  {
    id: "speed-mobile-optimization",
    title: "Speed & Mobile Optimisation",
    tagline: "Sub-second load times that keep impatient travelers from leaving.",
    description: "Over 80% of hotel traffic comes from smartphones on 4G/5G connections. We optimize Core Web Vitals to achieve 90+ Google PageSpeed scores, reducing bounce rates and boosting conversions.",
    startingPrice: 4000,
    iconName: "Zap",
    deliverables: [
      "Next.js server-side static generation and image optimization",
      "WebP and AVIF modern format compression",
      "CSS & JavaScript minification and tree-shaking",
      "CDN edge caching via Cloudflare / Vercel Edge",
      "Zero cumulative layout shift (CLS) guarantee"
    ],
    estimatedDays: "3-5 days"
  },
  {
    id: "hotel-website-redesign",
    title: "Hotel Website Redesign",
    tagline: "Transform an outdated, slow website into an editorial revenue engine.",
    description: "Is your existing website clunky, dated, or losing bookings to OTAs? We rebuild your entire digital presence with modern aesthetics, retaining your established SEO authority.",
    startingPrice: 17999,
    iconName: "RefreshCw",
    deliverables: [
      "Complete visual and architectural redesign",
      "301 URL redirect mapping to protect Google rankings",
      "Modernization of legacy photos, room cards, and typography",
      "Mobile-responsive rebuilding from scratch",
      "Direct conversion funnel re-engineering"
    ],
    estimatedDays: "12-16 days"
  },
  {
    id: "website-maintenance-security",
    title: "Website Maintenance & Security",
    tagline: "Peace of mind with 24/7 uptime monitoring, backups & regular updates.",
    description: "Hospitality businesses run 24 hours a day, 365 days a year. Our ongoing care plan ensures your site never goes down, stays protected from malicious attacks, and gets timely rate updates.",
    startingPrice: 1499,
    iconName: "Shield",
    deliverables: [
      "24/7 automated uptime and response monitoring",
      "Weekly automated cloud backups of site and leads",
      "Monthly room rate, photo, and seasonal package updates",
      "Continuous SSL certificate renewal and security patches",
      "Priority telephone & WhatsApp technical support"
    ],
    estimatedDays: "Ongoing monthly"
  },
  {
    id: "analytics-conversion-tracking",
    title: "Analytics & Conversion Tracking",
    tagline: "Know exactly which marketing campaigns bring the highest-paying guests.",
    description: "Complete tracking setup with Google Analytics 4, Google Tag Manager, Meta Pixel, and conversion events for booking inquiries, WhatsApp clicks, phone calls, and reservation checkouts.",
    startingPrice: 2000,
    iconName: "TrendingUp",
    deliverables: [
      "Google Analytics 4 custom hotel event setup",
      "Meta Pixel setup for targeted Facebook and Instagram ads",
      "Event tracking for phone clicks, WhatsApp, and form submissions",
      "Custom monthly direct booking performance dashboard",
      "Privacy policy and GDPR/DPDP consent banner setup"
    ],
    estimatedDays: "2-4 days"
  },
  {
    id: "multilingual-hotel-websites",
    title: "Multilingual Hotel Websites",
    tagline: "Welcome international tourists and domestic guests in their native language.",
    description: "Expand your reach to international travelers and domestic visitors. We implement clean language switchers with localized SEO hreflang tags for English, Hindi, French, Spanish, or German.",
    startingPrice: 5000,
    iconName: "Globe",
    deliverables: [
      "Clean UI language switcher toggle",
      "Multi-locale URL routing (e.g. /en and /hi)",
      "Hreflang SEO tags for international search engines",
      "Translated room descriptions, amenities, and policy pages",
      "Multilingual booking inquiry confirmation emails"
    ],
    estimatedDays: "5-8 days"
  },
  {
    id: "hotel-events-spa-dining",
    title: "Dining, Spa, Events & Wedding Venue Pages",
    tagline: "Monetize banquets, destination weddings, restaurants & luxury spas.",
    description: "Hotels generate massive revenue from non-room offerings. We craft dedicated landing pages for rooftop fine dining, banquet halls, lawn weddings, corporate retreats, and spa wellness menus.",
    startingPrice: 4000,
    iconName: "Utensils",
    deliverables: [
      "Fine dining menu showcase with PDF downloadable menus",
      "Banquet hall capacity chart (Theater, Round table, Classroom)",
      "Destination wedding inquiry form with guest count estimator",
      "Spa treatment packages and wellness appointment scheduler",
      "High-res gallery of past events and corporate conferences"
    ],
    estimatedDays: "4-7 days"
  }
];
