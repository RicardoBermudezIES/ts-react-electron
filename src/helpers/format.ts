export const formatNumber = (number: number) => new Intl.NumberFormat().format(Number(number));

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

