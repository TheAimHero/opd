import { createSchemaFactory } from 'drizzle-zod';
import z from 'zod';
import { medicineTable } from './db';

export const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: { number: true, date: true },
    zodInstance: z,
  });

export const medicineInsertSchema = createInsertSchema(medicineTable, {
  name: (s) => s.nonempty('Name is required.'),
});

export const medicineUpdateSchema = createUpdateSchema(medicineTable);

export const medicineSelectSchema = createSelectSchema(medicineTable);
