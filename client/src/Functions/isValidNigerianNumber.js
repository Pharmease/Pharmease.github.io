export const isValidNigerianNumber = (number) =>
  /^(?:\+234|0)[789]\d{9}$/.test(number);
