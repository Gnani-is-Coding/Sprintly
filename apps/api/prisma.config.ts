import { defineConfig } from "prisma/config";
import { loadEnvironment } from "./env";

loadEnvironment();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma CLI (migrate, db push, studio) connects via this URL.
  // Use the DIRECT URL (port 5432) — Supabase's pgbouncer pooler breaks migrations.
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
