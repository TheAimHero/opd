import { db as dbSchema } from '@opd/db_schema/medicine';
import { createMedicine } from '@opd/schema/medicine';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { createMedicineReqBody } = createMedicine;

export const createMedicineDb = async (
  medicineData: z.infer<typeof createMedicineReqBody>
) => {
  const [medicine] = await db
    .insert(dbSchema.medicineTable)
    .values(medicineData)
    .returning();
  if (!medicine) {
    throw new Error('Medicine not created');
  }
  return medicine;
};
