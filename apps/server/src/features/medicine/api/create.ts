import { createMedicine } from '@opd/schema/medicine';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createMedicineDb } from '@/features/medicine/db/create';

export const createMedicineHandler = async (c: Context, _next: Next) => {
  const reqData = createMedicine.createMedicineReqBody.safeParse(c.req.json());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const medicine = await createMedicineDb(data);
  c.status(StatusCodes.OK);
  return c.json(medicine);
};
