import { schema } from "@opd/db_schema/medicine";
import { z } from "zod";

/**
 * Delete medicine request schema
 */
export const deleteMedicineReqParams = z.object({ id: z.coerce.number() });

/**
 * Delete medicine response schema
 */
export const deleteMedicineRes = schema.medicineSelectSchema;
