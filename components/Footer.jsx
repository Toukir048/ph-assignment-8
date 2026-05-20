import Link from "next/link";
import { Facebook, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-black">SkillSphere</h2>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Practical online courses for ambitious learners who want clear paths,
            stronger portfolios, and career-ready skills.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/75">
          <p className="flex items-center gap-2">
            <Mail size={16} /> hello@skillsphere.dev
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> +880 1777 000 111
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} /> Dhaka, Bangladesh
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex gap-3">
            <a aria-label="Facebook" className="btn btn-circle btn-sm" href="#">
              <Facebook size={16} />
            </a>
            <a aria-label="LinkedIn" className="btn btn-circle btn-sm" href="#">
              <Linkedin size={16} />
            </a>
            <a aria-label="GitHub" className="btn btn-circle btn-sm" href="#">
              <Github size={16} />
            </a>
          </div>
          <div className="flex gap-4 text-sm text-white/70">
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
