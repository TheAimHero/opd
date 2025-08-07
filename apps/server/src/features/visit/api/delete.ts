import { deleteVisit } from '@opd/schema/visit';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { deleteVisitDb } from '@/features/visit/db/delete';

export const deleteVisitHandler = async (c: Context, _next: Next) => {
  const reqData = deleteVisit.deleteVisitReqParams.safeParse(c.req.param());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const visit = await deleteVisitDb(data);
  c.status(StatusCodes.OK);
  return c.json(visit);
};
