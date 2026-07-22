import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import AnalyticsScripts from "@/components/AnalyticsScripts";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#6d5dfc",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zulario.com"),

  title: {
    default: "Zulario | Discover Your Next Travel Destination",
    template: "%s | Zulario",
  },

  description:
    "Take Zulario's travel personality quiz and discover destinations that truly match your travel style. Explore over 500 cities, beaches, mountains, and unique experiences worldwide.",

  keywords: [
    "travel quiz",
    "travel personality quiz",
    "travel personality",
    "travel recommendations",
    "travel destination finder",
    "where should I travel",
    "where to travel next",
    "vacation ideas",
    "holiday destinations",
    "travel inspiration",
    "city breaks",
    "beach holidays",
    "mountain destinations",
    "romantic getaways",
    "solo travel",
    "couples travel",
    "travel planner",
    "Zulario",
  ],

  applicationName: "Zulario",

  authors: [
    {
      name: "Zulario",
    },
  ],

  creator: "Zulario",

  publisher: "Zulario",

  category: "Travel",

  manifest: "/site.webmanifest",


  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  openGraph: {
    title: "Zulario | Discover Your Next Travel Destination",
    description:
      "Find destinations that match your personality with Zulario's travel quiz.",
    url: "https://zulario.com",
    siteName: "Zulario",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zulario Travel Quiz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zulario | Discover Your Next Travel Destination",
    description:
      "Take the travel personality quiz and discover destinations made for you.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
 <body className={inter.className}>
  {children}

  <AnalyticsScripts />
  <CookieBanner />
</body>
    </html>
  );
}