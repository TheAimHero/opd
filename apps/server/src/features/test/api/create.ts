import { createTest } from '@opd/schema/test';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createTestDb } from '@/features/test/db/create';

export const createTestHandler = async (c: Context, _next: Next) => {
  const reqData = createTest.createTestReqBody.safeParse(await c.req.json());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const test = await createTestDb(data);
  c.status(StatusCodes.OK);
  return c.json(test);
};
