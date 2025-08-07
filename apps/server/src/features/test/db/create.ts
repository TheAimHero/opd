import { db as dbSchema } from '@opd/db_schema/test';
import { createTest } from '@opd/schema/test';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { createTestReqBody } = createTest;

export const createTestDb = async (
  testData: z.infer<typeof createTestReqBody>
) => {
  const [test] = await db
    .insert(dbSchema.testTable)
    .values(testData)
    .returning();
  if (!test) {
    throw new Error('Test not created');
  }
  return test;
};
