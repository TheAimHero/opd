import { relations } from "drizzle-orm";
import { allergyTable } from "./db";

export const allergyRelations = relations(allergyTable, () => ({}));
