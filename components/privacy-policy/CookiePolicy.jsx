"use client";

import { motion } from "framer-motion";

export default function CookiesPolicyContent() {
  return (
    <div className="max-w-[979px] py-8 space-y-12">
      {/* Header */}
      <section className="space-y-6">
        <div className="text-sm lg:text-lg text-gray-600 mb-4">
          Last Updated: <span className="text-black font-semibold">07/08/2025</span> 
        </div>
        <p className="text-base md:text-lg leading-relaxed text-[#080808]">
          This Cookies Policy explains how{" "}
          <span className="font-semibold">Bepay money fintech UAB</span>{" "}
          ("bepay", "we", "us", or "our") uses cookies and similar technologies
          when you visit our website{" "}
          <a href="https://bepay.money" className="text-blue-500 font-semibold">
            https://bepay.money
          </a>{" "}
          ("Website"). This policy is compliant with the EU General Data
          Protection Regulation (GDPR) and other applicable data protection
          laws.
        </p>
      </section>

      {/* Section 1: What are Cookies */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          1. What are Cookies?
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            Cookies are small text files that are stored on your device
            (computer, smartphone, or tablet) when you visit a website. They
            help us remember your preferences, understand how you use our
            website, and improve your user experience.
          </p>
        </div>
      </section>

      {/* Section 2: Types of Cookies */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          2. Types of Cookies We Use
        </h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>We use the following categories of cookies:</p>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#080808]">
                a. Necessary Cookies
              </h3>
              <p>
                These cookies are essential for the functioning of the Website
                and cannot be switched off in our systems. They are usually set
                in response to actions made by you, such as logging in, filling
                out forms, or setting preferences.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#080808]">
                b. Analytics and Performance Cookies
              </h3>
              <p>
                These cookies help us understand how visitors interact with our
                Website by collecting and reporting information anonymously
                (e.g., via Google Analytics). This helps us improve content and
                performance.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#080808]">
                c. Functionality Cookies
              </h3>
              <p>
                These cookies allow the Website to remember choices you make
                (such as language preferences) to provide enhanced and more
                personalized features.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#080808]">
                d. Third-Party Cookies
              </h3>
              <p>
                We may allow third-party services (e.g., payment providers,
                analytics tools, partners) to place cookies to enable their
                features or gather usage statistics. These cookies are subject
                to the respective third parties' privacy policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Legal Basis */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          3. Legal Basis for Using Cookies
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>We use cookies:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Based on your consent (as per Art. 6(1)(a) GDPR) for non-essential
              cookies.
            </li>
            <li>
              Based on our legitimate interests (Art. 6(1)(f) GDPR), for
              essential cookies needed to operate the website securely and
              efficiently.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4: Cookie Control */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          4. How to Control or Delete Cookies
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>You can manage your cookie preferences at any time through:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>The cookie consent banner is shown on your first visit.</li>
            <li>
              Your browser settings (e.g., Chrome, Firefox, Safari). You can
              delete stored cookies and prevent new ones from being set.
            </li>
          </ul>
          <p>
            Please note that disabling certain cookies may affect your
            experience on our Website.
          </p>
        </div>
      </section>

      {/* Section 5: Retention Period */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          5. Retention Period
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            Cookies may remain on your device for varying periods depending on
            their type. Session cookies expire when you close your browser,
            while persistent cookies remain until they are manually deleted or
            expire automatically.
          </p>
        </div>
      </section>

      {/* Section 6: Policy Changes */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          6. Changes to This Policy
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            We may update this Cookies Policy from time to time to reflect
            changes in our practices or legal requirements. The updated version
            will be posted on this page with a revised "Last Updated" date.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#080808] mb-6">
          7. Contact Us
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            If you have any questions or concerns about our use of cookies,
            please contact us:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">Bepay money fintech UAB</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@bepay.money"
                className="text-blue-500 font-bold"
              >
                info@bepay.money
              </a>
            </p>
            <p>Company Reg. No.: 306999867</p>
            <p>Registered in the European Union</p>
          </div>
        </div>
      </section>
    </div>
  );
}
