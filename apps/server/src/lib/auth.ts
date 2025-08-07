import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { env } from 'cloudflare:workers';
import { db as authSchema } from '@opd/db_schema/auth';
import { db as userSchema } from '@opd/db_schema/user';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { ...authSchema, user: userSchema.userTable },
  }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: { enabled: true },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
});
