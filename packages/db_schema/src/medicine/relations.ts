import { relations } from "drizzle-orm";
import { prescribedMedicineTable } from "../prescribedMedicine/db";
import { medicineTable } from "./db";

export const medicineRelations = relations(medicineTable, ({ many }) => ({
  prescribedMedicines: many(prescribedMedicineTable),
}));
