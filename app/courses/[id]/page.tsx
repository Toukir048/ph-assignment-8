import { notFound } from "next/navigation";
import { CourseDetailsClient } from "@/app/courses/[id]/CourseDetailsClient";
import { courses } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ id: String(course.id) }));
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = courses.find((item) => item.id === Number(params.id));

  if (!course) {
    notFound();
  }

  return <CourseDetailsClient course={course} />;
}
