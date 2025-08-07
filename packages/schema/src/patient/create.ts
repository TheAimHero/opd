import { schema } from '@opd/db_schema/patient';

export const createPatientReqBody = schema.patientInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createPatientRes = schema.patientSelectSchema;
