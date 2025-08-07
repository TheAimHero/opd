import { relations } from 'drizzle-orm';
import { testTable } from '../test/db';
import { visitTable } from '../visit/db';
import { prescribedTestTable } from './db';

export const prescribedTestRelations = relations(
  prescribedTestTable,
  ({ one }) => ({
    patientVisit: one(visitTable, {
      fields: [prescribedTestTable.visitId],
      references: [visitTable.id],
    }),

    testVisit: one(testTable, {
      fields: [prescribedTestTable.testId],
      references: [testTable.id],
    }),
  })
);
