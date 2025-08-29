"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  TrendingUp,
  Users,
  DollarSign,
  Share2,
  PieChart,
  Globe,
  AlertTriangle,
} from "lucide-react";

export default function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      console.error("Supabase error:", error.message);
      setError("Something went wrong. Please try again.");
    } else {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // Reusable styles
  const primaryGlow =
    "shadow-[0_8px_24px_rgba(20,184,166,0.35)] hover:shadow-[0_12px_36px_rgba(20,184,166,0.45)] transition-shadow";

  const cardBase =
    "text-center rounded-2xl border border-accent/20 shadow-lg bg-gradient-to-b from-white to-neutral-50 " +
    "hover:shadow-xl hover:scale-[1.02] hover:border-accent/40 transition-all duration-300";

  const iconCircle =
    "bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 " +
    "shadow-[0_0_15px_rgba(20,184,166,0.28)]";

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header (always light) */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-neutral-medium/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo_abstract.png"
              alt="Sharefolio logo"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-xl font-semibold text-primary">Sharefolio</span>
          </div>

          <Button
            className={`bg-primary text-white hover:bg-primary/90 px-6 font-semibold ${primaryGlow}`}
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* HERO — bold gradient + white content */}
      <section className="py-24 px-4 bg-gradient-to-r from-accent to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            Coming Soon
          </Badge>

          <h1 className="text-5xl mb-6 font-extrabold">
            Invest smarter, together.
          </h1>

          <p className="text-xl text-white/85 mb-8 max-w-2xl mx-auto">
            The first platform where investors can share their portfolios and
            insights — and earn subscription income from their community.
          </p>

          <form
            onSubmit={handleEmailSubmit}
            className="max-w-md mx-auto flex gap-3 mb-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-primary border-white/20 placeholder:text-neutral-medium"
              required
            />
            <Button
              type="submit"
              className={`bg-primary text-white hover:bg-primary/90 px-6 font-semibold ${primaryGlow}`}
              disabled={isSubmitted}
            >
              {isSubmitted ? "✓ Joined!" : "Join the Waitlist"}
            </Button>
          </form>

          {error && <p className="text-red-100 text-sm">{error}</p>}
        </div>
      </section>

      {/* Banner 1 */}
      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-neutral-medium/20">
            <Image
              src="/Dashboard_illustration.png"
              alt="Sharefolio dashboard preview"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — gradient section with styled cards */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-teal-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 font-semibold">How it works</h2>
            <p className="text-lg text-white/85">
              Three simple steps to start building your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={cardBase}>
              <CardHeader>
                <div className={iconCircle}>
                  <PieChart className="text-primary w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-primary">Create</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-medium">
                  Set up your profile and add your portfolio. Share your
                  investment strategy and approach.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={cardBase}>
              <CardHeader>
                <div className={iconCircle}>
                  <Share2 className="text-primary w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-primary">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-medium">
                  Post your insights, updates, and strategies. Build trust
                  through transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={cardBase}>
              <CardHeader>
                <div className={iconCircle}>
                  <DollarSign className="text-primary w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-primary">Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-medium">
                  Followers subscribe weekly, monthly, or yearly. Monetize your
                  knowledge and expertise.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHY SHAREFOLIO — gradient section with styled cards */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-teal-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 font-semibold">Why join Sharefolio?</h2>
            <p className="text-lg text-white/85">
              Built for creators, followers, and the entire investing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={cardBase}>
              <div className="p-8">
                <div className={`${iconCircle} mb-6`}>
                  <TrendingUp className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl mb-3 text-primary font-semibold">
                  For creators
                </h3>
                <p className="text-neutral-medium">
                  Monetize your knowledge and grow your audience. Build a
                  sustainable income from your investing expertise.
                </p>
              </div>
            </div>

            <div className={cardBase}>
              <div className="p-8">
                <div className={`${iconCircle} mb-6`}>
                  <Users className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl mb-3 text-primary font-semibold">
                  For followers
                </h3>
                <p className="text-neutral-medium">
                  Learn from trusted investors, no hidden agendas. Access real
                  portfolios and proven strategies.
                </p>
              </div>
            </div>

            <div className={cardBase}>
              <div className="p-8">
                <div className={`${iconCircle} mb-6`}>
                  <Globe className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl mb-3 text-primary font-semibold">
                  For everyone
                </h3>
                <p className="text-neutral-medium">
                  A transparent and supportive investing community. Learn, share,
                  and grow together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner 2 */}
      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl ring-1 ring-neutral-medium/20">
            <Image
              src="/People_working_together.png"
              alt="Investing community illustration"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-teal-600">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl mb-4 font-semibold">Be the first to join</h2>
          <p className="text-lg text-white/85 mb-8">
            Enter your email to get early access when Sharefolio launches.
          </p>

        <form
            onSubmit={handleEmailSubmit}
            className="max-w-md mx-auto flex gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-primary border-white/20 placeholder:text-neutral-medium"
              required
            />
            <Button
              type="submit"
              className={`bg-primary text-white hover:bg-primary/90 px-6 font-semibold ${primaryGlow}`}
              disabled={isSubmitted}
            >
              {isSubmitted ? "✓ Joined!" : "Join the Waitlist"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-accent w-8 h-8 rounded-lg flex items-center justify-center">
                <PieChart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl text-primary font-semibold">Sharefolio</span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 text-orange-600 bg-orange-50 rounded-lg p-4 max-w-2xl mx-auto">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                ⚠️ Sharefolio does not provide financial advice. Content is for
                educational and community purposes only.
              </p>
            </div>

            <div className="flex justify-center gap-8 text-sm text-neutral-medium">
              <a href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-neutral-medium pt-8 border-t border-neutral-medium/30">
            © 2025 Sharefolio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
