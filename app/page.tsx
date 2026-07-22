import type { Metadata } from "next";

import DesktopHome from "@/components/DesktopHome";
import MobileHome from "@/components/MobileHome";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
 
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://zulario.com/#organization",
  name: "Zulario",
  url: "https://zulario.com",
  logo: {
    "@type": "ImageObject",
    url: "https://zulario.com/apple-touch-icon.png",
  },
  sameAs: [
    "https://instagram.com/myzulario/",
    "https://tiktok.com/@myzulario",
    "https://x.com/myzulario",
    "https://facebook.com/myzulario/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://zulario.com/#website",
  name: "Zulario",
  url: "https://zulario.com",
  description:
    "A travel personality quiz that matches people with destinations based on their personality, preferences, and travel style.",
  publisher: {
    "@id": "https://zulario.com/#organization",
  },
  inLanguage: "en",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <div className="hidden md:block">
        <DesktopHome />
      </div>

      <div className="md:hidden">
        <MobileHome />
      </div>
    </>
  );
}