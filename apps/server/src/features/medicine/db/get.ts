import { db as dbSchema } from '@opd/db_schema/medicine';
import { getMedicine } from '@opd/schema/medicine';
import { eq, ilike } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { getAllMedicineReqQuery, getMedicineReqParams } = getMedicine;

export const getAllMedicineDb = async (
  req: z.infer<typeof getAllMedicineReqQuery>
) => {
  const medicine = await db
    .select()
    .from(dbSchema.medicineTable)
    .where(
      req.search
        ? ilike(dbSchema.medicineTable.name, `%${req.search}%`)
        : undefined
    )
    .limit(req.limit || -1)
    .offset(req.offset || 0);
  return medicine;
};

export const getMedicineDb = async ({
  id,
}: z.infer<typeof getMedicineReqParams>) => {
  const [medicine] = await db
    .select()
    .from(dbSchema.medicineTable)
    .where(eq(dbSchema.medicineTable.id, id))
    .limit(1);
  if (!medicine) {
    throw new Error('Medicine not found');
  }
  return medicine;
};
