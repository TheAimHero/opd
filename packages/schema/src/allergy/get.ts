import { schema } from "@opd/db_schema/allergy";
import z from "zod";

export const getAllergyReqParams = z.object({ id: z.coerce.number() });

export const getAllergyRes = schema.allergySelectSchema;

export const getAllAllergyReqQuery = z.object({
  search: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getAllAllergyRes = z.array(schema.allergySelectSchema);
