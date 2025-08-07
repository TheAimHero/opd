import { getVisit } from '@opd/schema/visit';
import { StatusCodes } from 'http-status-codes';
import { getAllVisitDb, getVisitDb } from '@/features/visit/db/get';
import type { Context, Next } from 'hono';

export const getAllVisitHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getVisit.getAllVisitReqQuery.safeParse(c.req.query());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const visits = await getAllVisitDb(data);
    c.status(StatusCodes.OK);
    return c.json(visits);
  } catch (e) {
    throw e;
  }
};

export const getVisitHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getVisit.getVisitReqParams.safeParse(c.req.param());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const visit = await getVisitDb(data);
    c.status(200);
    return c.json(visit);
  } catch (e) {
    throw e;
  }
};
