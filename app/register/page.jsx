"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BadgeCheck, BookOpen, Image as ImageIcon, LockKeyhole, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { registerLocalUser } from "@/lib/local-auth";
import { continueWithGoogle } from "@/lib/google-login";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name"));
    const email = String(form.get("email"));
    const image = String(form.get("image"));
    const password = String(form.get("password"));

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        image,
        password
      });

      if (error) throw new Error(error.message);
      toast.success("Registration successful. Please login.");
      router.push("/login");
    } catch (error) {
      try {
        registerLocalUser({ name, email, image, password });
        toast.success("Registration successful. Please login.");
        router.push("/login");
      } catch (localError) {
        toast.error(localError.message || error.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg bg-white shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Join SkillSphere
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
              Create your learner account
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/60">
              Build a profile, save your learning progress, and unlock protected
              course details.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="form-control">
                <span className="label-text font-semibold text-ink">Name</span>
                <div className="input input-bordered flex items-center gap-2 bg-base-100">
                  <UserRound size={18} className="text-ink/45" />
                  <input
                    className="grow bg-transparent"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </label>
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
                <span className="label-text font-semibold text-ink">Photo URL</span>
                <div className="input input-bordered flex items-center gap-2 bg-base-100">
                  <ImageIcon size={18} className="text-ink/45" />
                  <input
                    className="grow bg-transparent"
                    name="image"
                    placeholder="https://example.com/photo.jpg"
                    type="url"
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
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
              </button>
            </form>

            <div className="divider text-xs text-ink/45">OR</div>

            <button
              className="btn btn-outline btn-block"
              onClick={() => continueWithGoogle("/register")}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white font-black text-primary shadow-sm">
                G
              </span>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-ink/65">
              Already have an account?{" "}
              <Link className="font-semibold text-primary hover:underline" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>

        <aside className="hidden bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <BookOpen size={24} />
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight">
              Start building skills with a focused path.
            </h2>
            <p className="mt-4 text-white/70">
              Choose courses, follow guided lessons, and keep your profile ready
              for every next step.
            </p>
          </div>
          <div className="grid gap-4">
            {["6 course paths", "Expert-led lessons", "Profile updates"].map((item) => (
              <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4" key={item}>
                <BadgeCheck className="text-citrus" size={20} />
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
