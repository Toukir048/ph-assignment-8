"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { setFallbackUser } = useAuth();
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
      setFallbackUser({ name, email, image });
      toast.success("Demo registration created. Please login anytime.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/register"
      });
    } catch {
      toast.error("Google login needs Google OAuth environment variables.");
    }
  };

  return (
    <section className="page-shell grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black text-ink">Registration</h1>
        <p className="mt-2 text-sm text-ink/60">
          Create a learner profile with your name, email, photo link, and a
          password of at least 8 characters.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text">Name</span>
            <input className="input input-bordered" name="name" required />
          </label>
          <label className="form-control">
            <span className="label-text">Email</span>
            <input className="input input-bordered" name="email" required type="email" />
          </label>
          <label className="form-control">
            <span className="label-text">Photo URL</span>
            <input className="input input-bordered" name="image" type="url" />
          </label>
          <label className="form-control">
            <span className="label-text">Password</span>
            <input className="input input-bordered" minLength={8} name="password" required type="password" />
          </label>
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
          </button>
        </form>
        <button className="btn btn-outline btn-block mt-4" onClick={googleLogin}>
          Continue with Google
        </button>
        <p className="mt-5 text-center text-sm text-ink/65">
          Already have an account?{" "}
          <Link className="font-semibold text-primary" href="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
