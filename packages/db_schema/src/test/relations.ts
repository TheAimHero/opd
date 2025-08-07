import { relations } from 'drizzle-orm';
import { prescribedTestTable } from '../prescribedTest/db';
import { testTable } from './db';

export const testRelations = relations(testTable, ({ many }) => ({
  prescribedTest: many(prescribedTestTable),
}));
