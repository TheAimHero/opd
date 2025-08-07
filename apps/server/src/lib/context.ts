import type { Context as HonoContext } from 'hono';
import { auth } from './auth';

export type CreateContextOptions = {
  context: HonoContext;
};

export const getSession = async (context: HonoContext) => {
  return await auth.api.getSession({
    headers: context.req.raw.headers,
  });
};

export type Context = { session: Awaited<ReturnType<typeof getSession>> };
