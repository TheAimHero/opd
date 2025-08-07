import { createSchemaFactory } from 'drizzle-zod';
import { prescribedMedicineTable } from './db';

const { createUpdateSchema, createSelectSchema, createInsertSchema } =
  createSchemaFactory({
    coerce: { number: true, date: true },
  });

export const prescribedMedicineInsertSchema = createInsertSchema(
  prescribedMedicineTable
);

export const prescribedMedicineUpdateSchema = createUpdateSchema(
  prescribedMedicineTable
);

export const prescribedMedicineSelectSchema = createSelectSchema(
  prescribedMedicineTable
);
