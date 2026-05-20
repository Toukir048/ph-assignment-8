import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "SkillSphere | Online Learning Platform",
  description:
    "SkillSphere helps learners explore practical courses, instructors, and skill-based programs."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="skillsphere">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
