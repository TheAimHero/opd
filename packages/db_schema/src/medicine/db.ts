import { sql } from "drizzle-orm";
import { pgEnum, pgTable, unique } from "drizzle-orm/pg-core";
import { MEDICINE_TYPES } from "./config";

export const medicineType = pgEnum("medicine_type", MEDICINE_TYPES);

export const medicineTable = pgTable(
  "medicine",
  (d) => ({
    id: d.serial().primaryKey().notNull(),
    medicineType: medicineType("medicine_type").default("na").notNull(),
    name: d.text().notNull(),

    createdAt: d
      .timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: d
      .timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date()),
  }),
  (t) => [unique("medicine_unique").on(t.medicineType, t.name)],
);
