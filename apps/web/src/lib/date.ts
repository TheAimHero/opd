import {
  differenceInMonths,
  differenceInYears,
  format,
  isValid,
} from 'date-fns';

export function formatShortIndianDate(date: Date | string | number): string {
  return isValid(date) ? format(new Date(date), 'dd-MM-yyyy') : '';
}

export function formatLongIndianDate(date: Date | string | number): string {
  return isValid(date) ? format(new Date(date), 'dd MMMM yyyy') : '';
}

export const calculateAge = (date: Date | string | number): string => {
  if (!isValid(date)) {
    return '';
  }
  const birthDate = new Date(date);
  const now = new Date();
  const years = differenceInYears(now, birthDate);
  const months = differenceInMonths(now, birthDate) % 12;
  return `${years}y ${months}m`;
};
