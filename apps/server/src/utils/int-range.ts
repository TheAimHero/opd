export const isWithinPostgresIntegerRange = (value?: string | number) => {
  const intMin = -2_147_483_648;
  const intMax = 2_147_483_647;
  const number = Number(value);

  return Number.isInteger(number) && number >= intMin && number <= intMax;
};
