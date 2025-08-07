import { schema } from "@opd/db_schema/medicalHistory";
import { z } from "zod";

export const getPatientMedicalHistoryReqParams = z.object({
  id: z.coerce.number(),
});

export const getPatientMedicalHistoryRes = z.array(
  schema.medicalHistorySelectSchema,
);
