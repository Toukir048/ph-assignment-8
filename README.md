# SkillSphere

SkillSphere is a modern online learning platform built for the category-A8-Orange assignment. Learners can explore skill-based courses, view popular and trending programs, authenticate, open protected course details, and update their profile information.

## Live URL

Add your deployed link here after hosting:

`https://your-skillsphere-live-url.vercel.app`

## Key Features

- Responsive Next.js App Router layout with persistent navbar and footer.
- Home page hero, popular courses, learning tips, trending courses, and top instructors.
- All Courses page with title-based search.
- Protected course details pages with curriculum lists and login redirect.
- Login and registration pages with email/password and Google social login button.
- My Profile page with name, email, avatar, and profile update route.
- Toast notifications with `sonner`.
- Loader and custom not-found page.
- Better Auth server route at `/api/auth/[...all]` and `authClient.updateUser` profile update usage.

## NPM Packages Used

- `next`
- `react`
- `tailwindcss`
- `daisyui`
- `better-auth`
- `better-sqlite3`
- `sonner`
- `lucide-react`
- `animate.css`
- `framer-motion`

## Environment Variables

Create a `.env.local` file based on `.env.example`.

```env
BETTER_AUTH_SECRET=replace-with-a-32-character-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

For Google login, add OAuth credentials from Google Cloud Console. Email/password forms include a demo fallback so reviewers can still navigate the protected UI if external auth configuration is unavailable.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment Notes

Deploy on Vercel or another Next.js host. Add all environment variables in the hosting dashboard. App Router routes are handled by Next.js, so direct reloads on nested routes such as `/courses/1` and `/my-profile` do not crash.

## Submission

Github Repo Link:

Live Link:
