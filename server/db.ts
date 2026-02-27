import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import pg from "pg";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Detect if we're using SQLite (local dev) or PostgreSQL (production)
const isProduction = process.env.NODE_ENV === "production";
const isSqlite = process.env.DATABASE_URL.startsWith("file:");

let db: any;
let pool: any;

if (isSqlite) {
  // SQLite for local development
  const dbPath = process.env.DATABASE_URL.replace("file:", "");
  const sqlite = new Database(dbPath);
  db = drizzleSqlite(sqlite, { schema });
  console.log("✅ Using SQLite database:", dbPath);
} else {
  // PostgreSQL for production (Vercel)
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzlePg(pool, { schema });
  console.log("✅ Using PostgreSQL database");
}

export { db, pool };