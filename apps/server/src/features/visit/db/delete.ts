import { db as visitDbSchema } from '@opd/db_schema/visit';
import { deleteVisit } from '@opd/schema/visit';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { deleteVisitReqParams } = deleteVisit;

export const deleteVisitDb = async ({
  id,
}: z.infer<typeof deleteVisitReqParams>) => {
  const [visit] = await db
    .delete(visitDbSchema.visitTable)
    .where(eq(visitDbSchema.visitTable, id))
    .returning();
  if (!visit) {
    throw new Error('Visit not found. Nothing deleted.');
  }
  return visit;
};
