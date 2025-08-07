import { relations } from "drizzle-orm";
import { surgeryTable } from "./db";

export const surgeryRelations = relations(surgeryTable, () => ({}));
