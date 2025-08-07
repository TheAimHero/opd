import { createSchemaFactory } from 'drizzle-zod';
import z from 'zod';
import { patientTable } from './db';

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ coerce: { number: true, date: true }, zodInstance: z });

export const patientInsertSchema = createInsertSchema(patientTable);

export const patientUpdateSchema = createUpdateSchema(patientTable);

export const patientSelectSchema = createSelectSchema(patientTable);
