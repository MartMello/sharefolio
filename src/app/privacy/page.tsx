"use client"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-gray-800">
        <h1 className="text-4xl font-semibold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy explains how Sharefolio (“we”, “our”, “us”) collects, uses, and protects your information when you use our website <strong>sharefolio.app</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Data We Collect</h2>
        <p className="mb-4">
          We only collect your email address when you voluntarily join our waitlist. We do not collect any other personal data at this stage.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. Purpose of Collection</h2>
        <p className="mb-4">
          Your email address is stored so we can inform you about the launch of Sharefolio and related updates. We will not use your email for other purposes without your consent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Legal Basis</h2>
        <p className="mb-4">
          We process your data on the basis of your consent (GDPR Article 6(1)(a)). You may withdraw your consent at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Data Storage</h2>
        <p className="mb-4">
          Emails are securely stored using Supabase. We do not share your information with third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Retention</h2>
        <p className="mb-4">
          We will keep your email address until the launch of Sharefolio or until you request deletion.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">6. Your Rights</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Request access to your data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="mb-4">
          To exercise your rights, contact us at <a href="mailto:privacy@sharefolio.app" className="text-blue-700 underline">privacy@sharefolio.app</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">7. Updates</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. The latest version will always be available on this page.
        </p>

        <p className="text-sm text-gray-500 mt-12">Last updated: August 2025</p>
      </div>
    </div>
  )
}
