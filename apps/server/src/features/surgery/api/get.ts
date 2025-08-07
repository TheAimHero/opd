import { getSurgery } from '@opd/schema/surgery';
import { StatusCodes } from 'http-status-codes';
import { getAllSurgeryDb, getSurgeryDb } from '@/features/surgery/db/get';
import type { Context, Next } from 'hono';

export const getAllSurgeryHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getSurgery.getAllSurgeryReqQuery.safeParse(c.req.query);
    const { success, data, error } = reqData;
    if (!success) throw error;
    const surgery = await getAllSurgeryDb(data);
    c.status(StatusCodes.OK);
    return c.json(surgery);
  } catch (e) {
    throw e;
  }
};

export const getSurgeryHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getSurgery.getSurgeryReqParams.safeParse(c.req.param());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const surgery = await getSurgeryDb(data);
    c.status(200);
    return c.json(surgery);
  } catch (e) {
    throw e;
  }
};
