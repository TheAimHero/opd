import { db as dbSchema } from '@opd/db_schema/patient';
import { updatePatient } from '@opd/schema/patient';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { updatePatientReqBody } = updatePatient;

export const updatePatientDb = async (
  patientData: z.infer<typeof updatePatientReqBody>
) => {
  const [patient] = await db
    .update(dbSchema.patientTable)
    .set(patientData)
    .where(eq(dbSchema.patientTable.id, patientData.id))
    .returning();
  if (!patient) {
    throw new Error('Patient not updated');
  }
  return patient;
};
