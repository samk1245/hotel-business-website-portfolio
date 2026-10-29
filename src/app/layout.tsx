import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://grandeurlabs.com"),
  title: {
    default: "Grandeur Digital — Hotel Website Development & 3D Web Design",
    template: "%s | Grandeur Digital",
  },
  description:
    "We design and develop modern hotel websites that turn online visitors into direct guest bookings. Serving Prayagraj, Uttar Pradesh, Jaipur, and luxury hotels across India.",
  keywords: [
    "hotel website developer in Prayagraj",
    "hotel website design Allahabad",
    "hotel website development in Uttar Pradesh",
    "resort website development India",
    "hotel booking website developer",
    "luxury hotel website design in India",
    "3D hotel website developer",
    "direct hotel booking engine integration"
  ],
  authors: [{ name: "Grandeur Digital Studio" }],
  creator: "Grandeur Digital",
  publisher: "Grandeur Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://grandeurlabs.com",
    title: "Grandeur Digital — We Turn Hotels Into Digital Experiences",
    description:
      "Bespoke hotel websites, 3D WebGL architectures, and direct WhatsApp booking engines for luxury resorts and boutique stays in India.",
    siteName: "Grandeur Digital",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Grandeur Digital - Luxury Hotel Web Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grandeur Digital — Hotel Website Development",
    description:
      "We design and develop modern hotel websites that turn online visitors into direct guest bookings.",
    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Grandeur Digital — Hotel Web Architecture",
    description:
      "Modern hotel website design, luxury 3D WebGL scenes, and direct booking engine development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prayagraj",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Prayagraj" },
      { "@type": "City", name: "Varanasi" },
      { "@type": "City", name: "Lucknow" },
      { "@type": "City", name: "Kanpur" },
      { "@type": "City", name: "Jaipur" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "₹7,999 - ₹59,999+",
    telephone: process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210",
    email: process.env.NEXT_PUBLIC_EMAIL || "concierge@grandeurlabs.com",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://grandeurlabs.com",
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
