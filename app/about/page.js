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
            About Zuralio
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Travel Matching Beyond Tourism
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
            Zuralio helps you discover destinations that match your personality,
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
              Why Zuralio exists
            </h2>

            <p className="text-white/75 leading-relaxed">
              Finding the right destination should not feel like scrolling
              through thousands of blogs, social media posts, and generic top-ten
              lists. Most travel recommendations focus on popularity, but the
              best destination for one person may feel completely wrong for
              another.
            </p>

            <p className="text-white/75 leading-relaxed mt-4">
              Zuralio was created to answer a different question:
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
                who you are, not just where everyone else goes. Zuralio is
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
                Most travel websites ask where you want to go. Zuralio starts
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
                What Zuralio Considers
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
              Why I built Zuralio
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
              Zuralio was created to answer one simple question:
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
    </main>
  );
}
