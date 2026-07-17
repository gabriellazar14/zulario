"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  personalization: boolean;
};

export default function AnalyticsScripts() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      try {
        const saved = localStorage.getItem("cookieConsent");

        if (!saved) {
          setAnalyticsAllowed(false);
          return;
        }

        const consent = JSON.parse(saved) as CookieConsent;
        setAnalyticsAllowed(consent.analytics === true);
      } catch {
        setAnalyticsAllowed(false);
      }
    };

    updateConsent();

    window.addEventListener("cookie-consent-updated", updateConsent);
    return () => {
      window.removeEventListener("cookie-consent-updated", updateConsent);
    };
  }, []);

  if (!analyticsAllowed) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7GFNDWQLJS"
        strategy="lazyOnload"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'G-7GFNDWQLJS');
        `}
      </Script>

      <Script id="microsoft-clarity" strategy="lazyOnload">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);
            t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x5avisbaft");
        `}
      </Script>
    </>
  );
}