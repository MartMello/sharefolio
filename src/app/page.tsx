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
  PieChart,
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
      if (error.code === "23505") {
        setError("This email is already on the waitlist.");
      } else {
        setError("Something went wrong. Please try again.");
      }
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

  return (
    <div className="min-h-screen bg-neutral-light">
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

      {/* 1. Hero Image */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
            <div className="p-6 bg-gray-100 flex items-center justify-center rounded-2xl shadow-lg">
                <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto rounded-lg">
                    <defs>
                        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#0A9396', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#005F73', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                    <rect width="400" height="225" fill="#f0f4f8" />
                    <circle cx="50" cy="50" r="80" fill="#005F73" opacity="0.05" />
                    <rect x="300" y="150" width="100" height="100" rx="20" transform="rotate(45 350 200)" fill="#0A9396" opacity="0.05" />
                    <path d="M 120 190 Q 200 170, 280 190 L 290 80 Q 200 60, 110 80 Z" fill="url(#glow)" opacity="0.2" />
                    <path d="M 115 80 Q 200 65, 285 80" stroke="#0A9396" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M 125 188 Q 200 175, 275 188" stroke="#005F73" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <polyline points="140,160 160,140 180,150 200,120 220,130 240,100 260,110" fill="none" stroke="#0A9396" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="260" cy="110" r="4" fill="#0A9396" />
                    <circle cx="260" cy="110" r="8" fill="#0A9396" opacity="0.3" />
                    <g transform="translate(80, 110)">
                        <path d="M 0 85 V 40 C 0 20, 20 20, 20 40 V 85 Z" fill="#736c64" />
                        <circle cx="10" cy="15" r="15" fill="#d2b48c" />
                        <rect x="3" y="40" width="14" height="25" fill="#005F73" rx="5" />
                    </g>
                    <g transform="translate(180, 95)">
                        <path d="M -15 100 V 50 C -15 30, 15 30, 15 50 V 100 Z" fill="#5c5552" />
                        <circle cx="0" cy="18" r="18" fill="#8d5524" />
                        <rect x="-12" y="50" width="24" height="30" fill="#e0e0e0" rx="5" />
                    </g>
                    <g transform="translate(280, 115)">
                        <path d="M -20 80 V 35 C -20 15, 0 15, 0 35 V 80 Z" fill="#6b625c" />
                        <circle cx="-10" cy="12" r="15" fill="#f1c27d" />
                        <rect x="-17" y="35" width="14" height="25" fill="#0A9396" rx="5" />
                    </g>
                </svg>
            </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-teal-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 font-semibold">How it works</h2>
            <p className="text-lg text-white/85">Three simple steps to start building your community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={cardBase}>
              <CardHeader>
                <div className="p-8 flex items-center justify-center h-48">
                    <svg width="100" height="100" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="8" stroke="#005F73" strokeWidth="2.5" fill="none" />
                        <path d="M 8 40 C 8 28, 32 28, 32 40 Z" stroke="#005F73" strokeWidth="2.5" fill="none" />
                        <circle cx="44" cy="44" r="16" fill="#005F73" fillOpacity="0.1" stroke="#005F73" strokeWidth="2.5" />
                        <path d="M 44 28 V 44 H 60 A 16 16 0 0 0 44 28 Z" fill="#0A9396" />
                        <circle cx="56" cy="16" r="8" fill="#0A9396" />
                        <line x1="53" y1="16" x2="59" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <line x1="56" y1="13" x2="56" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <CardTitle className="text-xl text-primary">Create</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-medium">Build your portfolio with ease.</CardDescription>
              </CardContent>
            </Card>

            <Card className={cardBase}>
              <CardHeader>
                <div className="p-8 flex items-center justify-center h-48">
                    <svg width="100" height="100" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <rect x="20" y="24" width="24" height="20" rx="2" stroke="#005F73" strokeWidth="2.5" fill="none" />
                        <rect x="24" y="32" width="4" height="8" fill="#005F73" />
                        <rect x="30" y="28" width="4" height="12" fill="#005F73" />
                        <rect x="36" y="35" width="4" height="5" fill="#005F73" />
                        <circle cx="12" cy="12" r="6" fill="#005F73" />
                        <circle cx="52" cy="12" r="6" fill="#005F73" />
                        <circle cx="52" cy="52" r="6" fill="#005F73" />
                        <path d="M 20 32 Q 14 30, 14 18" stroke="#0A9396" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M 44 32 Q 50 30, 50 18" stroke="#0A9396" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M 44 38 Q 50 42, 50 46" stroke="#0A9396" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
                <CardTitle className="text-xl text-primary">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-medium">Connect with your community.</CardDescription>
              </CardContent>
            </Card>

            <Card className={cardBase}>
              <CardHeader>
                <div className="p-8 flex items-center justify-center h-48">
                    <svg width="100" height="100" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 32 60 V 10 C 32 4, 40 4, 40 10" stroke="#005F73" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <g fill="#0A9396">
                            <path d="M 32 45 C 15 45, 15 25, 32 25 Z" />
                            <path d="M 32 35 C 50 35, 50 15, 32 15 Z" />
                            <path d="M 40 18 C 55 18, 55 8, 40 8 Z" />
                        </g>
                        <text x="21" y="37" fontFamily="sans-serif" fontSize="10" fill="white" fontWeight="bold">$</text>
                        <text x="38" y="27" fontFamily="sans-serif" fontSize="10" fill="white" fontWeight="bold">€</text>
                        <text x="45" y="15" fontFamily="sans-serif" fontSize="8" fill="white" fontWeight="bold">¥</text>
                    </svg>
                </div>
                <CardTitle className="text-xl text-primary">Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-medium">Watch your investments grow.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHY SHAREFOLIO */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-teal-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 font-semibold">Why join Sharefolio?</h2>
            <p className="text-lg text-white/85">Built for creators, followers, and the entire investing community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={cardBase}>
              <div className="p-8 flex items-center justify-center h-64 bg-sky-50">
                <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect x="80" y="20" width="110" height="80" rx="8" fill="#fff" stroke="#e0e0e0" />
                    <path d="M 95 80 C 110 70, 125 50, 140 55 C 155 60, 160 35, 175 40" stroke="#0A9396" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <circle cx="175" cy="40" r="3" fill="#0A9396" />
                    <g transform="translate(40, 40)">
                        <path d="M 0 110 V 40 C 0 15, 30 15, 30 40 V 110 Z" fill="#736c64" />
                        <rect x="0" y="20" width="30" height="40" fill="#005F73" rx="10" />
                        <circle cx="15" cy="15" r="15" fill="#d2b48c" />
                        <path d="M 25 40 Q 50 35, 70 60" stroke="#736c64" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M 25 40 Q 50 35, 70 60" stroke="#005F73" strokeWidth="6" fill="none" strokeLinecap="round" />
                    </g>
                </svg>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl text-primary">For Creators</h3>
                <p className="text-gray-600 mt-2">Share your expertise and build a following.</p>
              </div>
            </Card>

            <Card className={cardBase}>
              <div className="p-8 flex items-center justify-center h-64 bg-teal-50">
                <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="60" width="140" height="80" rx="5" fill="#e0e0e0" />
                    <rect x="25" y="50" width="150" height="80" rx="8" fill="#fff" stroke="#e0e0e0" />
                    <rect x="40" y="60" width="120" height="60" fill="#005F73" fillOpacity="0.1" />
                    <rect x="50" y="70" width="10" height="40" fill="#0A9396" rx="2" />
                    <rect x="65" y="85" width="10" height="25" fill="#0A9396" rx="2" />
                    <rect x="80" y="75" width="10" height="35" fill="#0A9396" rx="2" />
                    <g transform="translate(10, 40)">
                        <circle cx="20" cy="20" r="15" fill="#8d5524" />
                        <path d="M 5 60 V 45 C 5 25, 35 25, 35 45 V 60 Z" fill="#0A9396" />
                    </g>
                    <g transform="translate(150, 40)">
                        <circle cx="20" cy="20" r="15" fill="#f1c27d" />
                        <path d="M 5 60 V 45 C 5 25, 35 25, 35 45 V 60 Z" fill="#005F73" />
                    </g>
                </svg>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl text-primary">For Followers</h3>
                <p className="text-gray-600 mt-2">Learn from experts and discover new strategies.</p>
              </div>
            </Card>

            <Card className={cardBase}>
                <div className="p-8 flex items-center justify-center h-64 bg-blue-50">
                    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 50 75 L 100 40" stroke="#0A9396" strokeWidth="2" opacity="0.5" />
                        <path d="M 50 75 L 100 110" stroke="#0A9396" strokeWidth="2" opacity="0.5" />
                        <path d="M 100 40 L 150 75" stroke="#0A9396" strokeWidth="2" opacity="0.5" />
                        <path d="M 100 110 L 150 75" stroke="#0A9396" strokeWidth="2" opacity="0.5" />
                        <path d="M 50 75 L 100 75" stroke="#0A9396" strokeWidth="2" opacity="0.5" />
                        <circle cx="50" cy="75" r="12" fill="#005F73" />
                        <circle cx="150" cy="75" r="12" fill="#005F73" />
                        <circle cx="100" cy="40" r="12" fill="#005F73" />
                        <circle cx="100" cy="110" r="12" fill="#005F73" />
                        <circle cx="100" cy="75" r="18" fill="#0A9396" />
                        <text x="46" y="79" fontSize="10" fill="white">A</text>
                        <text x="146" y="79" fontSize="10" fill="white">B</text>
                        <text x="96" y="44" fontSize="10" fill="white">C</text>
                        <text x="96" y="114" fontSize="10" fill="white">D</text>
                        <text x="96" y="79" fontSize="10" fill="white">★</text>
                    </svg>
                </div>
                <div className="p-6 bg-white">
                    <h3 className="font-bold text-xl text-primary">For Everyone</h3>
                    <p className="text-gray-600 mt-2">Join a supportive community of investors.</p>
                </div>
            </Card>
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