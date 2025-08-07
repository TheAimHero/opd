import { schema } from '@opd/db_schema/me';

export const createMedicalHistoryReqBody = schema.medicalHistoryInsertSchema;

export const createMedicalHistoryRes = schema.medicalHistorySelectSchema;
