import { createSchemaFactory } from "drizzle-zod";
import { surgeryTable } from "./db";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ coerce: { number: true, date: true } });

export const surgeryInsertSchema = createInsertSchema(surgeryTable);

export const surgeryUpdateSchema = createUpdateSchema(surgeryTable);

export const surgerySelectSchema = createSelectSchema(surgeryTable);
