import { schema } from "@opd/db_schema/data";

export const createDataReqBody = schema.dataInsertSchema.omit({
  id: true,
});

export const createDataRes = schema.dataSelectSchema;
