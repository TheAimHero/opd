import { schema } from "@opd/db_schema/patient";
import z from "zod";

export const updatePatientReqBody = schema.patientUpdateSchema.extend({
  id: z.coerce.number(),
});

export const updatePatientRes = schema.patientSelectSchema;
