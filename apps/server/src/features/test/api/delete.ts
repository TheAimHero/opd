import { deleteTest } from '@opd/schema/test';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { deleteTestDb } from '../db/delete';

export const deleteTestHandler = async (c: Context, _next: Next) => {
  const parsedParamsResult = deleteTest.deleteTestReqParams.safeParse(
    c.req.param()
  );
  const { success, data: params, error } = parsedParamsResult;
  if (!success) {
    throw error;
  }
  const test = await deleteTestDb(params);
  c.status(StatusCodes.OK);
  return c.json(test);
};
