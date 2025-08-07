import { db as dbSchema } from '@opd/db_schema/surgery';
import { getSurgery } from '@opd/schema/surgery';
import { eq, ilike } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { getAllSurgeryReqQuery, getSurgeryReqParams } = getSurgery;

export const getAllSurgeryDb = async (
  req: z.infer<typeof getAllSurgeryReqQuery>
) => {
  const surgery = await db
    .select()
    .from(dbSchema.surgeryTable)
    .where(
      req.search
        ? ilike(dbSchema.surgeryTable.name, `%${req.search}%`)
        : undefined
    )
    .limit(req.limit || -1)
    .offset(req.offset || 0);
  return surgery;
};

export const getSurgeryDb = async ({
  id,
}: z.infer<typeof getSurgeryReqParams>) => {
  const [surgery] = await db
    .select()
    .from(dbSchema.surgeryTable)
    .where(eq(dbSchema.surgeryTable.id, id))
    .limit(1);
  if (!surgery) throw new Error('Surgery not found');
  return surgery;
};
