import { schema } from '@opd/db_schema/test';

export const createTestReqBody = schema.testInsertSchema.omit({
  id: true,
});

export const createTestRes = schema.testSelectSchema;
