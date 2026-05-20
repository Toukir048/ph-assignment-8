import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export function CourseCard({ course }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="badge badge-secondary badge-outline">{course.category}</span>
          <span className="flex items-center gap-1 font-semibold text-amber-600">
            <Star size={16} fill="currentColor" /> {course.rating}
          </span>
        </div>
        <div>
          <h3 className="line-clamp-2 min-h-14 text-lg font-bold text-ink">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-ink/65">Instructor: {course.instructor}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-ink/65">
          <span>{course.duration}</span>
          <span>{course.level}</span>
        </div>
        <Link className="btn btn-primary btn-block" href={`/courses/${course.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
