const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Admin User
  const defaultPassword = "Admin@Grandeur2026!";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@grandeurlabs.com" },
    update: {
      passwordHash,
    },
    create: {
      email: "admin@grandeurlabs.com",
      name: "Studio Principal",
      passwordHash,
      role: "SUPERADMIN",
    },
  });
  console.log("Admin account ready: admin@grandeurlabs.com");

  // 2. Pricing Packages
  const packages = [
    {
      key: "starter",
      name: "Starter Stay",
      subtitle: "For boutique stays, homestays & verified guest-houses establishing digital credibility",
      basePrice: 7999,
      pageLimit: 5,
      description: "Clean, responsive 5-page hotel website with direct WhatsApp concierge, location maps, room cards, and mobile-first speed.",
      highlights: JSON.stringify([
        "Up to 5 custom-designed responsive pages",
        "Home, Rooms, Facilities, Gallery & Contact sections",
        "High-conversion WhatsApp enquiry button",
        "Interactive Google Maps & direct routing",
        "Basic on-page SEO & meta optimization",
        "Contact & Room Enquiry form (Email + Database)",
        "Standard visual design with high-res photography layout",
        "Mobile & tablet responsive perfection",
        "SSL security & lightning-fast hosting setup"
      ]),
      isPopular: false,
      sortOrder: 1,
    },
    {
      key: "signature",
      name: "Signature Hotel",
      subtitle: "For independent city hotels, business hotels & resorts driving direct bookings",
      basePrice: 17999,
      pageLimit: 8,
      description: "Bespoke hotel website with individual room detail layouts, seasonal offer showcases, click-to-call, and structured inquiry capture.",
      highlights: JSON.stringify([
        "Up to 8 tailored pages & custom hotel branding",
        "Dedicated room categories & individual suite showcase pages",
        "Filterable high-resolution image gallery & seasonal offers",
        "Integrated WhatsApp & direct phone concierge triggers",
        "Structured booking enquiry modal with date & guest picker",
        "Google Maps directions & local attraction guide",
        "Basic technical SEO & schema markup for hotels",
        "Performance & Core Web Vitals optimization",
        "Social media integration & guest review showcase"
      ]),
      isPopular: true,
      sortOrder: 2,
    },
    {
      key: "luxury",
      name: "Luxury Experience",
      subtitle: "For luxury heritage properties, high-end resorts & destination boutique hotels",
      basePrice: 34999,
      pageLimit: 12,
      description: "Editorial luxury aesthetic featuring cinematic scroll animations, 3D architectural elements, virtual-tour embeds, and dedicated amenities.",
      highlights: JSON.stringify([
        "Up to 12 bespoke editorial pages",
        "Premium midnight & champagne gold visual architecture",
        "Advanced motion transitions & smooth scroll storytelling",
        "Interactive 3D architectural showcase or ambient hero element",
        "Luxury room & presidential suite experiential layouts",
        "360° Virtual Tour embed support & interactive floor plans",
        "Dedicated dining, banquet, spa & wedding venue showcases",
        "High-touch VIP enquiry workflow with auto-response",
        "Enhanced local SEO, OpenGraph cards & conversion tracking"
      ]),
      isPopular: false,
      sortOrder: 3,
    },
    {
      key: "direct_booking",
      name: "Direct Booking Pro",
      subtitle: "For properties ready to cut OTA commissions and accept direct room reservations",
      basePrice: 49999,
      pageLimit: 14,
      description: "Complete direct booking engine integration, room inventory workflow, payment gateway integration, and reservation email confirmations.",
      highlights: JSON.stringify([
        "Everything included in the Signature or Luxury scope",
        "Booking engine integration (Sirvoy, Cloudbeds, eZee, or custom)",
        "Live room availability lookup & guest reservation journey",
        "Automated booking confirmation emails for guests & staff",
        "Payment gateway integration (Razorpay / Stripe / PhonePe)",
        "Booking management interface & guest lead pipeline",
        "Full SSL encryption, error recovery & reservation testing",
        "Channel manager synchronisation technical scoping",
        "Conversion rate optimization for direct booking funnel"
      ]),
      isPopular: false,
      sortOrder: 4,
    },
    {
      key: "custom_3d",
      name: "Custom 3D Experience",
      subtitle: "For marquee luxury resorts, palace hotels & experiential architectural landmarks",
      basePrice: 59999,
      pageLimit: 16,
      description: "Bespoke WebGL/Three.js 3D architectural interactive experience, custom camera paths, luxury transitions, and spatial property exploration.",
      highlights: JSON.stringify([
        "Custom-designed interactive 3D WebGL resort experience",
        "Three.js / React Three Fiber architectural visualization",
        "Cinematic camera path choreography & scroll-triggered storytelling",
        "Interactive property exploration (clickable villas, amenities & pool)",
        "Mobile-optimized 3D fallback with graceful degradation",
        "Bespoke soundscapes or ambient sensory micro-interactions",
        "Complete direct enquiry and VIP reservation engine",
        "Global CDN distribution & GPU shader performance profiling",
        "Exclusive creative design direction tailored to your brand"
      ]),
      isPopular: false,
      sortOrder: 5,
    },
  ];

  for (const pkg of packages) {
    await prisma.pricingPackage.upsert({
      where: { key: pkg.key },
      update: pkg,
      create: pkg,
    });
  }
  console.log("Seeded 5 pricing packages.");

  // 3. Itemized Add-ons Menu
  const addons = [
    {
      key: "addon_additional_page",
      name: "Additional Custom Page",
      category: "core",
      price: 1000,
      priceType: "ONE_TIME",
      description: "Tailored layout for specific offerings such as conferencing, rooftop lounge, local tours, or special packages.",
      sortOrder: 1,
    },
    {
      key: "addon_room_category",
      name: "Additional Room Category Page",
      category: "core",
      price: 1500,
      priceType: "ONE_TIME",
      description: "Dedicated suite presentation page with photo carousel, amenities list, pricing matrix, and instant enquiry button.",
      sortOrder: 2,
    },
    {
      key: "addon_advanced_gallery",
      name: "Advanced Filterable Photo Gallery",
      category: "core",
      price: 2000,
      priceType: "ONE_TIME",
      description: "High-performance category-filtered lightbox gallery for Rooms, Dining, Pool, Events, and Aerial views.",
      sortOrder: 3,
    },
    {
      key: "addon_whatsapp_integration",
      name: "WhatsApp Concierge & Smart Routing",
      category: "booking",
      price: 1000,
      priceType: "ONE_TIME",
      description: "Floating action button and contextual triggers with pre-populated room dates and guest details.",
      sortOrder: 4,
    },
    {
      key: "addon_booking_enquiry_form",
      name: "Structured Booking Enquiry System",
      category: "booking",
      price: 2000,
      priceType: "ONE_TIME",
      description: "Multi-step date-picker, room selector, guest headcount, database storage, and instant email alert to staff.",
      sortOrder: 5,
    },
    {
      key: "addon_booking_engine",
      name: "Direct Booking Engine Integration",
      category: "booking",
      price: 8000,
      priceType: "ONE_TIME",
      description: "Embed and style live booking widgets (Cloudbeds, eZee, Sirvoy, Hotelogix, or custom booking gateway).",
      sortOrder: 6,
    },
    {
      key: "addon_payment_gateway",
      name: "Online Payment Gateway Integration",
      category: "booking",
      price: 5000,
      priceType: "ONE_TIME",
      description: "Secure online advance deposit or reservation payments via Razorpay, Stripe, or UPI gateway.",
      sortOrder: 7,
    },
    {
      key: "addon_interactive_3d",
      name: "Interactive 3D Architectural Section",
      category: "3d_media",
      price: 8000,
      priceType: "ONE_TIME",
      description: "WebGL interactive 3D scene (360° building rotation, ambient lighting, floating architectural layers).",
      sortOrder: 8,
    },
    {
      key: "addon_advanced_animation",
      name: "Advanced Motion & Scroll Choreography",
      category: "3d_media",
      price: 5000,
      priceType: "ONE_TIME",
      description: "Editorial cinematic scrolling, image reveals, magnetic hover effects, and luxury storytelling pacing.",
      sortOrder: 9,
    },
    {
      key: "addon_virtual_tour",
      name: "360° Virtual Tour Integration",
      category: "3d_media",
      price: 5000,
      priceType: "ONE_TIME",
      description: "Embed and optimize Matterport, Google Street View, or custom panoramic 360° virtual room walkthroughs.",
      sortOrder: 10,
    },
    {
      key: "addon_local_seo",
      name: "Local SEO & Hotel Schema Setup",
      category: "marketing",
      price: 3000,
      priceType: "ONE_TIME",
      description: "Google Business Profile alignment, JSON-LD Hotel structured data, city keyword optimization, and sitemaps.",
      sortOrder: 11,
    },
    {
      key: "addon_multilingual",
      name: "Multilingual Language Switcher",
      category: "marketing",
      price: 5000,
      priceType: "ONE_TIME",
      description: "Dual language implementation (e.g., English + Hindi, French, or Japanese) with regional SEO hreflang tags.",
      sortOrder: 12,
    },
    {
      key: "addon_analytics",
      name: "Analytics & Conversion Tracking",
      category: "marketing",
      price: 2000,
      priceType: "ONE_TIME",
      description: "Google Analytics 4 setup, Meta Pixel, WhatsApp click tracking, and enquiry conversion goal funnel.",
      sortOrder: 13,
    },
    {
      key: "addon_admin_dashboard",
      name: "Private Hotel Admin CMS Dashboard",
      category: "core",
      price: 8000,
      priceType: "ONE_TIME",
      description: "Secure login dashboard enabling hotel staff to update seasonal room prices, photos, offers, and export leads.",
      sortOrder: 14,
    },
    {
      key: "addon_monthly_maintenance",
      name: "Monthly Hotel Care & Security Plan",
      category: "core",
      price: 1499,
      priceType: "RECURRING_MONTHLY",
      description: "Managed cloud hosting, weekly backups, SSL renewals, monthly room/rate content updates, and 24/7 uptime monitoring.",
      sortOrder: 15,
    },
  ];

  for (const addon of addons) {
    await prisma.pricingAddon.upsert({
      where: { key: addon.key },
      update: addon,
      create: addon,
    });
  }
  console.log("Seeded 15 itemized feature add-ons.");

  // 4. Three Detailed Concept Projects
  const projects = [
    {
      slug: "heritage-palace-hotel",
      title: "The Rajwada Palace & Royal Suites",
      propertyType: "Luxury Heritage",
      location: "Civil Lines, Prayagraj / Varanasi, Uttar Pradesh",
      summary: "A regal digital transformation for a 120-year-old restored heritage mansion. Combines antique warmth with royal gold editorial accents, presidential suite presentation, and direct high-net-worth banquet enquiries.",
      designObjectives: "Capture the aristocratic charm and handcrafted stone architecture while eliminating booking friction for high-value weddings, corporate retreats, and luxury travelers.",
      features: JSON.stringify([
        "Regal Gold & Ivory Editorial Layout",
        "Interactive 3D Architectural Archways & Courtyard Visuals",
        "Royal Suite & Haveli Room Showcases with High-Res Lightbox",
        "Royal Dining & Darbar Banquet Reservation Engine",
        "Direct WhatsApp Concierge with Pre-filled Suite Enquiries",
        "Google Maps Heritage Walking Route & Directions"
      ]),
      liveUrl: "/demos/heritage-palace",
      demoUrl: "/demos/heritage-palace",
      demoType: "heritage",
      isConcept: true,
      isFeatured: true,
      heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
      ]),
      sortOrder: 1,
    },
    {
      slug: "azure-mountain-resort",
      title: "Azure Pines Alpine Resort & Spa",
      propertyType: "Mountain Resort",
      location: "Kullu Valley / Mussoorie Foothills, India",
      summary: "An eco-luxury mountain sanctuary website showcasing panoramic cedar forest chalets, temperature-controlled cliffside pools, and curated nature expeditions.",
      designObjectives: "Deliver an emotionally stirring, cinematic visual escape that encourages city professionals to book multi-night wellness retreats and adventure stays directly.",
      features: JSON.stringify([
        "Cinematic Full-Width Landscape Video Hero",
        "Chalet & Villa Showcase with Panoramic Balcony Views",
        "Interactive Weather & Trekking Activity Guide",
        "Ayurvedic Spa & Wellness Booking Flow",
        "Direct Availability Calendar & WhatsApp Booking Flow",
        "Optimized for High-Resolution Imagery with Zero Load Lag"
      ]),
      liveUrl: "/demos/azure-mountain-resort",
      demoUrl: "/demos/azure-mountain-resort",
      demoType: "mountain",
      isConcept: true,
      isFeatured: true,
      heroImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
      ]),
      sortOrder: 2,
    },
    {
      slug: "lumina-boutique-hotel",
      title: "Lumina Contemporary Boutique Suites",
      propertyType: "Boutique Hotel",
      location: "C-Scheme, Jaipur / Indiranagar, Bengaluru, India",
      summary: "A sleek, minimalist urban boutique hotel website engineered for the modern design-conscious traveler, remote founders, and weekend tourists.",
      designObjectives: "Maximize mobile conversion speeds, showcase custom artisanal interiors, and channel reservations directly through an frictionless WhatsApp and card payment flow.",
      features: JSON.stringify([
        "Minimalist Architectural Charcoal & Warm Sand Palette",
        "Instant Direct Room Pricing Matrix with Season Badging",
        "Direct Mobile WhatsApp Room Booking in 2 Clicks",
        "Rooftop Artisanal Bistro & Co-working Lounge Section",
        "Real-Time Google Maps Integration & Airport Transfer Guide",
        "Zero-Bloat Core Web Vitals Grade (100% Mobile Score)"
      ]),
      liveUrl: "/demos/lumina-boutique",
      demoUrl: "/demos/lumina-boutique",
      demoType: "boutique",
      isConcept: true,
      isFeatured: true,
      heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      ]),
      sortOrder: 3,
    },
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }
  console.log("Seeded 3 concept projects.");

  // 5. Comprehensive FAQs
  const faqs = [
    {
      question: "How much does a professional hotel website cost?",
      answer: "Our hotel website packages start transparently at ₹7,999 for boutique homestays and guest-houses (Starter Stay, up to 5 pages), ₹17,999 for full-featured independent hotels (Signature Hotel, up to 8 pages), and ₹34,999 for luxury resorts with motion & 3D presentation (Luxury Experience, up to 12 pages). Live direct booking engines and custom 3D WebGL architectures range from ₹49,999 to ₹59,999+. You can select individual add-ons using our interactive price calculator to see the exact breakdown without hidden costs.",
      category: "pricing",
      sortOrder: 1,
    },
    {
      question: "How long does hotel website development take?",
      answer: "Development timelines depend on the chosen scope: Starter Stay typically takes 5 to 7 business days; Signature Hotel takes 10 to 14 business days; Luxury Experience takes 18 to 24 business days; and full Direct Booking Pro or Custom 3D Experiences take 25 to 35 business days. Once you provide your hotel photography, room details, and content, we begin immediate design and keep you updated at every stage.",
      category: "development",
      sortOrder: 2,
    },
    {
      question: "Can guests book rooms directly through my website without paying high OTA commissions?",
      answer: "Yes, absolutely. We provide two practical approaches: 1) High-converting direct booking enquiry forms connected directly to your WhatsApp and email (included in Signature and above), or 2) Full direct booking engine integration (Direct Booking Pro package) connected to popular hotel engines like Cloudbeds, Sirvoy, eZee Frontdesk, or custom payment gateways like Razorpay/Stripe, allowing guests to pay room deposits directly into your bank account.",
      category: "booking",
      sortOrder: 3,
    },
    {
      question: "Can I receive room booking enquiries directly on WhatsApp?",
      answer: "Yes. In India, over 70% of independent hotel bookings and inquiries happen over WhatsApp. We build smart, contextual WhatsApp triggers where guests click 'Book This Suite' and WhatsApp opens on their phone with pre-filled dates, room category, and guest count, so your front-desk manager can close the booking immediately.",
      category: "booking",
      sortOrder: 4,
    },
    {
      question: "Can our hotel staff update room photos, prices, and seasonal packages ourselves?",
      answer: "Yes! If you choose our Private Admin CMS add-on (or higher tiers), we provide a secure, simple private portal where non-technical staff can update room rates, upload new seasonal photos, update offer banners, and view customer enquiries anytime.",
      category: "development",
      sortOrder: 5,
    },
    {
      question: "Will the hotel website work flawlessly on smartphones and tablets?",
      answer: "100% yes. More than 82% of travelers research hotels and book on mobile devices. Every website we build is crafted mobile-first, ensuring instantaneous loading, touch-friendly room sliders, effortless date pickers, and click-to-call/WhatsApp buttons.",
      category: "development",
      sortOrder: 6,
    },
    {
      question: "Is domain name and web hosting included?",
      answer: "We include full configuration and deployment on blazing-fast global cloud networks (such as Vercel and Cloudflare with global CDN caching and SSL certificates). For the domain name (e.g. yourhotelname.com), we assist you in registering it under your own company name so you retain 100% legal ownership of your digital assets.",
      category: "development",
      sortOrder: 7,
    },
    {
      question: "Do you provide ongoing website maintenance and security updates?",
      answer: "Yes. We offer an optional Hotel Care & Security Plan starting at ₹1,499/month. This covers managed cloud hosting, automated weekly backups, SSL renewals, monthly room/rate text updates, and 24/7 uptime monitoring so you can focus entirely on running your property.",
      category: "maintenance",
      sortOrder: 8,
    },
    {
      question: "Can you redesign our existing outdated hotel website?",
      answer: "Yes. Many hotels come to us with slow, outdated WordPress sites that do not work properly on smartphones. We completely rebuild your digital presence from the ground up using modern Next.js and Tailwind, preserving your existing Google search rankings and brand equity while dramatically boosting speed, aesthetics, and direct bookings.",
      category: "development",
      sortOrder: 9,
    },
    {
      question: "Can the website connect to our existing hotel booking engine or PMS?",
      answer: "Yes. We have experience integrating with leading hospitality booking engines and channel managers including Cloudbeds, Sirvoy, eZee Absolute, Staah, Hotelogix, and custom iFrame or API booking engines. We seamlessly style the booking bar to match your hotel's aesthetic.",
      category: "booking",
      sortOrder: 10,
    },
    {
      question: "Are payment gateway and channel-manager subscription fees included in your packages?",
      answer: "No. Payment gateway transaction fees (e.g., Razorpay standard 2% or Stripe) and channel manager subscription fees (such as Cloudbeds or Sirvoy monthly software licenses) are billed directly by those third-party providers to your business. We set them up and integrate them into your website smoothly with zero markup.",
      category: "pricing",
      sortOrder: 11,
    },
    {
      question: "What information and assets must our hotel provide before we begin development?",
      answer: "To ensure a smooth launch, we need: 1) High-resolution photos of your property, rooms, dining area, and amenities, 2) Room descriptions, bed types, and pricing guide, 3) Hotel contact details, address, and Google Maps pin, 4) List of facilities (Wi-Fi, pool, parking, restaurant, conference hall), and 5) Any specific hotel policies (check-in/check-out times, cancellation rules). If you do not have photography yet, we can guide you on the best shots or recommend professional architectural photographers.",
      category: "development",
      sortOrder: 12,
    },
  ];

  for (const faq of faqs) {
    await prisma.faqItem.create({
      data: faq,
    });
  }
  console.log(`Seeded ${faqs.length} FAQs.`);

  // 6. Business Settings
  const settings = [
    { key: "business_name", value: "Grandeur Digital — Hotel Web Architecture", description: "Official business name" },
    { key: "tagline", value: "We Turn Hotels Into Digital Experiences.", description: "Brand tagline" },
    { key: "location", value: "Prayagraj, Uttar Pradesh, India", description: "Headquarters location" },
    { key: "coverage", value: "Prayagraj, Varanasi, Lucknow, Kanpur, Jaipur, and clients throughout India", description: "Service coverage" },
    { key: "phone", value: "+91 98765 43210", description: "Direct voice line" },
    { key: "whatsapp", value: "+919876543210", description: "WhatsApp Business phone with country code" },
    { key: "email", value: "concierge@grandeurlabs.com", description: "Primary contact email" },
    { key: "portfolio_url", value: "https://grandeurlabs.com", description: "Production portfolio URL" },
  ];

  for (const s of settings) {
    await prisma.businessSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log("Seeded business settings.");

  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
