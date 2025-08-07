import { schema as prescribedMedicineSchema } from "@opd/db_schema/prescribedMedicine";
import { schema as prescribedTestSchema } from "@opd/db_schema/prescribedTest";
import { schema } from "@opd/db_schema/visit";
import z from "zod";

export const getVisitReqParams = z.object({ id: z.coerce.number() });

export const getVisitRes = schema.visitSelectSchema.extend({
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

export const getAllVisitReqQuery = z.object({
  patientId: z.coerce.number().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
});

export const getAllVisitRes = z.array(getVisitRes);
