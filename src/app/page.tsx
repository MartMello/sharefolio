"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Share2, PieChart, Star, Shield, Globe, AlertTriangle, BarChart3, LineChart, Target } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, this would send to a backend
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/Logo_abstract.png"
              alt="Sharefolio logo"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <span className="text-xl text-gray-900" style={{ fontWeight: 600 }}>Sharefolio</span>
          </div>
          <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
            Coming Soon
          </Badge>
          <h1 className="text-5xl mb-6 text-gray-900" style={{ fontWeight: 600 }}>
            Invest smarter, together.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The first platform where investors can share their portfolios and insights — and earn subscription income from their community.
          </p>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-3 mb-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-50 border-gray-200"
              required
            />
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6"
              disabled={isSubmitted}
            >
              {isSubmitted ? "✓ Joined!" : "Join the Waitlist"}
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Launching soon — your email is safe, no spam.
          </p>
        </div>
      </section>

      {/*Banner section*/}
      <section className="px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/Dashboard_illustration.png"
              alt="Sharefolio dashboard preview"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 600 }}>
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start building your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="text-blue-700 w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-gray-900">Create</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Set up your profile and add your portfolio. Share your investment strategy and approach.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="text-blue-700 w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-gray-900">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Post your insights, updates, and strategies. Build trust through transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="text-green-600 w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-gray-900">Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Followers subscribe weekly, monthly, or yearly. Monetize your knowledge and expertise.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Sharefolio */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 600 }}>
              Why join Sharefolio?
            </h2>
            <p className="text-xl text-gray-600">
              Built for creators, followers, and the entire investing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>
                For creators
              </h3>
              <p className="text-gray-600">
                Monetize your knowledge and grow your audience. Build a sustainable income from your investing expertise.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>
                For followers
              </h3>
              <p className="text-gray-600">
                Learn from trusted investors, no hidden agendas. Access real portfolios and proven strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>
                For everyone
              </h3>
              <p className="text-gray-600">
                A transparent and supportive investing community. Learn, share, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Illustration */}
      <section className="px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/People_working_together.png"
              alt="Investing community illustration"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl mb-4 text-gray-900 font-semibold">
            Be the first to join
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Enter your email to get early access when Sharefolio launches.
          </p>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-gray-300 placeholder:text-gray-500"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-blue-700 text-white hover:bg-blue-800 px-6"
              style={{ fontWeight: 500 }}
              disabled={isSubmitted}
            >
              {isSubmitted ? "✓ Joined!" : "Join the Waitlist"}
            </Button>
          </form>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-700 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <PieChart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl text-gray-900" style={{ fontWeight: 600 }}>Sharefolio</span>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-6 text-orange-600 bg-orange-50 rounded-lg p-4 max-w-2xl mx-auto">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                ⚠️ Sharefolio does not provide financial advice. Content is for educational and community purposes only.
              </p>
            </div>

            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-700 transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            © 2025 Sharefolio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}