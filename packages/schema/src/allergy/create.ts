import { schema } from '@opd/db_schema/allergy';

export const createAllergyReqBody = schema.allergyInsertSchema.omit({
  id: true,
});

export const createAllergyRes = schema.allergySelectSchema;
