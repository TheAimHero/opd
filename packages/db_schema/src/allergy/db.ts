import { pgTable } from "drizzle-orm/pg-core";

export const allergyTable = pgTable("allergy", (d) => ({
  id: d.serial().primaryKey().notNull(),
  name: d.text().notNull(),
}));
