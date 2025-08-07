import { updatePatient } from '@opd/schema/patient';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { updatePatientDb } from '@/features/patient/db/update';

export const patchPatientHandler = async (c: Context, _next: Next) => {
  const reqData = updatePatient.updatePatientReqBody.safeParse(
    await c.req.json()
  );
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const patient = await updatePatientDb(data);
  c.status(StatusCodes.OK);
  return c.json(patient);
};
