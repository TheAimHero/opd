import { getMedicine } from '@opd/schema/medicine';
import { StatusCodes } from 'http-status-codes';
import { getAllMedicineDb, getMedicineDb } from '@/features/medicine/db/get';
import type { Context, Next } from 'hono';

export const getAllMedicineHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getMedicine.getAllMedicineReqQuery.safeParse(c.req.query());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const medicine = await getAllMedicineDb(data);
    c.status(StatusCodes.OK);
    return c.json(medicine);
  } catch (e) {
    throw e;
  }
};

export const getMedicineHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getMedicine.getMedicineReqParams.safeParse(c.req.param());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const medicine = await getMedicineDb(data);
    c.status(StatusCodes.OK);
    return c.json(medicine);
  } catch (e) {
    throw e;
  }
};
