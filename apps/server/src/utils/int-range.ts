export const isWithinPostgresIntegerRange = (value?: string | number) => {
  const intMin = -2147483648;
  const intMax = 2147483647;
  const number = Number(value);

  return Number.isInteger(number) && number >= intMin && number <= intMax;
};
