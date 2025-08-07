import { RPCHandler } from '@orpc/server/fetch';
import { getSession } from '@/lib/context';
import { appRouter } from '.';
import type { Context, Next } from 'hono';

const handler = new RPCHandler(appRouter);

export const honoRpcRouter = async (c: Context, next: Next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: { session: await getSession(c) },
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
};
