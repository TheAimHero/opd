import { db as dbSchema } from '@opd/db_schema/test';
import { deleteTest } from '@opd/schema/test';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { deleteTestReqParams } = deleteTest;

export const deleteTestDb = async ({
  id,
}: z.infer<typeof deleteTestReqParams>) => {
  const [test] = await db
    .delete(dbSchema.testTable)
    .where(eq(dbSchema.testTable.id, id))
    .returning();
  if (!test) {
    throw new Error('Test not found');
  }
  return test;
};
