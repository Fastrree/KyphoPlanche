import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Production: Always use PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzlePg(pool, { schema });

console.log("✅ Using PostgreSQL database");

export { db, pool };