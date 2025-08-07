import { updatePatient } from '@opd/schema/patient';
import { StatusCodes } from 'http-status-codes';
import { updatePatientDb } from '@/features/patient/db/update';
import type { Context, Next } from 'hono';

export const patchPatientHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = updatePatient.updatePatientReqBody.safeParse(
      await c.req.json()
    );
    const { success, data, error } = reqData;
    if (!success) throw error;
    const patient = await updatePatientDb(data);
    c.status(StatusCodes.OK);
    return c.json(patient);
  } catch (e) {
    throw e;
  }
};
