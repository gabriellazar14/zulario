"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createQuizGroup } from "@/lib/supabase";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

function DestinationCard({
  image,
  title,
  type,
  match,
  featured = false,
  className = "",
  onClick,
}: {
  image: string;
  title: string;
  type: string;
  match: string;
  featured?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{ clipPath: "inset(0 round 32px)" }}
      className={`group relative overflow-hidden rounded-[32px] isolate transform-gpu bg-transparent shadow-[0_25px_70px_rgba(0,0,0,0.55)] transition duration-500 ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />

      <div className="absolute top-7 left-7">
        <div
          className={`rounded-full border-4 border-[#6d5dfc] bg-black/25 backdrop-blur-md flex items-center justify-center ${
            featured ? "w-20 h-20 text-xl" : "w-16 h-16 text-base"
          }`}
        >
          {match}
        </div>

        <div className="mt-2 text-xs tracking-widest text-white/70 text-center">
          MATCH
        </div>
      </div>

      <div className="absolute bottom-7 left-7 right-7">
        <h3
          style={{ textShadow: "0 3px 12px rgba(0,0,0,0.9)" }}
          className={`font-bold tracking-[-0.04em] ${
            featured ? "text-4xl" : "text-2xl"
          }`}
        >
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-3 text-white/85">
          <span className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center bg-black/20">
            {type === "Mountain Explorer"
              ? "⛰️"
              : type === "Urban Discoverer"
              ? "🏙️"
              : type === "Beach Lover"
              ? "🌊"
              : "✨"}
          </span>

          <span className={featured ? "text-lg" : "text-sm"}>{type}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);
const [showCookies, setShowCookies] = useState(false);
const [showCookiePreferences, setShowCookiePreferences] = useState(false);
const [analyticsCookies, setAnalyticsCookies] = useState(false);
const [personalizationCookies, setPersonalizationCookies] = useState(false);

useEffect(() => {
  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    setShowCookies(true);
  }
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

  setShowCookies(false);
  setShowCookiePreferences(false);
};
  const destinations = [
    {
      image: "/images/kilimanjaro.jpg",
      title: "Kilimanjaro",
      type: "Mountain Explorer",
      match: "91%",
    },
    {
      image: "/images/seychelles.jpg",
      title: "Seychelles",
      type: "Beach Lover",
      match: "97%",
    },
    {
      image: "/images/paris.jpg",
      title: "Paris",
      type: "Urban Discoverer",
      match: "94%",
    },
  ];

  const startGroupQuiz = async () => {
    const group = await createQuizGroup();
    if (!group) return;
    router.push(`/group/${group.id}`);
  };

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative bg-[#050B1F]">
      {/* ONE CONTINUOUS BACKGROUND */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(59,130,246,0.24), transparent 34%), radial-gradient(circle at 18% 72%, rgba(124,108,255,0.13), transparent 38%), linear-gradient(135deg, #030712 0%, #071326 48%, #112044 100%)",
        }}
      />

      {/* SOFT PAGE GLOWS */}
      <div className="pointer-events-none absolute top-20 left-[-120px] w-[420px] h-[420px] bg-indigo-500/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-10 right-0 w-[520px] h-[520px] bg-blue-500/20 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-[42%] right-[12%] w-[360px] h-[360px] bg-purple-500/10 rounded-full blur-[130px]" />

      {/* NAV */}
      <header className="absolute top-0 left-0 w-full z-30 px-8 md:px-8 py-0 flex items-center justify-between">
<div className="mt-4 ml-6 flex flex-col items-start">
  <img
    src="/zulario.png"
    alt="Zulario Logo"
    className="h-20 w-auto"
  />

  <span className="ml-7 -mt-2 text-[9px] uppercase tracking-[0.3em] text-white/45">
    Travel made personal
  </span>
</div>
        <nav className="hidden md:flex gap-8 text-sm text-white/75 mr-12">
        {/*  <Link href="/destinations" className="hover:text-white transition">
            Explore
          </Link>*/}
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col lg:flex-row pt-28 pb-16">
 <div className="flex-1 px-16 md:px-20 flex flex-col justify-center">

    <h1 className="mt-54text-5xl md:text-5xl font-bold leading-[1.05] tracking-[-1px] mb-6 max-w-3xl">
      Discover destinations that match who you are
    </h1>
          <p className="text-lg text-white/70 mb-9 max-w-md leading-relaxed">
            Travel is personal. Find places aligned with your personality,
            energy, and travel style.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/quiz">
             <button className="px-6 py-4 rounded-xl text-white font-semibold
bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc]
shadow-lg hover:scale-105 transition">         Take the Quiz
              </button>
            </Link>

            <button
              onClick={startGroupQuiz}
              className="px-6 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition"
            >
              Create Group Match
            </button>
          </div>

          <div className="flex flex-col gap-2 text-sm text-white/65">
          <span>✓ Free Travel Personality Test</span>
            <span>✓ 50+ Curated Destinations</span>
            <span>✓ Personality-Based Matching</span>
            <span>✓ Solo & Group Travel Quizzes</span>
          </div>
        </div>

       <div className="relative h-full flex items-center justify-center -translate-y-8">   <div className="relative z-10 w-[760px] h-[560px]">
       <motion.div
  layout
  className="relative h-full flex items-center justify-center -translate-y-8"
>

  {(() => {
    const leftIndex = (activeIndex + 1) % destinations.length;
    const rightIndex = (activeIndex + 2) % destinations.length;

    const left = destinations[leftIndex];
    const active = destinations[activeIndex];
    const right = destinations[rightIndex];

    return (
      <>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="z-10 hover:z-50 -mr-16 translate-y-6"
        >
          <DestinationCard
            {...left}
            onClick={() => setActiveIndex(leftIndex)}
            className="w-[220px] h-[340px] rotate-[-6deg] brightness-130 cursor-pointer"
          />
        </motion.div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="z-30"
        >
          <DestinationCard
            {...active}
            featured
            className="w-[280px] h-[390px] rotate-[2deg] brightness-130"
          />
        </motion.div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="z-10 hover:z-50 -ml-16 translate-y-6"
        >
          <DestinationCard
            {...right}
            onClick={() => setActiveIndex(rightIndex)}
            className="w-[220px] h-[340px] rotate-[6deg] brightness-130 cursor-pointer"
          />
        </motion.div>
      </>
    );
  })()}
</motion.div>

   <div className="absolute bottom-20 left-1/2 z-40 flex -translate-x-1/2 gap-2">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? "bg-[#6d5dfc] scale-125"
                      : "bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <div className="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-4">
            How It Works
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find destinations that fit you
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Zulario looks beyond popularity and matches destinations to your
            personality, travel style, and the type of experience you're looking
            for right now.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "1",
              title: "Take the Quiz",
              text: "Answer a few questions about your personality, energy, travel preferences, and what kind of trip you want most right now.",
            },
            {
              n: "2",
              title: "We Build Your Travel Profile",
              text: "We identify the travel environments, cultures, activities, and atmospheres where you'll feel most at home.",
            },
            {
              n: "3",
              title: "Discover Your Matches",
              text: "Receive destinations that align with who you are, not just what's trending. Every recommendation comes with a detailed description.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-xl font-bold text-blue-300 mb-6">
                {step.n}
              </div>

              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/70 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
{showCookies && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl rounded-3xl border border-white/10 bg-[#0b1220]/95 backdrop-blur-2xl shadow-2xl p-6">
    {!showCookiePreferences ? (
      <>
        <h3 className="text-xl font-semibold mb-2">
          🍪 Your Privacy Matters
        </h3>

        <p className="text-white/70 text-sm leading-relaxed mb-3">
          We use cookies to improve your experience, remember your travel
          preferences, and analyze website usage.
        </p>

        <p className="text-white/45 text-xs mb-5">
          Read our{" "}
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={acceptCookies}
            className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] font-semibold hover:scale-105 transition"
          >
            Accept All
          </button>

          <button
            onClick={rejectCookies}
            className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
          >
            Reject Non-Essential
          </button>

          <button
            onClick={() => setShowCookiePreferences(true)}
            className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
          >
            Manage Preferences
          </button>
        </div>
      </>
    ) : (
      <>
        <h3 className="text-xl font-semibold mb-2">
          Cookie Preferences
        </h3>

        <p className="text-white/60 text-sm mb-5">
          Choose which optional cookies Zulario can use.
        </p>

        <div className="space-y-4 mb-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold">Necessary Cookies</h4>
                <p className="text-white/55 text-sm">
                  Required for security and basic website functionality.
                </p>
              </div>
              <span className="text-sm text-white/45">Always Active</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold">Analytics Cookies</h4>
                <p className="text-white/55 text-sm">
                  Help us understand how visitors use Zulario.
                </p>
              </div>

              <input
                type="checkbox"
                checked={analyticsCookies}
                onChange={(e) => setAnalyticsCookies(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold">Personalization Cookies</h4>
                <p className="text-white/55 text-sm">
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
            className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] font-semibold hover:scale-105 transition"
          >
            Save Preferences
          </button>

          <button
            onClick={() => setShowCookiePreferences(false)}
            className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
          >
            Back
          </button>
        </div>
      </>
    )}
  </div>
)}

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl font-light tracking-wider text-white mb-3">
                zulario
              </h3>
              <p className="text-white/60 leading-relaxed max-w-sm">
                Discover destinations that match your personality, travel style,
                and the experiences you're looking for.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white/90">Explore</h4>
              <div className="flex flex-col gap-1 text-white/60">
                <Link href="/quiz">Take the Quiz</Link>
                <Link href="/destinations">Destinations</Link>
                <Link href="/about">About</Link>
                <Link href="/faq">FAQ</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white/90">
                Travel Matching
              </h4>
              <ul className="space-y-2 text-white/60">
                <li>✓ Personality-based recommendations</li>
                <li>✓ Emotional destination matching</li>
                <li>✓ Solo & group travel compatibility</li>
                <li>✓ Beyond popularity rankings</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Zulario. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-sm text-white/50">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>

              <a href="https://instagram.com/myzulario/" target="_blank">
                <FaInstagram size={20} />
              </a>
              <a href="https://tiktok.com/@myzulario" target="_blank">
                <FaTiktok size={20} />
              </a>
              <a href="https://x.com/myzulario" target="_blank">
                <FaXTwitter size={20} />
              </a>
              <a href="https://facebook.com/myzulario/" target="_blank">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}