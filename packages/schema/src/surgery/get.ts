import { schema } from '@opd/db_schema/surgery';
import z from 'zod';

export const getSurgeryReqParams = z.object({ id: z.coerce.number() });

export const getSurgeryResSchema = schema.surgerySelectSchema;

// get all surgery

export const getAllSurgeryReqQuery = z.object({
  search: z.coerce.string().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export const getAllSurgeryRes = z.array(schema.surgerySelectSchema);
