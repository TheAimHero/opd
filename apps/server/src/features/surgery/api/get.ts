import { getSurgery } from '@opd/schema/surgery';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { getAllSurgeryDb, getSurgeryDb } from '@/features/surgery/db/get';

export const getAllSurgeryHandler = async (c: Context, _next: Next) => {
  const reqData = getSurgery.getAllSurgeryReqQuery.safeParse(c.req.query());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const surgery = await getAllSurgeryDb(data);
  c.status(StatusCodes.OK);
  return c.json(surgery);
};

export const getSurgeryHandler = async (c: Context, _next: Next) => {
  const reqData = getSurgery.getSurgeryReqParams.safeParse(c.req.param());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const surgery = await getSurgeryDb(data);
  c.status(200);
  return c.json(surgery);
};
