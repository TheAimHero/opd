import { createVisit } from '@opd/schema/visit';
import { StatusCodes } from 'http-status-codes';
import { createVisitDb } from '@/features/visit/db/create';
import type { Context, Next } from 'hono';

export const createVisitHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = createVisit.createVisitReqBody.safeParse(
      await c.req.json()
    );
    const { success, data, error } = reqData;
    if (!success) throw error;
    const visit = await createVisitDb(data);
    c.status(StatusCodes.OK);
    return c.json(visit);
  } catch (e) {
    throw e;
  }
};
