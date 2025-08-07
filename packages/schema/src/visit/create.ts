import { schema as prescribedMedicineSchema } from "@opd/db_schema/prescribedMedicine";
import { schema as prescribedTestSchema } from "@opd/db_schema/prescribedTest";
import { schema as visitSchema } from "@opd/db_schema/visit";
import z from "zod";

export const createVisitReqBody = visitSchema.visitInsertSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    medicine: z
      .array(
        prescribedMedicineSchema.prescribedMedicineInsertSchema.omit({
          visitId: true,
        }),
      )
      .optional(),

    test: z
      .array(
        prescribedTestSchema.prescribedTestInsertSchema.omit({ visitId: true }),
      )
      .optional(),
  });

export const createVisitRes = visitSchema.visitSelectSchema.extend({
  medicine: z
    .array(prescribedMedicineSchema.prescribedMedicineSelectSchema)
    .optional(),

  test: z.array(prescribedTestSchema.prescribedTestSelectSchema).optional(),
});
