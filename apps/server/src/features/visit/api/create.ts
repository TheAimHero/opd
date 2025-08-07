import { createVisit } from '@opd/schema/visit';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createVisitDb } from '@/features/visit/db/create';

export const createVisitHandler = async (c: Context, _next: Next) => {
  const reqData = createVisit.createVisitReqBody.safeParse(await c.req.json());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const visit = await createVisitDb(data);
  c.status(StatusCodes.OK);
  return c.json(visit);
};
