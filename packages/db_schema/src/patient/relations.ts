import { relations } from "drizzle-orm";
import { patientTable } from "./db";

export const patientRelations = relations(patientTable, () => ({}));
