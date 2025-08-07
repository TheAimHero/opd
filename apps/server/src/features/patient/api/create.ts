import { createPatient } from '@opd/schema/patient';
import type { Context, Next } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createPatientDb } from '@/features/patient/db/create';

export const createPatientHandler = async (c: Context, _next: Next) => {
  const reqData = createPatient.createPatientReqBody.safeParse(
    await c.req.json()
  );
  const { success, data, error } = reqData;
  if (!success) {
    throw error;
  }
  const patient = await createPatientDb(data);
  c.status(StatusCodes.OK);
  return c.json(patient);
};
