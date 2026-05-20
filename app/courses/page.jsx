import { CoursesClient } from "@/app/courses/CoursesClient";
import { SectionTitle } from "@/components/SectionTitle";
import { courses } from "@/data/courses";

async function getCourses() {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return courses;
}

export default async function CoursesPage() {
  const allCourses = await getCourses();
  const categories = new Set(allCourses.map((course) => course.category)).size;
  const topRating = Math.max(...allCourses.map((course) => course.rating));

  return (
    <section className="page-shell">
      <SectionTitle
        eyebrow="All Courses"
        title="Explore the full SkillSphere catalog"
        text="Search by title and open any course to view protected details."
      />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-black text-primary">{allCourses.length}</p>
          <p className="text-sm text-ink/65">Available courses</p>
        </div>
        <div className="rounded-lg bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-black text-secondary">{categories}</p>
          <p className="text-sm text-ink/65">Skill categories</p>
        </div>
        <div className="rounded-lg bg-white p-5 text-center shadow-sm">
          <p className="text-3xl font-black text-amber-500">{topRating}</p>
          <p className="text-sm text-ink/65">Highest course rating</p>
        </div>
      </div>
      <CoursesClient courses={allCourses} />
    </section>
  );
}
