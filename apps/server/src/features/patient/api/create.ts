import { createPatient } from '@opd/schema/patient';
import { StatusCodes } from 'http-status-codes';
import { createPatientDb } from '@/features/patient/db/create';
import type { Context, Next } from 'hono';

export const createPatientHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = createPatient.createPatientReqBody.safeParse(
      await c.req.json()
    );
    const { success, data, error } = reqData;
    if (!success) throw error;
    const patient = await createPatientDb(data);
    c.status(StatusCodes.OK);
    return c.json(patient);
  } catch (e) {
    throw e;
  }
};
