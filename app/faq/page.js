"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function FAQPage() {
 const faqs = [
{
q: "How does Zuralio match me with destinations?",
a: "Zuralio compares your quiz answers with destination profiles built around atmosphere, pace, culture, nature, adventure, romance, climate, and emotional travel style. It looks for places that feel aligned with who you are and the type of experience you want right now.",
},
{
q: "Is Zuralio powered by AI?",
a: "Yes. Zuralio uses AI-assisted matching combined with structured destination data and travel personality signals to recommend destinations that fit your preferences and travel style.",
},
{
q: "Are the results personalized?",
a: "Yes. Your recommendations are based on your own quiz answers, preferences, and travel mindset. Different answers can produce completely different destination matches.",
},
{
q: "Why did I get a specific destination?",
a: "Every destination has its own emotional signature, atmosphere profile, personality alignment, and travel characteristics. Zuralio compares those signals with your answers to find the strongest match.",
},
{
q: "Is Zuralio based on popularity rankings?",
a: "No. Popularity is only one possible factor. A destination can be famous or completely underrated—what matters most is how well it matches your travel personality and preferences.",
},
{
q: "Can I choose nearby destinations only?",
a: "Yes. If you prefer nearby travel, Zuralio can prioritize destinations closer to your region and reduce long-distance recommendations.",
},
{
q: "Can I still discover destinations anywhere in the world?",
a: "Absolutely. If you are open to worldwide travel, Zuralio expands the search globally and focuses on finding the best emotional and personality match.",
},
{
q: "Can I take the quiz with friends?",
a: "Yes. You can create a Group Quiz, invite friends, and discover destinations that match the entire group rather than just one traveler.",
},
{
q: "How many destinations does Zuralio analyze?",
a: "Zuralio currently analyzes hundreds of destinations around the world and continuously expands its destination library with new cities, regions, and travel experiences.",
},
{
q: "Is Zuralio free to use?",
a: "Yes. The travel personality quiz, destination matching, destination library, and group quiz features are currently free to use.",
},
{
q: "Do I need an account?",
a: "No. You can take the quiz and use group matching without creating an account. An email address is only requested if you choose to save your results.",
},
{
q: "What happens to my data?",
a: "Quiz answers, optional feedback, and saved email addresses are processed according to our Privacy Policy. Zuralio does not sell your personal information.",
},
{
q: "Can Zuralio help me plan my trip too?",
a: "That is part of our long-term vision. We aim to evolve from destination matching into personalized itineraries, activity suggestions, and intelligent travel planning.",
},
];


  return (
    <main className="min-h-screen bg-[#070b16] text-white overflow-hidden relative px-6 py-12">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#070b16]/90 to-blue-950/70" />

      {/* GLOW */}
      <div className="absolute top-40 right-20 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />

      {/* MAIN PAGE BUTTON */}
      <a
        href="/"
        className="absolute top-6 right-8 z-20 px-5 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-semibold hover:bg-white/15 transition"
      >
        Main Page
      </a>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto pt-16">
        <div className="rounded-[32px] border border-white/15 bg-white/10 backdrop-blur-2xl p-8 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <div className="inline-flex mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
            Zuralio FAQ
          </div>

          <h1 className="text-4xl md:text-4xl font-bold mb-6 leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
            Everything you need to know about travel personality matching,
            nearby and worldwide destination results, group quizzes, and how
            Zuralio finds places that feel right for you.
          </p>

     

          <div className="grid gap-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-blue-200 font-semibold">
                    {index + 1}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">
                      {faq.q}
                    </h2>

                    <p className="text-white/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
            <h2 className="text-2xl font-semibold mb-3">
  Ready to discover your next destination?
</h2>

<p className="text-white/75 leading-relaxed mb-5 max-w-3xl">
  The best way to experience Zuralio is to take the travel personality quiz and
  discover destinations that truly match your mood, personality, and travel style.
</p>

<a
  href="/quiz"
  className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition"
>
  Take the Travel Quiz
</a>
          </div>
        </div>
      </div>
  {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 mt-16">
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

              <a href="https://instagram.com/myzulario/" target="_blank" rel="noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://tiktok.com/@myzulario" target="_blank" rel="noreferrer">
                <FaTiktok size={20} />
              </a>
              <a href="https://x.com/myzulario" target="_blank" rel="noreferrer">
                <FaXTwitter size={20} />
              </a>
              <a href="https://facebook.com/myzulario/" target="_blank" rel="noreferrer">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}