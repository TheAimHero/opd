import { schema } from '@opd/db_schema/allergy';
import { z } from 'zod';

/**
 * Delete allergy request schema
 */
export const deleteAllergyReqParams = z.object({ id: z.coerce.number() });

/**
 * Delete allergy response schema
 */
export const deleteAllergyRes = schema.allergySelectSchema;
