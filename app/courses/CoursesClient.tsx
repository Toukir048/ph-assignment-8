"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/data/courses";

export function CoursesClient({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [courses, query]);

  return (
    <>
      <div className="mx-auto mb-8 max-w-xl">
        <label className="input input-bordered flex items-center gap-2 bg-white">
          <Search size={18} className="text-ink/45" />
          <input
            className="grow"
            placeholder="Search courses by title"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-black/20 bg-white p-10 text-center text-ink/65">
          No courses matched your search.
        </div>
      )}
    </>
  );
}
