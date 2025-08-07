import { getPatient } from '@opd/schema/patient';
import { StatusCodes } from 'http-status-codes';
import { getAllPatientDb, getPatientDb } from '@/features/patient/db/get';
import type { Context, Next } from 'hono';

export const getAllPatientHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getPatient.getAllPatientReqQuery.safeParse(c.req.query());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const patient = await getAllPatientDb(data);
    c.status(StatusCodes.OK);
    return c.json(patient);
  } catch (e) {
    throw e;
  }
};

export const getPatientHandler = async (c: Context, _next: Next) => {
  try {
    const reqData = getPatient.getPatientReqParams.safeParse(c.req.param());
    const { success, data, error } = reqData;
    if (!success) throw error;
    const patient = await getPatientDb(data);
    c.status(200);
    return c.json(patient);
  } catch (e) {
    throw e;
  }
};
