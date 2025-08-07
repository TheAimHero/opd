import { schema } from '@opd/db_schema/visit';
import { z } from 'zod';

/**
 * Delete visit request schema
 */
export const deleteVisitReqParams = z.object({ id: z.coerce.number() });

/**
 * Delete visit response schema
 */
export const deleteVisitRes = schema.visitSelectSchema;
