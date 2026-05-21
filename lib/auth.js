import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import pg from "pg";

const { Pool } = pg;

const configuredBaseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const configuredHosts = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL
]
  .filter(Boolean)
  .flatMap((url) => {
    try {
      return [new URL(url).host];
    } catch {
      return [];
    }
  });

const localOrigins = [
  "http://localhost:*",
  "http://127.0.0.1:*",
  "http://[::1]:*",
  "http://192.168.*.*:*",
  "http://10.*.*.*:*",
  "http://172.*.*.*:*"
];

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const socialProviders =
  googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret
        }
      }
    : {};

const database = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? false
        : { rejectUnauthorized: false }
    })
  : new Database("./skillsphere.sqlite");

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "skillsphere-local-dev-secret-change-before-production",
  baseURL: {
    allowedHosts: [
      ...new Set([
        ...configuredHosts,
        "localhost:*",
        "127.0.0.1:*",
        "[::1]:*",
        "192.168.*.*:*",
        "10.*.*.*:*",
        "172.*.*.*:*"
      ])
    ],
    fallback: configuredBaseURL
  },
  database,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  socialProviders,
  user: {
    changeEmail: {
      enabled: false
    }
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.BETTER_AUTH_URL,
    ...localOrigins
  ].filter(Boolean)
});
