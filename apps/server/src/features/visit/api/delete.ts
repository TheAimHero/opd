import { deleteVisit } from '@opd/schema/visit';
import { StatusCodes } from 'http-status-codes';
import { deleteVisitDb } from '@/features/visit/db/delete';
import type { Context, Next } from 'hono';

export const deleteVisitHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = deleteVisit.deleteVisitReqParams.safeParse(c.req.param());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const visit = await deleteVisitDb(data);
    c.status(StatusCodes.OK);
    return c.json(visit);
  } catch (e) {
    throw e;
  }
};
