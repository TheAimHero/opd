import { db as dbSchema } from '@opd/db_schema/patient';
import { createPatient } from '@opd/schema/patient';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { createPatientReqBody } = createPatient;

export const createPatientDb = async (
  patientData: z.infer<typeof createPatientReqBody>
) => {
  const [patient] = await db
    .insert(dbSchema.patientTable)
    .values(patientData)
    .returning();
  if (!patient) {
    throw new Error('Patient not created');
  }
  return patient;
};
