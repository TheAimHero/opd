import { pgTable } from 'drizzle-orm/pg-core';
import { medicineTable } from '../medicine/db';
import { visitTable } from '../visit/db';

export const prescribedMedicineTable = pgTable('prescribed_medicine', (d) => ({
  id: d.serial().primaryKey(),

  medicineId: d
    .integer('medicine_id')
    .notNull()
    .references(() => medicineTable.id, { onDelete: 'restrict' }),
  visitId: d
    .integer('visit_id')
    .notNull()
    .references(() => visitTable.id, { onDelete: 'cascade' }),

  note: d.text(),
  morning: d.integer().default(0),
  afternoon: d.integer().default(0),
  evening: d.integer().default(0),
}));
