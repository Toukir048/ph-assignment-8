"use client";

import Image from "next/image";
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
              <Image src={user.image} alt={user.name} fill className="object-cover" />
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
      </div>
    </section>
  );
}
