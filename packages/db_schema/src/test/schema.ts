import { createSchemaFactory } from "drizzle-zod";
import { testTable } from "./db";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: { number: true, date: true, string: true },
  });

export const testInsertSchema = createInsertSchema(testTable, {
  name: (s) => s.nonempty("Name is required."),
});

export const testUpdateSchema = createUpdateSchema(testTable);

export const testSelectSchema = createSelectSchema(testTable);
