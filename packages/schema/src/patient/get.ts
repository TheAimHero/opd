import { schema } from '@opd/db_schema/patient';
import z from 'zod';

// get patient

export const getPatientReqParams = z.object({
  id: z.coerce.number(),
});

export const getPatientRes = schema.patientSelectSchema;

// get all patients

export const getAllPatientReqQuery = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export const getAllPatientRes = z.array(schema.patientSelectSchema);
