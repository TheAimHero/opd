import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from 'cloudflare:workers';
import ws from 'ws';

import { db as dbTables, relations as dbRelations } from '@opd/db_schema';

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: { ...dbTables, ...dbRelations },
});
