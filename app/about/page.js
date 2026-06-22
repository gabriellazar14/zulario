import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function AboutPage() {
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
            About Zulario
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Travel Matching Beyond Tourism
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
            Zulario helps you discover destinations that match your personality,
            emotions, energy, travel mindset, and real-world travel preferences —
            not just what is popular online.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="/quiz"
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition"
            >
              Take the travel quiz
            </a>

            <a
              href="/destinations"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 transition"
            >
              Explore destinations
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Why Zulario exists
            </h2>

            <p className="text-white/75 leading-relaxed">
              Finding the right destination should not feel like scrolling
              through thousands of blogs, social media posts, and generic top-ten
              lists. Most travel recommendations focus on popularity, but the
              best destination for one person may feel completely wrong for
              another.
            </p>

            <p className="text-white/75 leading-relaxed mt-4">
              Zulario was created to answer a different question:
              <span className="text-white font-semibold">
                {" "}Where would you feel happiest right now?
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* BLOCK 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition">
              <h2 className="text-2xl font-semibold mb-4">
                Our Vision
              </h2>

              <p className="text-white/80 leading-relaxed">
                We imagine a future where travel recommendations are based on
                who you are, not just where everyone else goes. Zulario is
                designed to help every traveler discover places that genuinely
                fit their personality, mood, and travel rhythm.
              </p>
            </div>

            {/* BLOCK 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition">
              <h2 className="text-2xl font-semibold mb-4">
                Emotional Travel Matching
              </h2>

              <p className="text-white/70 mb-4">
                Most travel websites ask where you want to go. Zulario starts
                with how you want to feel.
              </p>

              <ul className="space-y-2 text-white/80">
                <li>• Peaceful and calm</li>
                <li>• Adventurous and free</li>
                <li>• Romantic and connected</li>
                <li>• Inspired and culturally stimulated</li>
                <li>• Close to nature</li>
              </ul>
            </div>

            {/* BLOCK 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition">
              <h2 className="text-2xl font-semibold mb-4">
                Destination Intelligence
              </h2>

              <p className="text-white/70 mb-4">
                Every destination is described through structured emotional,
                seasonal, practical, and personality-based signals.
              </p>

              <ul className="space-y-2 text-white/80">
                <li>• Emotional signatures</li>
                <li>• Atmosphere profiles</li>
                <li>• Personality alignment</li>
                <li>• Travel context matching</li>
                <li>• Seasonal variations</li>
              </ul>
            </div>

            {/* BLOCK 4 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition">
              <h2 className="text-2xl font-semibold mb-4">
                What Zulario Considers
              </h2>

              <p className="text-white/70 mb-4">
                A strong travel match should feel emotional, personal, and
                realistic for the way you want to travel.
              </p>

              <ul className="space-y-2 text-white/80">
                <li>• Your travel personality</li>
                <li>• Your preferred destination type</li>
                <li>• Whether you want nearby options or anywhere</li>
                <li>• Your region of departure</li>
                <li>• Destination accessibility and travel effort</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Why I built Zulario
            </h2>

            <p className="text-white/75 leading-relaxed">
              Like many travelers, I often spent hours comparing destinations,
              reading blogs, and scrolling through endless recommendations
              without feeling any closer to a decision.
            </p>

            <p className="text-white/75 leading-relaxed mt-4">
              I started wondering if destinations could be matched the same way
              music, movies, or books are recommended — not by popularity, but
              by personality, emotions, travel style, and the experience someone
              is actually looking for.
            </p>

            <p className="text-white/75 leading-relaxed mt-4">
              Zulario was created to answer one simple question:
              <span className="text-white font-semibold">
                {" "}Where would you feel most alive right now?
              </span>
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-semibold mb-3">
              The journey ahead
            </h2>

            <p className="text-white/75 leading-relaxed max-w-3xl">
              Destination matching is only the beginning. The long-term vision
              is to build an intelligent travel companion that can recommend
              destinations, create personalized itineraries, suggest activities,
              and help people plan unforgettable trips based on their unique
              travel personality.
            </p>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to discover your perfect destination?
            </h2>

            <p className="text-white/60 mb-6">
              Take the travel personality quiz and see which destinations around
              the world match your unique travel style.
            </p>

            <a
              href="/quiz"
              className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition"
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
