import { db as dbSchema } from '@opd/db_schema/data';
import { createData } from '@opd/schema/data';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { createDataReqBody } = createData;

export const createDataDb = async (
  configData: z.infer<typeof createDataReqBody>
) => {
  const [data] = await db
    .insert(dbSchema.dataTable)
    .values(configData)
    .returning();
  if (!data) throw new Error('Data not created');
  return data;
};
