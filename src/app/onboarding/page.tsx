"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"creator" | "follower" | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [style, setStyle] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState<number | null>(null);
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const totalSteps = role ? 5 : 2;
  const progressPercent = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;

    let updateData: any = { role, name };

    if (role === "creator") {
      updateData = {
        ...updateData,
        bio,
        investment_style: style,
        subscription_price: subscriptionPrice,
      };
    } else if (role === "follower") {
      updateData = { ...updateData, interests, goal };
    }

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", user.id);

    if (!error) {
      if (role === "creator") {
        router.push(`/portfolio/${user.id}`);
      } else {
        router.push("/explore");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-neutral-light">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        {/* Progress Bar */}
        <div className="w-full bg-neutral-light rounded-full h-2 mb-6">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Steps */}
        {step === 1 && (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-primary">Welcome to Sharefolio 🎉</h1>
            <p className="text-neutral-medium">
              Invest smarter, together. Share or follow portfolios transparently.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              How do you want to join?
            </h2>
            <Button
              onClick={() => setRole("creator")}
              className={`w-full py-3 ${
                role === "creator" ? "bg-primary text-white" : "bg-neutral-light"
              }`}
            >
              I’m a Creator — Share my portfolio & earn subscribers
            </Button>
            <Button
              onClick={() => setRole("follower")}
              className={`w-full py-3 ${
                role === "follower" ? "bg-primary text-white" : "bg-neutral-light"
              }`}
            >
              I’m a Follower — Learn from creators & explore portfolios
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Basic Profile
            </h2>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>
        )}

        {step === 4 && role === "creator" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Creator Details
            </h2>
            <Textarea
              placeholder="Short bio (who you are as an investor)"
              value={bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
            />
            <Input
              placeholder="Investment style (growth, value, crypto, ...)"
              value={style}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStyle(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Subscription price (€ / month)"
              value={subscriptionPrice ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubscriptionPrice(Number(e.target.value))}
            />
          </div>
        )}

        {step === 4 && role === "follower" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Follower Preferences
            </h2>
            <Input
              placeholder="What are your interests? (e.g. stocks, crypto)"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
            <Input
              placeholder="Your goal (learn, network, grow portfolio...)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Ready to start 🚀
            </h2>
            <p className="text-neutral-medium">Here’s what we’ll save to your profile:</p>
            <ul className="text-sm text-left text-neutral-dark list-disc pl-6">
              <li>Role: {role}</li>
              <li>Name: {name || "—"}</li>
              {role === "creator" && (
                <>
                  <li>Bio: {bio || "—"}</li>
                  <li>Style: {style || "—"}</li>
                  <li>Price: {subscriptionPrice ? `€${subscriptionPrice}` : "—"}</li>
                </>
              )}
              {role === "follower" && (
                <>
                  <li>Interests: {interests || "—"}</li>
                  <li>Goal: {goal || "—"}</li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            disabled={step === 1}
            className="bg-neutral-light text-primary border"
          >
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={handleNext} className="bg-primary text-white">
              Next
            </Button>
          ) : (
            <Button onClick={handleFinish} className="bg-primary text-white">
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
