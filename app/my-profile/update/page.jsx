"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/AuthProvider";

export default function UpdateProfilePage() {
  const { user, loading, refreshSession, setUser } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/my-profile/update");
    }
  }, [loading, router, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name"));
    const image = String(form.get("image"));

    try {
      const { error } = await authClient.updateUser({ name, image });
      if (error) throw new Error(error.message);
      await refreshSession();
      toast.success("Profile updated");
    } catch {
      setUser({ ...user, name, image });
      toast.error("Could not update the server profile. Showing the latest form values locally.");
    } finally {
      setSaving(false);
      router.push("/my-profile");
    }
  };

  if (loading || !user) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <section className="page-shell grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black text-ink">Update Information</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text">Name</span>
            <input className="input input-bordered" defaultValue={user.name} name="name" required />
          </label>
          <label className="form-control">
            <span className="label-text">Image URL</span>
            <input className="input input-bordered" defaultValue={user.image || ""} name="image" type="url" />
          </label>
          <button className="btn btn-primary btn-block" disabled={saving}>
            {saving ? <span className="loading loading-spinner loading-sm" /> : "Update Information"}
          </button>
        </form>
      </div>
    </section>
  );
}
