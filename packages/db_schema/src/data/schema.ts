import { createSchemaFactory } from "drizzle-zod";
import { dataTable } from "./db";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ coerce: { number: true, date: true } });

export const dataInsertSchema = createInsertSchema(dataTable);

export const dataUpdateSchema = createUpdateSchema(dataTable);

export const dataSelectSchema = createSelectSchema(dataTable);
