import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-black text-ink">Page not found</h1>
        <p className="mt-3 max-w-md text-ink/65">
          The route you are looking for is not available in SkillSphere.
        </p>
        <Link className="btn btn-primary mt-6" href="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
