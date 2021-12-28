export const formatNumber = (number: number | string) =>
  new Intl.NumberFormat().format(Number(number));

export const FormatDay = (date: Date): string => {
  let newDate = new Date(date);
  return new Intl.DateTimeFormat('en-US').format(newDate);
};

export const formatMoney = (number: number | string): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(Number(number));
};

export function shortName(name: string): string {
  const ArrName = name.split(' ');
  return `${ArrName[0]} ${ArrName[1].slice(0, 1)}`;
}
