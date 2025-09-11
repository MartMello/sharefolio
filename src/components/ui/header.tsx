"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load current user
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-neutral-medium/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Home */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-primary">Sharefolio</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/explore" className="hover:text-primary">
            Explore
          </Link>

          {user && (
            <Link
              href={`/portfolio/${user.id}`}
              className="hover:text-primary"
            >
              My Portfolio
            </Link>
          )}

          {!user ? (
            <Link href="/login">
              <Button className="bg-primary text-white hover:bg-primary/90 px-4">
                Login
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => supabase.auth.signOut()}
              className="bg-neutral-light text-primary border px-4"
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
