# SkillSphere

SkillSphere is a modern online learning platform built for the category-A8-Orange assignment. Learners can explore skill-based courses, view popular and trending programs, authenticate, open protected course details, and update their profile information.

## Live URL

`https://ph-assignment-8-wheat.vercel.app`

## Key Features

- JSX-based responsive Next.js App Router layout with persistent navbar and footer.
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

## Environment Variables

Create a `.env.local` file based on `.env.example`.

```env
BETTER_AUTH_SECRET=replace-with-a-32-character-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

For Google login, add OAuth credentials from Google Cloud Console and include
this authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

For deployment, also add your production callback URL, for example:

```text
https://ph-assignment-8-wheat.vercel.app/api/auth/callback/google
```

If you open the app with the Network URL shown by Next.js, add that callback
URL too, for example:

```text
http://192.168.0.100:3000/api/auth/callback/google
```

Email/password authentication uses BetterAuth with the local SQLite database during development.

## Run Locally

```bash
npm install
npm run dev:local
```

Open `http://localhost:3000`.

Keep the terminal open while the website is running. If you close the terminal,
the local server will stop.

For a production-style local preview:

```bash
npm run preview
```

## Deployment Notes

Deploy on Vercel or another Next.js host. Add all environment variables in the hosting dashboard. For this deployment, use:

```env
BETTER_AUTH_URL=https://ph-assignment-8-wheat.vercel.app
NEXT_PUBLIC_APP_URL=https://ph-assignment-8-wheat.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

App Router routes are handled by Next.js, so direct reloads on nested routes such as `/courses/1` and `/my-profile` do not crash.

## Assignment Checklist

- Add GitHub repository link below.
- Add live deployment link below.
- Configure Google OAuth credentials before final hosting.
- Keep at least 10 meaningful commits in the submitted repository.
- Test responsive layouts on mobile, tablet, and desktop widths.

## Submission

Github Repo Link:

Live Link: https://ph-assignment-8-wheat.vercel.app
