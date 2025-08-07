import { createSurgery } from '@opd/schema/surgery';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createSurgeryDb } from '@/features/surgery/db/create';

export const createSurgeryHandler = async (c: Context, _next: Next) => {
  const reqData = createSurgery.createSurgeryReqBody.safeParse(
    await c.req.json()
  );
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const surgery = await createSurgeryDb(data);
  c.status(StatusCodes.OK);
  return c.json(surgery);
};
