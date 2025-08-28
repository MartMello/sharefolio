export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Invest smarter, together.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
          The first European platform where investors can share their portfolios and insights —
          and earn subscription income from their community.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Join the Waitlist
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-3">
          Launching soon — your email is safe, no spam.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-12">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2">Create</h3>
            <p className="text-gray-600">Set up your profile and add your portfolio.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Share</h3>
            <p className="text-gray-600">Post your insights, updates, and strategies.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Earn</h3>
            <p className="text-gray-600">Followers subscribe weekly, monthly, or yearly.</p>
          </div>
        </div>
      </section>

      {/* Why Sharefolio */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-12">Why join Sharefolio?</h2>
        <div className="grid sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <p className="text-lg">🎯 <strong>For creators</strong> — Monetize your knowledge and grow your audience.</p>
          </div>
          <div>
            <p className="text-lg">👥 <strong>For followers</strong> — Learn from trusted investors, no hidden agendas.</p>
          </div>
          <div>
            <p className="text-lg">🌍 <strong>For everyone</strong> — A transparent and supportive investing community.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Be the first to join</h2>
        <p className="mb-6 text-lg">Enter your email to get early access when Sharefolio launches.</p>
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:ring-2 focus:ring-green-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-white text-green-700 font-medium hover:bg-gray-100 transition"
          >
            Join the Waitlist
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100">
        ⚠️ Sharefolio does not provide financial advice. Content is for educational and community purposes only.
        <div className="mt-2">
          <a href="#" className="hover:underline">Privacy Policy</a> |{" "}
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </main>
  )
}
