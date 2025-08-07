import { schema } from "@opd/db_schema/data";
import { z } from "zod";

/**
 * Delete data request schema
 */
export const deleteDataReqParams = z.object({ id: z.coerce.number() });

/**
 * Delete data response schema
 */
export const deleteDataRes = schema.dataSelectSchema;
