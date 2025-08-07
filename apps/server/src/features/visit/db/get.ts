import { db as dbSchema } from '@opd/db_schema/visit';
import { getVisit } from '@opd/schema/visit';
import { endOfDay, startOfDay } from 'date-fns';
import { and, desc, eq, gte, inArray, lte } from 'drizzle-orm';
import type { z } from 'zod';
import { getAllPatientDb } from '@/features/patient/db/get';
import { db } from '@/lib/db';

const { getAllVisitReqQuery, getVisitReqParams } = getVisit;

export const getAllVisitDb = async (
  req: z.infer<typeof getAllVisitReqQuery>
) => {
  const patients = await getAllPatientDb({ search: req.search });
  const visit = await db.query.visitTable.findMany({
    where: and(
      req.patientId
        ? eq(dbSchema.visitTable.patientId, req.patientId)
        : and(
            inArray(
              dbSchema.visitTable.patientId,
              patients.map((p) => p.id)
            ),
            req.start
              ? gte(dbSchema.visitTable.createdAt, startOfDay(req.start))
              : undefined,
            req.end
              ? lte(dbSchema.visitTable.createdAt, endOfDay(req.end))
              : undefined
          )
    ),
    orderBy: desc(dbSchema.visitTable.createdAt),
    limit: req.limit || -1,
    offset: req.offset || 0,
    with: { medicine: true, test: true },
  });
  return visit;
};

export const getVisitDb = async ({ id }: z.infer<typeof getVisitReqParams>) => {
  const visit = await db.query.visitTable.findFirst({
    where: eq(dbSchema.visitTable.id, id),
    orderBy: desc(dbSchema.visitTable.createdAt),
    with: { medicine: true, test: true },
  });
  if (!visit) {
    throw new Error('Visit not found');
  }
  return visit;
};
