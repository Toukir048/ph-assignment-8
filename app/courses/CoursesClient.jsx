"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";

export function CoursesClient({ courses }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(courses.map((course) => course.category))],
    [courses]
  );

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesTitle = course.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || course.category === activeCategory;

      return matchesTitle && matchesCategory;
    });
  }, [activeCategory, courses, query]);

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
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            className={`btn btn-sm ${
              activeCategory === category ? "btn-primary" : "btn-outline"
            }`}
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
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
