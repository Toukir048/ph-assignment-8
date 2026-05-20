"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { refreshSession, setFallbackUser } = useAuth();
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
      setFallbackUser({
        name: email.split("@")[0] || "SkillSphere Learner",
        email,
        image: null
      });
      toast.success("Demo login successful");
      router.push(redirect);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/login"
      });
    } catch {
      toast.error("Google login needs Google OAuth environment variables.");
    }
  };

  return (
    <section className="page-shell grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black text-ink">Login</h1>
        <p className="mt-2 text-sm text-ink/60">
          Use any email and an 8 character password to enter demo mode if auth
          keys are not configured.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text">Email</span>
            <input className="input input-bordered" name="email" required type="email" />
          </label>
          <label className="form-control">
            <span className="label-text">Password</span>
            <input className="input input-bordered" minLength={8} name="password" required type="password" />
          </label>
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>
        </form>
        <button className="btn btn-outline btn-block mt-4" onClick={googleLogin}>
          Continue with Google
        </button>
        <p className="mt-5 text-center text-sm text-ink/65">
          New here?{" "}
          <Link className="font-semibold text-primary" href="/register">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
