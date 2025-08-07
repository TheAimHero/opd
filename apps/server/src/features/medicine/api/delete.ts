import { deleteMedicine } from '@opd/schema/medicine';
import { StatusCodes } from 'http-status-codes';
import { deleteMedicineDb } from '../db/delete';
import type { Context, Next } from 'hono';

export const deleteMedicineHandler = async (c: Context, _next: Next) => {
  try {
    const parsedParamsResult = deleteMedicine.deleteMedicineReqParams.safeParse(
      c.req.param()
    );
    const { success, data: params, error } = parsedParamsResult;
    if (!success) throw error;
    const medicine = await deleteMedicineDb(params);
    c.status(StatusCodes.OK);
    return c.json(medicine);
  } catch (e) {
    throw e;
  }
};
