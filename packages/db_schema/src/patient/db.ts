import { sql } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';
import { BLOOD_GROUPS, GENDERS } from './config';

export const genders = pgEnum('genders', GENDERS);

export const bloodGroups = pgEnum('blood_groups', BLOOD_GROUPS);

export const patientTable = pgTable('patient', (d) => ({
  id: d.serial().primaryKey(),
  name: d.text().notNull(),
  phoneNumber: d.text('phone_number').notNull(),
  sex: genders('sex').notNull(),
  bloodGroup: bloodGroups('blood_group').notNull(),
  address: d.text().notNull(),
  birthDate: d.timestamp('birth_date').notNull(),

  pastSurgery: d.text('past_surgery').default(''),
  familyHistory: d.text('familly_history').default(''),
  systemicDiseases: d.text('systemic_diseases').default(''),
  medicalHistory: d.text('medical_history').default(''),
  ongoingMedication: d.text('on_going_medicatin').default(''),
  allergy: d.text().default(''),

  createdAt: d
    .timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp('updated_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
}));
