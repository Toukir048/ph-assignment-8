"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, LogOut, Menu, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { clearLocalSession } from "@/lib/local-auth";
import { useAuth } from "@/components/AuthProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/my-profile", label: "My Profile" }
];

const isActiveRoute = (pathname, href) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await authClient.signOut();
    } finally {
      clearLocalSession();
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  const navLinks = (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={isActiveRoute(pathname, link.href) ? "font-semibold text-primary" : ""}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              className="btn btn-ghost lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              type="button"
            >
              <Menu size={22} />
            </button>
            {mobileMenuOpen ? (
              <ul className="menu dropdown-content z-[60] mt-3 w-52 rounded-box bg-base-100 p-2 shadow lg:hidden">
                {navLinks}
              </ul>
            ) : null}
          </div>
          <Link className="flex items-center gap-2 text-xl font-black text-ink" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-white">
              <BookOpen size={22} />
            </span>
            SkillSphere
          </Link>
        </div>
        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navLinks}</ul>
        </nav>
        <div className="navbar-end gap-2">
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <>
              <Link
                aria-label="Profile"
                className="avatar btn btn-circle btn-ghost"
                href="/my-profile"
              >
                <div className="h-9 w-9 rounded-full bg-secondary/20">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="m-2 text-secondary" size={20} />
                  )}
                </div>
              </Link>
              <button className="btn btn-primary btn-sm" onClick={logout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost btn-sm" href="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
