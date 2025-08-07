import { env } from 'cloudflare:workers';
import { neon, neonConfig } from '@neondatabase/serverless';
import { relations as dbRelations, db as dbTables } from '@opd/db_schema';
import { drizzle } from 'drizzle-orm/neon-http';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: { ...dbTables, ...dbRelations },
});
