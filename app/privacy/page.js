import Link from "next/link";

export default function PrivacyPage() {
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

        <h1 className="text-4xl font-bold mt-10 mb-4">Privacy Policy</h1>
        <p className="text-white/50 mb-10">Last updated: 2026</p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p>
             Zuralio may collect quiz answers, travel preferences, group quiz 
             participation data, feedback submitted by users, email addresses 
             voluntarily provided to save results, and basic technical or analytics 
             information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              2. How We Use Information
            </h2>
            <p>
              We use information to generate destination matches, improve the
              matching experience, maintain security, and improve Zuralio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              3. Group Quizzes
            </h2>
            <p>
              Group quiz links may allow participants in the same group to
              contribute answers and view shared results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              4. Cookies and Analytics
            </h2>
            <p>
              Zuralio may use cookies and analytics services, such as Google Analytics 
              or Microsoft Clarity, to understand how the website is used and improve 
              the user experience. These services may collect usage information, device 
              information, and interaction data to help us understand how visitors use 
              Zuralio and improve the product.            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              5. Data Sharing
            </h2>
            <p>
              Zuralio does not sell personal information. Some data may be processed 
              by trusted third-party service providers that help operate Zuralio, 
              including hosting, database, analytics, and email delivery services. 
              These providers process information only as necessary to provide their services.
            </p>
          </section>
<section>
  <h2 className="text-2xl font-semibold text-white mb-3">
    6. Email Addresses
  </h2>

  <p>
    If you choose to save your travel results, we collect and store the
    email address you provide together with your travel matches. This
    information is used only to deliver or preserve your results and to
    improve your experience with Zuralio.
  </p>

  <p className="mt-3">
    We do not sell your email address or share it with third parties for
    marketing purposes.
  </p>
</section>

<section>
  <h2 className="text-2xl font-semibold text-white mb-3">
    7. Your Rights
  </h2>

  <p>
    You may request access to, correction of, or deletion of your personal
information, including saved travel results and associated email addresses,
by contacting us at contact@zuralio.com.
  </p>
</section>

<section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              8. Legal Basis for Processing
            </h2>
            <p>We process personal information only where we have a valid legal basis to do so, 
              including your consent, our legitimate interests in improving Zuralio, or where 
              processing is necessary to provide the services you request.</p>
          </section>

<section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              9. Data Retention
            </h2>
            <p>We retain personal information only for as long as necessary to provide 
              our services, improve Zuralio, comply with legal obligations, or until you 
              request deletion of your information.</p>
          </section>

<section>
            <h2 className="text-2xl font-semibold text-white mb-3">
             10. International Data Transfers
            </h2>
            <p>Some service providers used by Zuralio may process information outside 
              your country of residence. Where applicable, appropriate safeguards are 
              used to protect personal information in accordance with applicable privacy laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              11. Contact
            </h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your 
              privacy rights, please contact us at contact@zuralio.com.</p>
          </section>

                <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              12. Changes to This Privacy Policy
            </h2>
            <p>We may update this Privacy Policy from time to time to reflect changes 
              to Zuralio or applicable laws. The latest version will always be available 
              on this page, together with the date of the most recent update.</p>
          </section>

        </div>
      </div>
    </main>
  );
}