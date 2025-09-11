"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define a type that matches your Supabase "profiles" table
type CreatorProfile = {
  id: string;
  name: string;
  bio?: string;
  profile_pic?: string;
  role?: "creator" | "follower";
  subscription_price?: number;
  ytd_return?: number;
  follower_count?: number;
  created_at?: string;
};

export default function ExploreCreators() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);

  // Fetch creators from Supabase
  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("role", "creator");

      if (error) {
        console.error("Error fetching creators:", error.message);
      } else {
        setCreators(data as CreatorProfile[]); // safely cast to our type
      }
    };
    fetchCreators();
  }, []);

  const cardBase =
    "rounded-2xl border border-accent/20 shadow-lg bg-gradient-to-b from-white to-neutral-50 " +
    "hover:shadow-xl hover:scale-[1.02] hover:border-accent/40 transition-all duration-300";

  return (
    <div className="min-h-screen bg-neutral-light py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-12">
          Explore Creators
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <Card key={creator.id} className={cardBase}>
              <CardHeader className="flex items-center gap-4">
                <Image
                  src={creator.profile_pic || "/default-avatar.png"}
                  alt={creator.name}
                  width={60}
                  height={60}
                  className="rounded-full border border-accent/30"
                />
                <div>
                  <CardTitle className="text-lg text-primary">
                    {creator.name}
                  </CardTitle>
                  <p className="text-sm text-neutral-medium">
                    {creator.bio || "No bio yet"}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between text-sm text-neutral-medium mb-3">
                  <span>
                    YTD Return:{" "}
                    <b className="text-primary">
                      {creator.ytd_return !== undefined
                        ? `${creator.ytd_return}%`
                        : "--"}
                    </b>
                  </span>
                  <span>
                    Followers: {creator.follower_count ?? 0}
                  </span>
                </div>
                <div className="text-center">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Subscribe €{creator.subscription_price ?? "--"}/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {creators.length === 0 && (
          <p className="text-center text-neutral-medium mt-12">
            No creators yet. Be the first to sign up!
          </p>
        )}
      </div>
    </div>
  );
}
