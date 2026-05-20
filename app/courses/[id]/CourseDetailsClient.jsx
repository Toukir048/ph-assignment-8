"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle2, Clock, Signal, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

export function CourseDetailsClient({ course }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, pathname, router, user]);

  if (loading || !user) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <section className="page-shell">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={course.image} alt={course.title} fill className="object-cover" priority />
        </div>
        <div className="space-y-5">
          <span className="badge badge-secondary badge-outline">{course.category}</span>
          <h1 className="text-4xl font-black text-ink">{course.title}</h1>
          <p className="text-lg text-ink/70">{course.description}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4">
              <Star className="text-amber-500" size={20} />
              <p className="mt-2 font-bold">{course.rating} Rating</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <Clock className="text-primary" size={20} />
              <p className="mt-2 font-bold">{course.duration}</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <Signal className="text-secondary" size={20} />
              <p className="mt-2 font-bold">{course.level}</p>
            </div>
          </div>
          <p className="font-semibold text-ink">Instructor: {course.instructor}</p>
          <button
            className="btn btn-primary"
            onClick={() => toast.success(`Enrollment started for ${course.title}`)}
          >
            Enroll Now
          </button>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-ink">Course Curriculum</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {course.lessons.map((lesson) => (
            <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4" key={lesson}>
              <CheckCircle2 className="text-secondary" size={20} />
              <span>{lesson}</span>
            </div>
          ))}
        </div>
      </div>
      <Link className="btn btn-ghost mt-6" href="/courses">
        Back to Courses
      </Link>
    </section>
  );
}
