"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";




function DestinationCard({
  image,
  title,
  type,
  match,
  featured = false,
  priority = false,
  className = "",
  onClick,
}: {
  image: string;
  title: string;
  type: string;
  match: string;
  featured?: boolean;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{ clipPath: "inset(0 round 32px)" }}
      className={`group relative overflow-hidden rounded-[32px] isolate transform-gpu bg-transparent shadow-[0_25px_70px_rgba(0,0,0,0.55)] transition duration-500 ${className}`}
    >
      <Image
  src={image}
  alt={title}
  fill
    priority={priority}
  sizes="(max-width: 768px) 220px, 280px"
  className="object-cover transition-transform duration-700 group-hover:scale-110"
/>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />

      <div className="absolute top-7 left-7">
{(() => {
  const percentage = Number(String(match).replace("%", ""));
  const size = featured ? 68 : 56;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="rgba(0,0,0,0.25)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#8b5cf6"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className={`absolute inset-0 flex items-center justify-center font-bold ${
          featured ? "text-xl" : "text-base"
        }`}
      >
        {match}
      </div>
    </div>
  );
})()}

        <div className="mt-2 text-xs tracking-widest text-white/70 text-center">
          MATCH
        </div>
      </div>

      <div className="absolute bottom-7 left-7 right-7">
 <p
  style={{ textShadow: "0 3px 12px rgba(0,0,0,0.9)" }}
  className={`font-bold tracking-[-0.04em] ${
    featured
      ? "text-2xl md:text-3xl"
      : "text-lg md:text-xl"
  }`}
>
  {title}
</p>
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

          <span
  className={`${
    featured
  ? "text-base md:text-lg"
  : "text-[11px] md:text-xs"
  } whitespace-nowrap`}
>
  {type}
</span>
        </div>
      </div>
    </div>
  );
}

export default function DesktopHome() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);




const destinations = [
  {
    image: "https://rtqumvrfhrnzhnommtyb.supabase.co/storage/v1/object/public/zulario_images/kilimanjaro.webp",
    title: "Kilimanjaro",
    type: "Mountain Explorer",
    match: "91%",
  },
  {
    image: "https://rtqumvrfhrnzhnommtyb.supabase.co/storage/v1/object/public/zulario_images/seychelles.webp",
    title: "Seychelles",
    type: "Beach Lover",
    match: "97%",
  },
  {
    image: "https://rtqumvrfhrnzhnommtyb.supabase.co/storage/v1/object/public/zulario_images/paris.webp",
    title: "Paris",
    type: "Urban Discoverer",
    match: "94%",
  },
];

const startGroupQuiz = async () => {
  const newTab = window.open("", "_blank");

  try {
    const { createQuizGroup } = await import("@/lib/supabase");

    const group = await createQuizGroup();

    if (!group) {
      newTab?.close();
      return;
    }

    if (newTab) {
      newTab.location.href = `/group/${group.id}`;
    } else {
      router.push(`/group/${group.id}`);
    }
  } catch (error) {
    console.error("Unable to create quiz group:", error);
    newTab?.close();
  }
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
<Link
  href="/"
  aria-label="Go to Zulario homepage"
>
<Image
  src="/zulario.png"
  alt="Zulario Logo"
  width={167}
  height={80}
  priority
/>
</Link>
  <span className="ml-7 -mt-2 text-[9px] uppercase tracking-[0.3em] text-white/60">
    Travel made personal
  </span>
</div>
        <nav className="hidden md:flex gap-8 text-sm text-white/75 mr-12">
             <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col lg:flex-row pt-24 pb-8 md:pt-28 md:pb-20">
 <div className="flex-1 px-6 md:px-20 flex flex-col justify-center mt-8 md:mt-0">

    <h1 className="mt-1 text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-1px] mb-6 max-w-3xl">
      Discover destinations that match who you are
    </h1>
          <p className="text-lg text-white/70 mb-7 max-w-md leading-relaxed">
            Travel is personal. Find places aligned with your personality,
            energy, and travel style.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
<Link
  href="/quiz"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex items-center justify-center
    w-full md:w-auto
    px-6 py-4
    rounded-xl
    text-white font-semibold
    bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc]
    shadow-lg hover:scale-105 transition
  "
>
  Take the Quiz
</Link>

            <button
              onClick={startGroupQuiz}
              className="
w-full md:w-auto
px-6 py-4
rounded-xl
border border-white/15
bg-white/5
text-white font-semibold
hover:bg-white/10 transition" 
aria-label="Create a new group travel quiz"
            >
              Create Group Quiz
            </button>
          </div>

          <div className="flex flex-col gap-2 text-sm text-white/65">
          <span>✓ Free Travel Personality Test</span>
            <span>✓ 500+ Curated Destinations</span>
            <span>✓ Personality-Based Matching</span>
            <span>✓ Solo & Group Travel Quizzes</span>
          </div>
        </div>

       <div className="
relative h-full
flex items-center justify-center
mt-8 md:mt-0
translate-y-0 md:-translate-y-8
">  
         <div className="relative z-10 w-[340px] h-[300px] sm:w-[420px] sm:h-[360px] md:w-[760px] md:h-[560px]">
<motion.div
  layout
  className="
    relative h-full
    flex items-center justify-center
    translate-y-0 md:-translate-y-8"
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
          className="
z-10 hover:z-50
-mr-8 md:-mr-16
translate-y-4 md:translate-y-6
"
        >
          <DestinationCard
            {...left}
             priority={false}
            onClick={() => setActiveIndex(leftIndex)}
            className="
w-[125px] h-[185px]
sm:w-[155px] sm:h-[235px]
md:w-[220px] md:h-[340px]
rotate-[-6deg] brightness-130 cursor-pointer
"
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
             priority
            className="
w-[165px] h-[230px]
sm:w-[200px] sm:h-[280px]
md:w-[280px] md:h-[390px]
rotate-[2deg] brightness-130
"
          />
        </motion.div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="
z-10 hover:z-50
-ml-8 md:-ml-16
translate-y-4 md:translate-y-6
"
        >
          <DestinationCard
            {...right}
            priority={false}
            onClick={() => setActiveIndex(rightIndex)}
            className="
w-[125px] h-[185px]
sm:w-[155px] sm:h-[235px]
md:w-[220px] md:h-[340px]
rotate-[6deg] brightness-130 cursor-pointer
"
          />
        </motion.div>
      </>
    );
  })()}
</motion.div>

<div className="absolute bottom-12 md:bottom-20 left-1/2 z-40 flex -translate-x-1/2 gap-1">
  {destinations.map((_, index) => (
    <button
      key={index}
      onClick={() => setActiveIndex(index)}
      aria-label={`Go to ${destinations[index].title}`}
      aria-current={activeIndex === index ? "true" : undefined}
      className="w-10 h-10 flex items-center justify-center"
    >
      <span
        className={`block w-2.5 h-2.5 rounded-full transition-all ${
          activeIndex === index
            ? "bg-[#6d5dfc] scale-125"
            : "bg-white/25"
        }`}
      />
    </button>
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

   {/* FOOTER */}
<footer className="relative z-10 border-t border-white/10">
  <div className="max-w-6xl mx-auto px-6 py-12">
    <div className="grid md:grid-cols-[2fr_1fr_1.25fr] gap-10 items-start">
      {/* Brand */}
      <div>
      <p className="text-2xl font-light tracking-wider text-white mb-1">
  zulario
</p>

        <span className="block text-[9px] uppercase tracking-[0.3em] text-white/60 mb-5">
          Travel made personal
        </span>

        <p className="text-white/55 leading-relaxed max-w-sm">
          Discover destinations that match who you are
        </p>
      </div>

      {/* Explore */}
      <div>
        <h4 className="font-semibold mb-3 text-white/90">Explore</h4>

        <div className="flex flex-col gap-2 text-white/60">
          <Link href="/quiz" className="hover:text-white transition-colors">
            Take the Quiz
          </Link>

          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>

          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </div>
      </div>

      {/* Travel Matching */}
      <div>
        <h4 className="font-semibold mb-3 text-white/90">
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

    {/* Bottom */}
    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
      <p className="text-sm text-white/60">
        © 2026 Zulario. All rights reserved.
      </p>

     <div className="flex items-center gap-6">
  <Link
    href="/privacy"
    className="text-sm text-white/50 hover:text-white transition-colors"
  >
    Privacy
  </Link>

  <Link
    href="/terms"
    className="text-sm text-white/50 hover:text-white transition-colors"
  >
    Terms
  </Link>

  <button
    type="button"
    onClick={() =>
      window.dispatchEvent(new Event("open-cookie-preferences"))
    }
    className="text-sm text-white/50 hover:text-white transition-colors"
  >
    Cookies
  </button>


 <a
  href="https://instagram.com/myzulario/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Follow Zulario on Instagram"
>
  <FaInstagram size={18} />
</a>

        <a
          href="https://tiktok.com/@myzulario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Follow Zulario on TikTok"
        >
          <FaTiktok size={18} />
        </a>

        <a
          href="https://x.com/myzulario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Follow Zulario on X"
        >
          <FaXTwitter size={18} />
        </a>

        <a
          href="https://facebook.com/myzulario/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Follow Zulario on Facebook"
        >
          <FaFacebookF size={18} />
        </a>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}