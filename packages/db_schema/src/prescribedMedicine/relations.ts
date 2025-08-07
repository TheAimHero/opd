import { relations } from 'drizzle-orm';
import { medicineTable } from '../medicine/db';
import { visitTable } from '../visit/db';
import { prescribedMedicineTable } from './db';

export const prescribedMedicineRelations = relations(
  prescribedMedicineTable,
  ({ one }) => ({
    patientVisit: one(visitTable, {
      fields: [prescribedMedicineTable.visitId],
      references: [visitTable.id],
    }),

    medicineVisit: one(medicineTable, {
      fields: [prescribedMedicineTable.medicineId],
      references: [medicineTable.id],
    }),
  })
);
