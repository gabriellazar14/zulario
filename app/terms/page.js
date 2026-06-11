import Link from "next/link";

export default function TermsPage() {
return ( <main className="min-h-screen bg-[#070b16] text-white px-6 py-12"> <div className="max-w-4xl mx-auto">


    {/* MAIN PAGE BUTTON */}
    <a
      href="/"
      className="absolute top-6 right-8 z-20 px-5 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-semibold hover:bg-white/15 transition"
    >
      Main Page
    </a>

    <h1 className="text-4xl font-bold mt-10 mb-4">
      Terms of Service
    </h1>

    <p className="text-white/50 mb-10">
      Last updated: 2026
    </p>

    <div className="space-y-8 text-white/70 leading-relaxed">

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          1. Acceptance
        </h2>

        <p>
          By accessing or using Zuralio, you agree to be bound by these
          Terms of Service and all applicable laws.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          2. Eligibility
        </h2>

        <p>
          You must be at least 16 years old, or the minimum age required
          by applicable law in your country, to use Zuralio.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          3. What Zuralio Does
        </h2>

        <p>
          Zuralio provides AI-assisted personality-based destination
          matching, travel recommendations, destination discovery, and
          group travel matching tools.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          4. AI Recommendations
        </h2>

        <p>
          Zuralio generates recommendations algorithmically based on user
          input and destination data. Results are provided for
          informational purposes only and should not be considered
          professional travel advice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          5. User Responsibility
        </h2>

        <p>
          Users remain responsible for verifying visas, safety
          information, prices, weather, transportation, bookings,
          availability, insurance requirements, and destination suitability
          before making travel decisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          6. Group Quizzes
        </h2>

        <p>
          Users are responsible for sharing group quiz links appropriately
          and ensuring participants understand that shared results may be
          visible to members of the same group.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          7. Intellectual Property
        </h2>

        <p>
          The Zuralio name, branding, design, destination modeling,
          algorithms, matching logic, and original content are owned by
          Zuralio unless otherwise stated.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          8. Limitation of Liability
        </h2>

        <p>
          Zuralio shall not be responsible for travel decisions, bookings,
          cancellations, losses, damages, delays, or other issues arising
          from use of the platform or its recommendations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          9. Availability
        </h2>

        <p>
          We strive to keep Zuralio available at all times but do not
          guarantee uninterrupted access. The service may be modified,
          suspended, or discontinued without prior notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          10. Third-Party Services
        </h2>

        <p>
          Zuralio may contain links to third-party websites or services.
          We are not responsible for the content, availability, or privacy
          practices of those external services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          11. Governing Law
        </h2>

        <p>
          These Terms shall be governed by the laws applicable in the
          jurisdiction where Zuralio operates, without regard to conflict
          of law principles.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">
          12. Changes
        </h2>

        <p>
          We may update these Terms of Service from time to time. The
          latest version will always be available on this page together
          with the date of the most recent update.
        </p>
      </section>

    </div>
  </div>
</main>
);
}
