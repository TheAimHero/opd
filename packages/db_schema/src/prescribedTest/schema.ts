import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { prescribedTestTable } from "./db";

export const prescribedTestInsertSchema =
  createInsertSchema(prescribedTestTable);

export const prescribedTestUpdateSchema =
  createUpdateSchema(prescribedTestTable);

export const prescribedTestSelectSchema =
  createSelectSchema(prescribedTestTable);
