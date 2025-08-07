import { db as dbSchema } from '@opd/db_schema/data';
import { getData } from '@opd/schema/data';
import { and, eq, ilike } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/lib/db';

const { getAllDataReqQuery, getDataReqParams } = getData;

export const getAllDataDb = async (req: z.infer<typeof getAllDataReqQuery>) => {
  const data = await db
    .select()
    .from(dbSchema.dataTable)
    .where(
      and(
        req.search
          ? ilike(dbSchema.dataTable.data, `%${req.search}%`)
          : undefined,
        req.dataType ? eq(dbSchema.dataTable.dataType, req.dataType) : undefined
      )
    )
    .limit(req.limit || -1)
    .offset(req.offset || 0);
  return data;
};

export const getDataDb = async ({ id }: z.infer<typeof getDataReqParams>) => {
  const [data] = await db
    .select()
    .from(dbSchema.dataTable)
    .where(eq(dbSchema.dataTable.id, id))
    .limit(1);
  if (!data) {
    throw new Error('Data not found');
  }
  return data;
};
