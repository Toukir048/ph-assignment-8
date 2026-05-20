import { notFound } from "next/navigation";
import { CourseDetailsClient } from "@/app/courses/[id]/CourseDetailsClient";
import { courses } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ id: String(course.id) }));
}

export default async function CourseDetailsPage({
  params
}) {
  const { id } = await params;
  const course = courses.find((item) => item.id === Number(id));

  if (!course) {
    notFound();
  }

  return <CourseDetailsClient course={course} />;
}
