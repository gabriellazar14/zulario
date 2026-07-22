import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070b16] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
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
          Last updated: July 22, 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance</h2>
            <p>
              By accessing or using Zulario, you agree to be bound by these Terms of
              Service and all applicable laws. If you do not agree with these Terms,
              please do not use Zulario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Eligibility</h2>
            <p>
              You must be at least 16 years old, or the minimum age required by
              applicable law in your country, to use Zulario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. What Zulario Does</h2>
            <p>
              Zulario provides AI-assisted personality-based destination matching,
              travel recommendations, destination discovery, and group travel matching
              tools. The platform is designed to help users discover destinations that
              may suit their travel preferences and interests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. AI Recommendations</h2>
            <p>
              Zulario generates recommendations algorithmically based on user input
              and destination data. Results are provided for informational purposes
              only and should not be considered professional travel, legal,
              financial, medical, or safety advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. User Responsibility</h2>
            <p>
              Users remain responsible for verifying visas, entry requirements,
              safety information, local regulations, weather, prices,
              transportation, accommodation, bookings, availability,
              travel insurance, and destination suitability before making
              travel decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Group Quizzes</h2>
            <p>
              Users are responsible for sharing group quiz links appropriately and
              ensuring participants understand that shared results may be visible
              to members of the same group.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Acceptable Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use Zulario only for lawful purposes.</li>
              <li>Do not interfere with or disrupt the platform.</li>
              <li>Do not attempt to gain unauthorized access to systems or data.</li>
              <li>
                Do not copy, reverse engineer, or misuse Zulario&apos;s software
                or matching algorithms except where permitted by applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Intellectual Property</h2>
            <p>
              The Zulario name, branding, logos, design, destination modeling,
              matching logic, algorithms, and original content are owned by
              Zulario unless otherwise stated and are protected by applicable
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Zulario shall not
              be liable for any direct, indirect, incidental, consequential, or
              special damages arising from the use of, or inability to use, the
              platform or its recommendations, including travel decisions,
              bookings, cancellations, delays, losses, or other travel-related
              issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Availability</h2>
            <p>
              We strive to keep Zulario available at all times but do not
              guarantee uninterrupted or error-free access. The service may be
              modified, suspended, or discontinued at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Third-Party Services</h2>
            <p>
              Zulario may contain links to third-party websites or services.
              We are not responsible for the availability, content, accuracy,
              or privacy practices of those external services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">12. Privacy</h2>
            <p>
              Your use of Zulario is also governed by our{" "}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy, 
              </Link> which explains how personal information is collected, used, and protected.
              
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">13. Governing Law</h2>
            <p>
           These Terms shall be governed by the laws of the jurisdiction in which Zulario operates, 
           without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">14. Contact</h2>
            <p>
              If you have questions regarding these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:contact@zulario.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                contact@zulario.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">15. Changes</h2>
            <p>
              We may update these Terms of Service from time to time to reflect
              changes to Zulario or applicable laws. The latest version will
              always be available on this page together with the date of the
              most recent update.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}