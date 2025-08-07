import { createSchemaFactory } from "drizzle-zod";
import { allergyTable } from "./db";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ coerce: { number: true, date: true } });

export const allergyInsertSchema = createInsertSchema(allergyTable);

export const allergyUpdateSchema = createUpdateSchema(allergyTable);

export const allergySelectSchema = createSelectSchema(allergyTable);
