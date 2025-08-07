import { createTest } from '@opd/schema/test';
import { StatusCodes } from 'http-status-codes';
import { createTestDb } from '@/features/test/db/create';
import type { Context, Next } from 'hono';

export const createTestHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = createTest.createTestReqBody.safeParse(await c.req.json());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const test = await createTestDb(data);
    c.status(StatusCodes.OK);
    return c.json(test);
  } catch (e) {
    throw e;
  }
};
