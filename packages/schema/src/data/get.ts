import { config, schema } from '@opd/db_schema/data';
import z from 'zod';

export const getDataReqParams = z.object({ id: z.coerce.number() });

export const getDataRes = schema.dataSelectSchema;

export const getAllDataReqQuery = z.object({
  search: z.string().optional(),
  dataType: z.enum(config.DATA_TYPES).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getAllDataRes = z.array(schema.dataSelectSchema);
