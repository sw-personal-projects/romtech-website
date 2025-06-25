import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

// logger for drizzle
const logger = {
  logQuery: (query: string, params: unknown[]) => {
    console.log(query, params);
  },
};

const db = drizzle(sql, { logger });

export { db };