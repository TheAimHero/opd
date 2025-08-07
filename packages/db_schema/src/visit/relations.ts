import { relations } from "drizzle-orm";
import { patientTable } from "../patient/db";
import { prescribedMedicineTable } from "../prescribedMedicine/db";
import { prescribedTestTable } from "../prescribedTest/db";
import { visitTable } from "./db";

export const visitRelations = relations(visitTable, ({ one, many }) => ({
  patient: one(patientTable, {
    fields: [visitTable.patientId],
    references: [patientTable.id],
  }),

  medicine: many(prescribedMedicineTable),

  test: many(prescribedTestTable),
}));
