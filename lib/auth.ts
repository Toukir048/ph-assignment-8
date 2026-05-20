import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "skillsphere-local-dev-secret-change-before-production",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  database: new Database("./skillsphere.sqlite"),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }
  },
  user: {
    changeEmail: {
      enabled: false
    }
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"]
});
