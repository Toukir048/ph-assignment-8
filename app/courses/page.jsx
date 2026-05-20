import { CoursesClient } from "@/app/courses/CoursesClient";
import { SectionTitle } from "@/components/SectionTitle";
import { courses } from "@/data/courses";

async function getCourses() {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return courses;
}

export default async function CoursesPage() {
  const allCourses = await getCourses();

  return (
    <section className="page-shell">
      <SectionTitle
        eyebrow="All Courses"
        title="Explore the full SkillSphere catalog"
        text="Search by title and open any course to view protected details."
      />
      <CoursesClient courses={allCourses} />
    </section>
  );
}
