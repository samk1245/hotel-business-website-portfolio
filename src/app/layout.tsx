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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://github.com/samk1245/hotel-business-website-portfolio"),
  title: {
    default: "Samir Khan — Hotel Web Developer in Prayagraj | Direct Bookings & Business Growth",
    template: "%s | Samir Khan",
  },
  description:
    "I am Samir Khan, a hotel website developer from Prayagraj, UP. I build modern websites for hotels, resorts, and homestays to cut heavy OTA commissions and drive business growth.",
  keywords: [
    "Samir Khan web developer",
    "hotel website developer in Prayagraj",
    "hotel website design Allahabad",
    "hotel website development Uttar Pradesh",
    "resort website developer India",
    "direct hotel booking engine",
    "homestay website design",
    "affordable hotel website developer"
  ],
  authors: [{ name: "Samir Khan", url: "https://github.com/samk1245/hotel-business-website-portfolio" }],
  creator: "Samir Khan",
  publisher: "Samir Khan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://github.com/samk1245/hotel-business-website-portfolio",
    title: "Samir Khan — Hotel Website Developer (Prayagraj, UP)",
    description:
      "Modern, high-converting hotel websites starting from ₹4,999. Direct WhatsApp bookings, Google Maps 3-Pack SEO, and commission-cutting direct reservation engines.",
    siteName: "Samir Khan — Hotel Web Architecture",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Samir Khan - Hotel Web Architecture Prayagraj",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samir Khan",
    jobTitle: "Hotel Website Developer & Business Growth Specialist",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prayagraj",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    telephone: "+91 7887087151",
    email: "samirkhan5287914@gmail.com",
    url: "https://github.com/samk1245/hotel-business-website-portfolio",
    sameAs: ["https://github.com/samk1245/hotel-business-website-portfolio"],
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
