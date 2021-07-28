export const formatNumber = (value: number): string =>
  new Intl.NumberFormat({
    minimumSignificantDigits: 1,
    minimumIntegerDigits: 1,
  }).format(value);

export const FormatDay = (date: Date): string => {
  let newDate = new Date(date);
  return new Intl.DateTimeFormat("en-US").format(newDate);
};

export const formatMoney = (number: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(number);
};

