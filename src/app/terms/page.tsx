"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-gray-800">
        <h1 className="text-4xl font-semibold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to Sharefolio. By accessing or using our website 
          <strong> sharefolio.app</strong>, you agree to be bound by these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Use of Service</h2>
        <p className="mb-4">
          Sharefolio is provided for educational and community purposes only. 
          We do not provide financial advice. Users are solely responsible for their own investment decisions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. User Conduct</h2>
        <p className="mb-4">
          You agree not to misuse the service, attempt to hack, or upload harmful content. 
          We may suspend accounts that violate these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Limitation of Liability</h2>
        <p className="mb-4">
          Sharefolio is not responsible for any losses, damages, or decisions made based on content shared on the platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Updates</h2>
        <p className="mb-4">
          These terms may be updated from time to time. The latest version will always be available on this page.
        </p>

        <p className="text-sm text-gray-500 mt-12">Last updated: August 2025</p>
      </div>
    </div>
  )
}