import { getMedicine } from '@opd/schema/medicine';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { getAllMedicineDb, getMedicineDb } from '@/features/medicine/db/get';

export const getAllMedicineHandler = async (c: Context, _next: Next) => {
  const reqData = getMedicine.getAllMedicineReqQuery.safeParse(c.req.query());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const medicine = await getAllMedicineDb(data);
  c.status(StatusCodes.OK);
  return c.json(medicine);
};

export const getMedicineHandler = async (c: Context, _next: Next) => {
  const reqData = getMedicine.getMedicineReqParams.safeParse(c.req.param());
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const medicine = await getMedicineDb(data);
  c.status(StatusCodes.OK);
  return c.json(medicine);
};
