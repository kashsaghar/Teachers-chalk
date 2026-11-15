"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/ui/BrandIcons";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error") === "oauth";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(
          signInError.message.toLowerCase().includes("invalid")
            ? "Incorrect email or password."
            : signInError.message
        );
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Something went wrong signing you in. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (oauthErr) {
        setError(oauthErr.message);
        setGoogleLoading(false);
      }
      // On success the browser navigates to Google; no need to reset state here.
    } catch {
      setError("Couldn't start Google sign-up. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border-2 border-accent-dark bg-accent/10 p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-dark">New student</p>
        <h2 className="mt-1 text-lg font-bold text-ink">Sign up</h2>
        <p className="mt-1 text-sm text-slate">
          First time here? Create your account with Google — your teacher will unlock your classes shortly
          after.
        </p>
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={googleLoading}
          className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-ink hover:bg-accent-dark disabled:pointer-events-none disabled:opacity-50"
        >
          <GoogleIcon className="h-4 w-4" />
          {googleLoading ? "Redirecting..." : "Sign up with Google"}
        </button>
      </section>

      <div className="flex items-center gap-3 text-xs text-slate">
        <span className="h-px flex-1 bg-border" />
        already enrolled?
        <span className="h-px flex-1 bg-border" />
      </div>

      <section className="rounded-2xl border border-border bg-white p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Returning student</p>
        <h2 className="mt-1 text-lg font-bold text-ink">Sign in</h2>
        <p className="mt-1 text-sm text-slate">Use the email and password your teacher gave you.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
            />
          </div>

          {(error || oauthError) && (
            <p role="alert" className="text-sm text-coral">
              {error || "Google sign-up didn't go through. Please try again."}
            </p>
          )}

          <Button type="submit" variant="secondary" size="lg" className="w-full border-primary text-primary">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </section>

      <p className="text-center text-xs text-slate">
        Not sure which one applies to you? Message us on WhatsApp and we&apos;ll help.
      </p>
    </div>
  );
}
