import { getMigrations } from "../node_modules/better-auth/dist/db/get-migration.mjs";
import { auth } from "../lib/auth.js";

const migration = await getMigrations(auth.options);

if (!migration.toBeCreated.length && !migration.toBeAdded.length) {
  console.log("BetterAuth database schema is already up to date.");
  process.exit(0);
}

await migration.runMigrations();
console.log("BetterAuth database schema migrated successfully.");
