import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, GraduationCap, Sparkles, Target } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { SectionTitle } from "@/components/SectionTitle";
import { popularCourses, trendingCourses } from "@/data/courses";

const instructors = [
  {
    name: "Maya Chen",
    role: "Product Design Mentor",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Rafi Ahmed",
    role: "Growth Strategist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Aisha Rahman",
    role: "AI Workflow Coach",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Elena Torres",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-ink text-white">
        <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate__animated animate__fadeInLeft">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-citrus">
              <Sparkles size={16} /> Upgrade Your Skills Today
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Learn from industry experts and build skills that move.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Explore practical programs in development, design, marketing, data,
              business, and AI productivity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href="/courses">
                Browse Courses
              </Link>
              <Link className="btn border-white/30 bg-white/10 text-white hover:bg-white/20" href="/register">
                Start Learning
              </Link>
            </div>
          </div>
          <div className="relative animate__animated animate__fadeInRight">
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Students learning together"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-lg bg-white p-5 text-ink shadow-soft">
              <p className="text-3xl font-black">6+</p>
              <p className="text-sm text-ink/65">career-ready courses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <SectionTitle
          eyebrow="Popular Courses"
          title="Highest-rated learning paths"
          text="Start with the courses learners are loving most this week."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Learning Tips"
            title="Study smarter, finish stronger"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Set weekly outcomes",
                text: "Choose one practical result before you start each module."
              },
              {
                icon: Clock,
                title: "Use focused blocks",
                text: "Learn in 45 minute sessions and reserve 15 minutes for practice."
              },
              {
                icon: GraduationCap,
                title: "Teach it back",
                text: "Summarize lessons in your own words to lock in the skill."
              }
            ].map((tip) => (
              <div className="rounded-lg border border-black/10 p-6" key={tip.title}>
                <tip.icon className="text-primary" size={28} />
                <h3 className="mt-4 text-xl font-bold text-ink">{tip.title}</h3>
                <p className="mt-2 text-ink/65">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <SectionTitle eyebrow="Trending Courses" title="New energy in the catalog" />
        <div className="grid gap-6 md:grid-cols-3">
          {trendingCourses.map((course) => (
            <div className="rounded-lg bg-ink p-5 text-white" key={course.id}>
              <Flame className="text-citrus" size={24} />
              <h3 className="mt-4 text-xl font-bold">{course.title}</h3>
              <p className="mt-2 text-sm text-white/65">{course.category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell">
          <SectionTitle eyebrow="Top Instructors" title="Guides with real practice" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((instructor) => (
              <article className="text-center" key={instructor.name}>
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full">
                  <Image src={instructor.image} alt={instructor.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{instructor.name}</h3>
                <p className="text-sm text-ink/65">{instructor.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
