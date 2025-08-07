import { db as dbSchema } from '@opd/db_schema/patient';
import { getPatient } from '@opd/schema/patient';
import { desc, eq, ilike, or } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';
import { isWithinPostgresIntegerRange } from '@/utils/int-range';

const { getAllPatientReqQuery, getPatientReqParams } = getPatient;

export const getAllPatientDb = async (
  req: z.infer<typeof getAllPatientReqQuery>
) => {
  const userId = isWithinPostgresIntegerRange(req.search)
    ? Number.parseInt(req.search || '')
    : undefined;
  const patient = await db
    .select()
    .from(dbSchema.patientTable)
    .where(
      req.search
        ? or(
            ilike(dbSchema.patientTable.name, `%${req.search}%`),
            ilike(dbSchema.patientTable.phoneNumber, `%${req.search}%`),
            userId ? eq(dbSchema.patientTable.id, userId) : undefined
          )
        : undefined
    )
    .limit(req.limit || -1)
    .offset(req.offset || 0)
    .orderBy(desc(dbSchema.patientTable.createdAt));

  return patient;
};

export const getPatientDb = async ({
  id,
}: z.infer<typeof getPatientReqParams>) => {
  const [patient] = await db
    .select()
    .from(dbSchema.patientTable)
    .where(eq(dbSchema.patientTable.id, id))
    .limit(1);
  if (!patient) throw new Error('Patient not found');
  return patient;
};
