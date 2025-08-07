import { schema } from "@opd/db_schema/surgery";
import { z } from "zod";

/**
 * Delete surgery request schema
 */
export const deleteSurgeryReqParams = z.object({ id: z.coerce.number() });

/**
 * Delete surgery response schema
 */
export const deleteSurgeryRes = schema.surgerySelectSchema;
