import { schema } from '@opd/db_schema/surgery';

export const createSurgeryReqBody = schema.surgeryInsertSchema.omit({
  id: true,
});

export const createSurgeryRes = schema.surgerySelectSchema;
