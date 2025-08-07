import { pgTable } from 'drizzle-orm/pg-core';
import { patientTable } from '../patient/db';

export const visitTable = pgTable('visit', (d) => ({
  id: d.serial().primaryKey().notNull(),
  patientId: d
    .integer('patient_id')
    .notNull()
    .references(() => patientTable.id, { onDelete: 'cascade' }),

  weight: d.integer(),
  bloodPressure: d.text('blood_pressure'),
  temperature: d.text(),
  pulse: d.text(),
  respiration: d.text(),
  cvs: d.text(),
  abdomen: d.text(),
  ent: d.text(),
  followUp: d.timestamp('follow_up'),

  personalRemark: d.text('personal_remark'),
  complaints: d.text(),
  diagnosis: d.text(),
  doctorsAdvice: d.text('doctors_advice'),
  treatmentPlan: d.text('treatment_plan'),

  createdAt: d.timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: d
    .timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
}));
