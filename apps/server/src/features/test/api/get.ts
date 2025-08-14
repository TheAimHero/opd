import { getTest } from '@opd/schema/test';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { getAllTestDb, getTestDb } from '@/features/test/db/get';

export const getAllTestHandler = async (c: Context, _next: Next) => {
  const reqData = getTest.getAllTestReqQuery.safeParse(c.req.query());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const test = await getAllTestDb(data);
  c.status(StatusCodes.OK);
  return c.json(test);
};

export const getTestHandler = async (c: Context, _next: Next) => {
  const reqData = getTest.getTestReqParams.safeParse(c.req.param());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const test = await getTestDb(data);
  c.status(200);
  return c.json(test);
};
