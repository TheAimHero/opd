import { schema } from "@opd/db_schema/medicine";

export const createMedicineReqBody = schema.medicineInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createMedicineRes = schema.medicineSelectSchema;
