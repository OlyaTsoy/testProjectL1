// Функция для получения текущей даты
const getCurrentDate = () => {
  return moment().format('YYYY-MM-DD');
}

// Функция для добавления дней
const addDaysToDate = (daysToAdd) => {
  return moment().add(daysToAdd, 'days').format('YYYY-MM-DD');
}

// Функция для вычисления календарного времени
const calcCalendarTime = (daysToSubtract) => {
  return moment().subtract(daysToSubtract, 'days').calendar();
}
// Функция для вычисления относительного времени
const calcRelativeTime = (format) => {
  return moment(format).fromNow();
}

// Экспортируем все функции
export { getCurrentDate, calcRelativeTime, calcCalendarTime, addDaysToDate };