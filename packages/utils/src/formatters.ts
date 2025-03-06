export const formatCurrency = (
  value: number,
  locale = 'en-US',
  currency = 'USD',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export const formatDate = (
  date: Date | string,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions,
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    new Date(date),
  );
};
