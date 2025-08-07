import { getTest } from '@opd/schema/test';
import { StatusCodes } from 'http-status-codes';
import { getAllTestDb, getTestDb } from '@/features/test/db/get';
import type { Context, Next } from 'hono';

export const getAllTestHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getTest.getAllTestReqQuery.safeParse(c.req.query);
    const { success, data, error } = reqData;
    if (!success) throw error;
    const test = await getAllTestDb(data);
    c.status(StatusCodes.OK);
    return c.json(test);
  } catch (e) {
    throw e;
  }
};

export const getTestHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getTest.getTestReqParams.safeParse(c.req.param());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const test = await getTestDb(data);
    c.status(200);
    return c.json(test);
  } catch (e) {
    throw e;
  }
};
