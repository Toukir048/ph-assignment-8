"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookOpen, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/AuthProvider";
import { continueWithGoogle } from "@/lib/google-login";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { refreshSession } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirect,
        rememberMe: true
      });

      if (error) throw new Error(error.message);
      await refreshSession();
      toast.success("Welcome back to SkillSphere");
      router.push(redirect);
    } catch (error) {
      toast.error(error.message || "Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <BookOpen size={24} />
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight">
              Welcome back to your learning space.
            </h2>
            <p className="mt-4 text-white/70">
              Continue your courses, revisit saved lessons, and keep your weekly
              skill goals moving.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
              <Sparkles className="text-citrus" size={20} />
              <span className="text-sm text-white/80">Top-rated practical courses</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
              <ShieldCheck className="text-secondary" size={20} />
              <span className="text-sm text-white/80">Protected course access</span>
            </div>
          </div>
        </aside>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Student Login
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
              Login to SkillSphere
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/60">
              Use your email and password to continue your SkillSphere learning
              journey.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="form-control">
                <span className="label-text font-semibold text-ink">Email</span>
                <div className="input input-bordered flex items-center gap-2 bg-base-100">
                  <Mail size={18} className="text-ink/45" />
                  <input
                    className="grow bg-transparent"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>
              </label>
              <label className="form-control">
                <span className="label-text font-semibold text-ink">Password</span>
                <div className="input input-bordered flex items-center gap-2 bg-base-100">
                  <LockKeyhole size={18} className="text-ink/45" />
                  <input
                    className="grow bg-transparent"
                    minLength={8}
                    name="password"
                    placeholder="Minimum 8 characters"
                    required
                    type="password"
                  />
                </div>
              </label>
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
              </button>
            </form>

            <div className="divider text-xs text-ink/45">OR</div>

            <button
              className="btn btn-outline btn-block"
              onClick={() => continueWithGoogle("/login")}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white font-black text-primary shadow-sm">
                G
              </span>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-ink/65">
              New here?{" "}
              <Link className="font-semibold text-primary hover:underline" href="/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
