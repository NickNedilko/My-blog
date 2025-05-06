export const formatDate = (
  date: Date | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  return parsedDate.toLocaleString(locale, options);
};
