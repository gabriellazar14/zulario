"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  personalization: boolean;
};

export default function CookieBanner() {
  const [showCookies, setShowCookies] = useState(false);
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [personalizationCookies, setPersonalizationCookies] =
    useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShowCookies(true);
    }

    const handleOpenPreferences = () => {
      setShowCookies(true);
      openCookiePreferences();
    };

    window.addEventListener(
      "open-cookie-preferences",
      handleOpenPreferences
    );

    return () => {
      window.removeEventListener(
        "open-cookie-preferences",
        handleOpenPreferences
      );
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        necessary: true,
        analytics: true,
        personalization: true,
      })
    );

    window.dispatchEvent(
      new Event("cookie-consent-updated")
    );

    setShowCookies(false);
  };

  const rejectCookies = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        personalization: false,
      })
    );

    window.dispatchEvent(
      new Event("cookie-consent-updated")
    );

    setShowCookies(false);
  };

  const saveCookiePreferences = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        necessary: true,
        analytics: analyticsCookies,
        personalization: personalizationCookies,
      })
    );

    window.dispatchEvent(
      new Event("cookie-consent-updated")
    );

    setShowCookies(false);
    setShowCookiePreferences(false);
  };

  const openCookiePreferences = () => {
    const saved = localStorage.getItem("cookieConsent");

    if (saved) {
      try {
        const consent: CookieConsent = JSON.parse(saved);

        setAnalyticsCookies(consent.analytics ?? false);
        setPersonalizationCookies(
          consent.personalization ?? false
        );
      } catch {
        setAnalyticsCookies(false);
        setPersonalizationCookies(false);
      }
    }

    setShowCookiePreferences(true);
  };

  if (!showCookies) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl rounded-3xl border border-white/10 bg-[#0b1220]/95 backdrop-blur-2xl shadow-2xl p-6">
      {!showCookiePreferences ? (
        <>
          <h3 className="text-xl font-semibold text-white mb-2">
            🍪 Your Privacy Matters
          </h3>

          <p className="text-white text-sm leading-relaxed mb-3"> 
            We use cookies to improve your experience,
            remember your travel preferences, and analyze
            website usage.
          </p>

<p className="text-white text-sm mb-5">
  Read our{" "}
  <Link
    href="/privacy"
    className="underline text-white hover:text-[#8ea7ff]"
  >
    Privacy Policy
  </Link>
  .
</p>

          <div className="flex flex-wrap gap-3">
    <button
  onClick={acceptCookies}
  aria-label="Accept all cookies"
  className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition"
>
  Accept All
</button>

   <button
  onClick={rejectCookies}
  style={{ color: "#ffffff" }}
  className="px-5 py-3 rounded-xl border border-white/15 bg-white/5"
>
  Reject Non-Essential
</button>

            <button
              onClick={openCookiePreferences}
              aria-label="Manage cookie preferences"
             className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
            >
              Manage Preferences
            </button>
          </div>
        </>
      ) : (
      <>
  <h3 className="text-xl font-semibold text-white mb-2">
    Cookie Preferences
  </h3>

  <p className="text-white/70 text-sm mb-5">
    Choose which optional cookies Zulario can use.
  </p>

  <div className="space-y-4 mb-6">
    {/* Necessary */}
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4 min-h-[48px]">
        <div>
          <h4 className="font-semibold text-white">
            Necessary Cookies
          </h4>

          <p className="text-white/70 text-sm">
            Required for security and basic website functionality.
          </p>
        </div>

        <span className="text-sm text-white/70">
          Always Active
        </span>
      </div>
    </div>

    {/* Analytics */}
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4 min-h-[48px]">
        <div>
          <h4 className="font-semibold text-white">
            Analytics Cookies
          </h4>

          <p className="text-white/70 text-sm">
            Help us understand how visitors use Zulario.
          </p>
        </div>

        <input
          type="checkbox"
          checked={analyticsCookies}
          onChange={(e) =>
            setAnalyticsCookies(e.target.checked)
          }
          className="w-5 h-5"
        />
      </div>
    </div>

    {/* Personalization */}
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4 min-h-[48px]">
        <div>
          <h4 className="font-semibold text-white">
            Personalization Cookies
          </h4>

          <p className="text-white/70 text-sm">
            Remember your travel preferences and improve matching.
          </p>
        </div>

        <input
          type="checkbox"
          checked={personalizationCookies}
          onChange={(e) =>
            setPersonalizationCookies(e.target.checked)
          }
          className="w-5 h-5"
        />
      </div>
    </div>
  </div>

  <div className="flex flex-wrap gap-3">
 <button
  onClick={saveCookiePreferences}
  aria-label="Save cookie preferences"
  className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition"
>
  Save Preferences
</button>

    <button
      onClick={() => setShowCookiePreferences(false)}
      aria-label="Go back to cookie banner"
      className="px-5 py-3 rounded-xl border border-white/20 bg-white/10 text-white/90 hover:bg-white/15 transition"
    >
      Back
    </button>

          </div>
        </>
      )}
    </div>
  );
}