import { getData } from '@opd/schema/data';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { getAllDataDb, getDataDb } from '@/features/data/db/get';

export const getAllDataHandler = async (c: Context, _next: Next) => {
  const reqData = getData.getAllDataReqQuery.safeParse(c.req.query());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const configData = await getAllDataDb(data);
  c.status(StatusCodes.OK);
  return c.json(configData);
};

export const getDataHandler = async (c: Context, _next: Next) => {
  const reqData = getData.getDataReqParams.safeParse(c.req.param());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const configData = await getDataDb(data);
  c.status(StatusCodes.OK);
  return c.json(configData);
};
