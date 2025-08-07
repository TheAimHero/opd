import { db as dbSchema } from '@opd/db_schema/surgery';
import { createSurgery } from '@opd/schema/surgery';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { createSurgeryReqBody } = createSurgery;

export const createSurgeryDb = async (
  surgeryData: z.infer<typeof createSurgeryReqBody>
) => {
  const [surgery] = await db
    .insert(dbSchema.surgeryTable)
    .values(surgeryData)
    .returning();
  if (!surgery) {
    throw new Error('Surgery not created');
  }
  return surgery;
};
