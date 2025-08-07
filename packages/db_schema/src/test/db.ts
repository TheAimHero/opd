import { sql } from "drizzle-orm";
import { pgTable, unique } from "drizzle-orm/pg-core";

export const testTable = pgTable(
  "test",
  (d) => ({
    id: d.serial().primaryKey().notNull(),
    name: d.text().notNull(),

    createdAt: d
      .timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: d
      .timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date()),
  }),
  (t) => [unique("test_unique").on(t.name)],
);
