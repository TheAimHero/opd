import { db as dbSchema } from '@opd/db_schema/medicine';
import { deleteMedicine } from '@opd/schema/medicine';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { deleteMedicineReqParams } = deleteMedicine;

export const deleteMedicineDb = async ({
  id,
}: z.infer<typeof deleteMedicineReqParams>) => {
  const [medicine] = await db
    .delete(dbSchema.medicineTable)
    .where(eq(dbSchema.medicineTable.id, id))
    .returning();
  if (!medicine) throw new Error('Medicine not found');
  return medicine;
};
