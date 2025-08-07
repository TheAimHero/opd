import { createSchemaFactory } from 'drizzle-zod';
import { userTable } from './db';

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ coerce: { number: true, date: true } });

export const userInsertSchema = createInsertSchema(userTable);

export const userUpdateSchema = createUpdateSchema(userTable);

export const userSelectSchema = createSelectSchema(userTable);
