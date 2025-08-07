import { schema } from "@opd/db_schema/test";
import z from "zod";

export const getTestReqParams = z.object({ id: z.coerce.number() });

export const getTestRes = schema.testSelectSchema;

export const getAllTestReqQuery = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export const getAllTestRes = z.array(schema.testSelectSchema);
