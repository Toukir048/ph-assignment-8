"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Mail, PenLine, UserRound } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function MyProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/my-profile");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-soft">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-secondary/15">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="text-secondary" size={48} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              My Profile
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink">{user.name}</h1>
            <p className="mt-2 flex items-center justify-center gap-2 text-ink/65 sm:justify-start">
              <Mail size={16} /> {user.email}
            </p>
          </div>
          <Link className="btn btn-primary" href="/my-profile/update">
            <PenLine size={16} />
            Update
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-base-100 p-4 text-center">
            <p className="text-2xl font-black text-primary">3</p>
            <p className="text-xs text-ink/60">Saved courses</p>
          </div>
          <div className="rounded-lg bg-base-100 p-4 text-center">
            <p className="text-2xl font-black text-secondary">12h</p>
            <p className="text-xs text-ink/60">Learning goal</p>
          </div>
          <div className="rounded-lg bg-base-100 p-4 text-center">
            <p className="text-2xl font-black text-amber-500">Beginner</p>
            <p className="text-xs text-ink/60">Current level</p>
          </div>
        </div>
      </div>
    </section>
  );
}
