import { db as prescribedMedicineDbSchema } from '@opd/db_schema/prescribedMedicine';
import { db as prescribedTestDbSchema } from '@opd/db_schema/prescribedTest';
import { db as visitDbSchema } from '@opd/db_schema/visit';
import { createVisit } from '@opd/schema/visit';
import type { z } from 'zod';
import { db } from '@/lib/db';

type VisitData = z.infer<typeof createVisit.createVisitReqBody>;

export const createVisitDb = async (visitData: VisitData) => {
  const visit = await db.transaction(async (tx) => {
    const [visit] = await tx
      .insert(visitDbSchema.visitTable)
      .values(visitData)
      .returning();
    if (!visit) {
      tx.rollback();
      throw new Error('Visit not created');
    }

    const [medicine, test] = await Promise.all([
      visitData.medicine?.length &&
        tx
          .insert(prescribedMedicineDbSchema.prescribedMedicineTable)
          .values(visitData.medicine.map((m) => ({ ...m, visitId: visit.id })))
          .returning(),
      visitData.test?.length &&
        tx
          .insert(prescribedTestDbSchema.prescribedTestTable)
          .values(visitData.test.map((m) => ({ ...m, visitId: visit.id })))
          .returning(),
    ]);
    return { ...visit, medicine: medicine || [], test: test || [] };
  });

  return visit;
};
