import { createData } from '@opd/schema/data';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createDataDb } from '@/features/data/db/create';

export const createDataHandler = async (c: Context, _next: Next) => {
  const reqData = createData.createDataReqBody.safeParse(await c.req.json());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const configData = await createDataDb(data);
  c.status(StatusCodes.OK);
  return c.json(configData);
};
