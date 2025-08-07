import { schema } from "@opd/db_schema/patient";
import { z } from "zod";

export const deletePatientReqParams = z.object({ id: z.coerce.number() });

export const deletePatientRes = schema.patientSelectSchema;
