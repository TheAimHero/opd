import { createSchemaFactory } from 'drizzle-zod';
import z from 'zod';
import { visitTable } from './db';

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: { number: true, date: true },
    zodInstance: z,
  });

export const visitInsertSchema = createInsertSchema(visitTable);

export const visitUpdateSchema = createUpdateSchema(visitTable);

export const visitSelectSchema = createSelectSchema(visitTable);
