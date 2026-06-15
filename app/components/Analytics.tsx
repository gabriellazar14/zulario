"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) return;

    try {
      const parsed = JSON.parse(consent);
      setAnalyticsAllowed(parsed.analytics === true);
    } catch {
      setAnalyticsAllowed(consent === "accepted");
    }
  }, []);

  if (!analyticsAllowed) return null;

  return (
    <>
      <GoogleAnalytics gaId="G-7GFNDWQLJS" />

      <Script id="microsoft-clarity" strategy="afterInteractive">
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