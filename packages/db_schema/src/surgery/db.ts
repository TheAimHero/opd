import { sql } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';

export const surgeryTable = pgTable('surgery', (d) => ({
  id: d.serial().primaryKey(),
  name: d.text().notNull(),

  createdAt: d
    .timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date()),
}));
