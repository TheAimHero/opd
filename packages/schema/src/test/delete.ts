import { schema } from "@opd/db_schema/test";
import { z } from "zod";

/**
 * Delete test request schema
 */
export const deleteTestReqParams = z.object({ id: z.coerce.number() });

/**
 * Delete test response schema
 */
export const deleteTestRes = schema.testSelectSchema;
