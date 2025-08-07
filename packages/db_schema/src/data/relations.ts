import { relations } from "drizzle-orm";
import { dataTable } from "./db";

export const dataRelations = relations(dataTable, () => ({}));
