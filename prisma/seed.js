const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with updated affordable packages & Samir Khan credentials...");

  // 1. Admin User
  const defaultPassword = "Admin@Grandeur2026!";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: "samirkhan5287914@gmail.com" },
    update: {
      passwordHash,
    },
    create: {
      email: "samirkhan5287914@gmail.com",
      name: "Samir Khan",
      passwordHash,
      role: "SUPERADMIN",
    },
  });
  console.log("Admin account ready: samirkhan5287914@gmail.com");

  // 2. Affordable Pricing Packages
  const packages = [
    {
      key: "starter",
      name: "Starter Stay",
      subtitle: "For boutique stays, homestays & verified guest-houses establishing digital credibility",
      basePrice: 4999,
      pageLimit: 5,
      description: "Clean, responsive 5-page hotel website with direct WhatsApp concierge, location maps, room cards, and mobile-first speed.",
      highlights: JSON.stringify([
        "Up to 5 custom-designed responsive pages",
        "Home, Rooms, Facilities, Gallery & Contact sections",
        "High-conversion WhatsApp enquiry button",
        "Interactive Google Maps & direct routing",
        "Basic on-page SEO & Google Local Business optimization",
        "Contact & Room Enquiry form (Email + Database)",
        "Mobile & tablet responsive perfection",
        "SSL security & lightning-fast hosting setup"
      ]),
      isPopular: false,
      sortOrder: 1,
    },
    {
      key: "signature",
      name: "Signature Growth Hotel",
      subtitle: "For independent city hotels & resorts cutting OTA commissions",
      basePrice: 11999,
      pageLimit: 8,
      description: "Bespoke hotel website with individual room detail layouts, seasonal offer showcases, click-to-call, and structured inquiry capture.",
      highlights: JSON.stringify([
        "Up to 8 tailored pages & custom hotel branding",
        "Dedicated room categories & individual suite showcase pages",
        "Filterable high-resolution image gallery & seasonal offers",
        "Integrated WhatsApp & direct phone concierge triggers",
        "Structured booking enquiry modal with date & guest picker",
        "Google Maps directions & local attraction guide",
        "Local SEO & Schema.org Hotel markup for Google 3-Pack ranking",
        "Digital QR Code in-room dining menu",
        "Google 5-Star guest review booster widget"
      ]),
      isPopular: true,
      sortOrder: 2,
    },
    {
      key: "luxury",
      name: "Luxury Experience & 3D",
      subtitle: "For luxury heritage havelis, high-end resorts & destination boutique hotels",
      basePrice: 19999,
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
      basePrice: 29999,
      pageLimit: 14,
      description: "Complete direct booking engine integration, room inventory workflow, payment gateway integration, and reservation email confirmations.",
      highlights: JSON.stringify([
        "Everything included in the Signature or Luxury scope",
        "Booking engine integration (Sirvoy, Cloudbeds, eZee, or custom)",
        "Live room availability lookup & guest reservation journey",
        "Automated booking confirmation emails for guests & staff",
        "Payment gateway integration (Razorpay / Stripe / PhonePe / UPI)",
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
      name: "Custom 3D Landmark Experience",
      subtitle: "For marquee luxury resorts, palace hotels & experiential architectural landmarks",
      basePrice: 39999,
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

  // 3. Business Settings
  const settings = [
    { key: "developer_name", value: "Samir Khan", description: "Lead Hotel Web Developer" },
    { key: "business_name", value: "Samir Khan — Hotel Web Architecture", description: "Official business name" },
    { key: "tagline", value: "We Build Websites That Turn Hotel Visitors Into Direct Bookings.", description: "Brand tagline" },
    { key: "location", value: "Prayagraj, Uttar Pradesh, India", description: "Developer headquarters" },
    { key: "coverage", value: "Prayagraj, Varanasi, Lucknow, Kanpur, Ayodhya, Jaipur & All India", description: "Service coverage" },
    { key: "phone", value: "+91 7887087151", description: "Direct voice line" },
    { key: "whatsapp", value: "7887087151", description: "WhatsApp number" },
    { key: "email", value: "samirkhan5287914@gmail.com", description: "Primary contact email" },
    { key: "portfolio_url", value: "https://github.com/samk1245/hotel-business-website-portfolio", description: "GitHub repository URL" },
  ];

  for (const s of settings) {
    await prisma.businessSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }

  console.log("Database re-seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
