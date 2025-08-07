import { pgTable } from 'drizzle-orm/pg-core';
import { testTable } from '../test/db';
import { visitTable } from '../visit/db';

export const prescribedTestTable = pgTable('prescribed_test', (d) => ({
  id: d.serial().primaryKey(),

  testId: d
    .integer('test_id')
    .notNull()
    .references(() => testTable.id, { onDelete: 'restrict' }),
  visitId: d
    .integer('visit_id')
    .notNull()
    .references(() => visitTable.id, { onDelete: 'cascade' }),

  note: d.text(),
}));
