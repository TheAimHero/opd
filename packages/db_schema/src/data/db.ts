import { sql } from 'drizzle-orm';
import { pgEnum, pgTable, unique } from 'drizzle-orm/pg-core';
import { DATA_TYPES } from './config';

export const dataType = pgEnum('data_type', DATA_TYPES);

export const dataTable = pgTable(
  'data',
  (d) => ({
    id: d.serial().primaryKey(),
    data: d.text().notNull(),
    dataType: dataType('data_type').notNull(),

    createdAt: d
      .timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: d
      .timestamp('updated_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  }),
  (t) => [unique('data_unique').on(t.dataType, t.data)]
);
