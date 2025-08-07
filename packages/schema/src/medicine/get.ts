import { schema } from '@opd/db_schema/medicine';
import z from 'zod';

export const getMedicineReqParams = z.object({ id: z.coerce.number() });

export const getMedicineRes = schema.medicineSelectSchema;

export const getAllMedicineReqQuery = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export const getAllMedicineRes = z.array(schema.medicineSelectSchema);
