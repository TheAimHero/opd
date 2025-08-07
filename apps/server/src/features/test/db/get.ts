import { db as dbSchema } from '@opd/db_schema/test';
import { getTest } from '@opd/schema/test';
import { eq, ilike } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { getAllTestReqQuery, getTestReqParams } = getTest;

export const getAllTestDb = async (req: z.infer<typeof getAllTestReqQuery>) => {
  const test = await db
    .select()
    .from(dbSchema.testTable)
    .where(
      req.search ? ilike(dbSchema.testTable.name, `%${req.search}%`) : undefined
    )
    .limit(req.limit || -1)
    .offset(req.offset || 0);
  return test;
};

export const getTestDb = async ({ id }: z.infer<typeof getTestReqParams>) => {
  const [test] = await db
    .select()
    .from(dbSchema.testTable)
    .where(eq(dbSchema.testTable.id, id))
    .limit(1);
  if (!test) throw new Error('Test not found');
  return test;
};
