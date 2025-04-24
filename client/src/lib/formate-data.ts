export const formateDate = (date: Date) => {
  return new Date(date).toLocaleString('ru-RU', {
    weekday: 'long', // день недели
    year: 'numeric', // год
    month: 'long', // месяц
    day: 'numeric', // день месяца
    hour: 'numeric', // час
    minute: 'numeric', // минута
    second: 'numeric', // секунда
  });
};
